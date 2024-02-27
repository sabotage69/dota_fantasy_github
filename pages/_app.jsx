import "../styles/style.css";
import ErrorPage from "../components/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import authenticateMiddleware from "../middleware/authenticateMiddleware";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import faunadb from "faunadb";
import "bootstrap/dist/css/bootstrap.min.css";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

function MyApp({ Component, pageProps }) {
  const [cookieUser, setCookieUser] = useState(null);

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  async function checkExistingUser(userName, userToken) {
    let user;

    try {
      // console.log("trying to access fauna");
      user = await client.query(
        q.Let(
          {
            match: q.Match(q.Index("users_by_name_n_token"), [
              userName,
              userToken,
            ]), //_uniqueId matches[i]["apiId"]
            data: {
              userName: userName,
              userToken: userToken,
            },
          },
          q.If(
            q.Exists(q.Var("match")),
            q.Get(q.Var("match")),
            "User not found"
          )
        )
      );
      // console.log("user exists");
      // console.log(user);
    } catch (err) {
      console.log("cant access user");
      console.error("Error:", err);
    }

    if (!user) {
      throw new Error("User not found.");
    } else {
      return user.data;
    }
  }

  useEffect(() => {
    const browserCookie = document.cookie;

    const tokenMatch = browserCookie.match(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/
    );
    if (!tokenMatch) {
      console.log("No token found in browser cookie");
      return; // Exit the effect if no token is found
    }

    const token = tokenMatch[1];

    try {
      let decodedPayload = jwt_decode(token);

      const fetchExistingUser = async () => {
        try {
          let fauna_user_data = await checkExistingUser(
            decodedPayload.userName,
            token
          );

          setCookieUser(fauna_user_data);
        } catch (error) {
          console.error("Error fetching existing user:", error);
        }
      };

      fetchExistingUser();
    } catch (error) {
      console.log("Invalid or Expired Token");
    }
  }, []);

  // console.log(cookieUser);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        {/* Pass the authenticated user to the Component */}
        <Component {...pageProps} cookieUser={cookieUser} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
