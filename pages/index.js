import Head from "next/head";
import Header from "../components/GENERAL/Header";
import Footer from "../components/GENERAL/Footer";
import InfoMessage from "../components/GENERAL/InfoMessage";
import faunadb from "faunadb";
// import contractAddresses from "../constants/contractAddresses.json";
import React from "react";
import DecksContainer from "../components/DecksContainer";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import jws from "jws";

const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;
const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default function Home({ cookieUser }) {
  const [user, setUser] = useState({});
  const [faunaUserData, setFaunaUserData] = useState(null);

  const handleChildLoggedInUserNameChange = (userProfileData) => {
    setUser(userProfileData);
  };

  const handleDataFromChild = (data) => {
    setUser(data);
  };

  const sendDataToParent = (data) => {
    console.log("Data received in parent:", data);
    // Perform any necessary actions with the data
  };
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  // Callback function to update user data in the parent component
  function updateUser(userData) {
    setUser(userData);
  }

  useEffect(() => {
    // Check if we are on the client-side (browser) before accessing the window object
    if (typeof window !== "undefined") {
      setIsMobile(window.innerHeight > window.innerWidth);
    }
  }, []); // Empty dependency array ensures the code runs once after component mount

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // console.log(user);
  }, [user, isMobile]);

  // console.log(user);
  // console.log(cookieUser);
  return (
    <>
      <Head>
        <title>Fantasy betting platform</title>
        <meta name="description" content="Fantasy betting platform" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>

        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="web-container">
        <Header
          onUpdateUser={updateUser}
          onDataFromGrandchild={handleDataFromChild}
          onDataToParent={sendDataToParent}
          onLoggedInUserNameChange={handleChildLoggedInUserNameChange}
          cookieUser={cookieUser}
          isMobile={isMobile}
        />
        <div>
          <DecksContainer
            intro="true"
            fiat_demo="true"
            user={cookieUser ? cookieUser : user}
            updateDataAfterBet={handleDataFromChild}
          />
        </div>

        <Footer isMobile={isMobile} />
      </div>
    </>
  );
}
