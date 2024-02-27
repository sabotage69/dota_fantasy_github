import React, { useEffect, useState } from "react";

import CloseIcon from "../../CloseIcon";
import bcrypt from "bcryptjs";
import jws from "jws";
import faunadb from "faunadb";
// import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import words from "profane-words";
import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;
const NEXT_PUBLIC_RECAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

const SignInModal = ({
  updateUser,
  onClose,
  handleSuccessfulLogin,
  onLoginSuccess,
  show,
  onUserNameChange,
  lowFunds,
  onProfileDataTransfer,
  onDataCollected,
  isMobile,
}) => {
  const [registered, setRegistered] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [isProfanityDetected, setIsProfanityDetected] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const recaptchaRef = React.createRef();

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    if (words.includes(e.target.value.toLowerCase())) {
      setIsProfanityDetected(true);
    } else {
      setIsProfanityDetected(false);
    }
  };

  const handleChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDataTransfer = () => {
    onDataCollected(userProfileData);
  };

  useEffect(() => {
    if (loginSuccess === true) {
      handleSuccessfulLogin();
      onLoginSuccess(userName);
      updateUser(userProfileData);
      handleDataTransfer();
    }
  }, [loginSuccess]);

  const handleSubmit = async (e) => {
    // console.log("submitting");
    e.preventDefault();
    if (registered) {
      // User clicked "Login" button, handle login logic here
      // ...
      console.log("Logging in...");
      try {
        const hashedPassword = await encryptPassword(userPassword);
        await signInUser(userName, hashedPassword);
        console.log("Logged in!");
        handleSuccessfulLogin();
        onLoginSuccess(userName);
        updateUser(userProfileData);
        handleDataTransfer();
      } catch (error) {
        console.error("Error during login:", error);
        setLoginSuccess(false);
      }
    } else {
      // User clicked "Register" button, handle registration logic here
      // ...
      console.log("Registering...");
      try {
        const hashedPassword = await encryptPassword(userPassword);
        await createUser(hashedPassword);
        // if (userExists) {
        // } else {
        // setRegistrationSuccess(true);
        // }
        console.log("Registered!");
      } catch (error) {
        console.error("Error during registration:", error);
        setRegistrationSuccess(false);
      }
    }
  };

  // console.log(loginSuccess);

  const changeRegister = () => {
    setRegistered(!registered);
  };

  if (!show || (lowFunds != null && registered)) {
    return null;
  }

  let saltRounds = 10;

  function encryptPassword(userPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(userPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
          // Handle error
          console.error("Error hashing password:", err);
          reject(err);
          return;
        }

        resolve(hashedPassword);
      });
    });
  }

  let payload = {
    userName: userName,
  };

  let header = {
    alg: "HS256", // The algorithm used for signing. Here we use HMAC SHA-256.
    typ: "JWT",
  };

  let signature = jws.sign({
    header,
    payload,
    secret: NEXT_PUBLIC_JWT_SECRET,
  });

  const createUser = async (hashedPassword) => {
    console.log("checking for user");
    if (userName && hashedPassword) {
      console.log("generating token");

      try {
        // Sign the JWT using the payload, secret key, and header

        console.log("signature");
        // console.log(signature);

        let token = `${signature}`;
        console.log("token generated");
        console.log("accessing fauna");

        try {
          console.log("trying to access fauna");
          const result = await client.query(
            q.Let(
              {
                match: q.Match(q.Index("user_by_name"), [userName]),
                data: {
                  userName: userName,
                  hashedPassword: hashedPassword,
                  userToken: token,
                },
              },
              q.If(
                q.Exists(q.Var("match")),
                "User already exists", // Return a message if user exists
                q.Create(q.Collection("users"), {
                  data: {
                    userEmail: "",
                    userName: userName,
                    hashedPassword: hashedPassword,
                    userToken: token,
                    userBets: "",
                  },
                })
              )
            )
          );
          // console.log(result); // Log the result message
          if (result === "User already exists") {
            setRegistrationSuccess(false);
          } else {
            setRegistrationSuccess(true);
          }
        } catch (err) {
          console.log("cant access user");
          console.error("Error:", err);
        }
      } catch (err) {
        console.error("Error signing token:", err);
      }
    }
  };

  async function signInUser(userName, hashedPassword) {
    try {
      // Here, you should fetch the user from your database using the userName
      // and compare the stored hashed password with the provided userPassword
      // For demonstration purposes, I'll assume you have a function called 'getUserByName' to fetch the user data.
      let user;

      try {
        // console.log("trying to access fauna");
        user = await client.query(
          q.Let(
            {
              match: q.Match(q.Index("user_by_name"), [userName]), //_uniqueId matches[i]["apiId"]
              data: {
                userName: userName,
                hashedPassword: hashedPassword,
                userToken: token,
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
      }

      // Compare the provided password with the hashed password stored in the database
      // console.log(userPassword);
      // console.log(user);
      const isPasswordValid = await bcrypt.compare(
        userPassword,
        user.data.hashedPassword
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password.");
      }

      // User is authenticated, generate a JWS token with the payload
      const payload = { userName: user.data.userName };

      const token = jws.sign({
        header,
        payload,
        secret: NEXT_PUBLIC_JWT_SECRET,
      });
      document.cookie = `token=${token}; max-age=${720000}; samesite=strict; path=/`;
      // console.log("token generated");
      // console.log(token);
      setLoginSuccess(true);
      updateUser(user.data);
      setUserProfileData(user.data);
      onProfileDataTransfer(user.data);
      // console.log(user.data);
      return token;
    } catch (err) {
      setLoginSuccess(false);
      console.error("Error signing in user:", err);
      return null;
    }
  }
  // console.log(loginSuccess);

  const handleRecaptchaChange = (value) => {
    // The 'value' parameter contains the reCAPTCHA response token
    setIsVerified(true); // Set the 'isVerified' state to true when reCAPTCHA is verified
  };

  // if (words.includes(userName.toLowerCase())) {
  // }

  switch (registered) {
    case true:
      return (
        <Modal
          show={show}
          onHide={onClose}
          className="modal text-16 border-0"
          centered
          bg="dark"
          data-bs-theme="dark"
        >
          <Modal.Header
            closeButton
            className="bg-dark text-white border-bottom border-gray border-0"
          >
            <Modal.Title className="text-center w-100 bg-dark border-0">
              Sign In to MasterBetter
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body bg-dark text-white border-0">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={3} className="text-start">
                  <label className="form-label">Enter your name:</label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={userName}
                    onChange={handleChangeUserName}
                    pattern="^[a-zA-Z0-9]+$"
                    maxLength="20"
                    required
                    title="Nickname: Enter a nickname up to 20 characters containing only letters and numbers"
                    size="lg"
                    className="mb-3"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      placeholder: "lightgrey", // Placeholder text color
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-start">
                  <label className="form-label">Enter password:</label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="password"
                    placeholder=""
                    value={userPassword}
                    onChange={handleChangePassword}
                    maxLength="20"
                    required
                    title="Password: Enter a password up to 20 characters"
                    size="lg"
                    className="mb-3"
                    style={{ backgroundColor: "black", color: "white" }}
                  />
                </Col>
              </Row>

              <div className="mb-3 d-flex justify-content-center">
                <div className="login-recaptcha">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                    onChange={handleRecaptchaChange}
                    theme="dark"
                  />
                </div>
                <div className="d-flex ps-0 mt-3"></div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer className=" bg-dark">
            <Col>
              <Button
                variant="secondary"
                onClick={changeRegister}
                style={{ marginLeft: "auto" }}
              >
                {registered ? "No account?" : "Have an account?"}
              </Button>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                type="submit"
                disabled={!userPassword || !userName || !isVerified}
                style={{ width: "65px", height: "40px" }}
                className="ml-2"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
      );
    case false:
      return (
        <Modal show={show} onHide={onClose} className="modal text-16" centered>
          <Modal.Header
            closeButton
            className="bg-dark text-white border-bottom border-gray text-16"
          >
            <Modal.Title className="text-center w-100 text-16">
              Create MasterBetter account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body bg-dark text-white">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={3} className="text-start">
                  <label className="form-label">Enter your name:</label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={userName}
                    onChange={handleChangeUserName}
                    pattern="^[a-zA-Z0-9]+$"
                    maxLength="20"
                    required
                    title="Nickname: Enter a nickname up to 20 characters containing only letters and numbers"
                    size="lg"
                    className="mb-3"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      placeholder: "lightgrey", // Placeholder text color
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-start">
                  <label className="form-label">Enter password:</label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="password"
                    placeholder=""
                    value={userPassword}
                    onChange={handleChangePassword}
                    maxLength="20"
                    required
                    title="Password: Enter a password up to 20 characters"
                    size="lg"
                    className="mb-3"
                    style={{ backgroundColor: "black", color: "white" }}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="text-start">
                  <label className="form-label">Confirm password:</label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    type="password"
                    placeholder=""
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    maxLength="20"
                    required
                    title="Password: Enter a password up to 20 characters"
                    size="lg"
                    className="mb-3"
                    style={{ backgroundColor: "black", color: "white" }}
                  />
                </Col>
              </Row>

              {!registered && confirmPassword !== userPassword && (
                <Alert variant="danger" className="mb-3">
                  Passwords do not match
                </Alert>
              )}

              {registrationSuccess === true && (
                <Alert variant="success" className="mb-3">
                  Registration successful
                </Alert>
              )}

              {registrationSuccess === false && (
                <Alert variant="danger" className="mb-3">
                  Registration unsuccessful
                </Alert>
              )}

              {loginSuccess === false && (
                <Alert variant="danger" className="mb-3">
                  Login unsuccessful
                </Alert>
              )}
              <div className="mb-3 d-flex justify-content-center">
                <div className="login-recaptcha">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                    onChange={handleRecaptchaChange}
                    theme="dark"
                  />
                </div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer className=" bg-dark">
            <Col>
              <Button
                variant="secondary"
                onClick={changeRegister}
                style={{ marginLeft: "auto" }}
              >
                {registered ? "No account?" : "Have account?"}
              </Button>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                type="submit"
                disabled={!userPassword || !userName || !isVerified}
                style={{ width: "80px", height: "40px" }}
                className="ml-2"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
      );
    default:
      return <div>oops! please reload</div>;
  }
};

export default SignInModal;

// switch (registered) {
//   case true:
//     return (
//       <div className="modal-new">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h4 className="modal-title">Sign In to MasterBetter</h4>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit} className="sign-in-form">
//               <input
//                 className="login-name-form"
//                 label="Enter your name"
//                 type="text"
//                 placeholder="Enter your name"
//                 name="userName"
//                 value={userName}
//                 onChange={handleChangeUserName}
//                 pattern="^[a-zA-Z0-9]+$"
//                 maxLength="20"
//                 required
//                 title="Nickname: Enter a nickname up to 20 characters containing only letters and numbers"
//               />

//               <input
//                 className="login-password-form"
//                 label="Enter password"
//                 type="password"
//                 placeholder="Enter password"
//                 name="userPassword"
//                 value={userPassword}
//                 onChange={handleChangePassword}
//                 maxLength="20"
//                 required
//                 title="Password: Enter a password up to 20 characters"
//               />

//               {!registered && confirmPassword !== userPassword ? (
//                 <div
//                   className="registration-modal-info-text"
//                   style={{ color: "rgb(255, 0, 0)" }}
//                 >
//                   Passwords do not match
//                 </div>
//               ) : (
//                 <div
//                   className="registration-modal-info-text"
//                   style={{ visibility: "hidden", display: "block" }}
//                 >
//                   Passwords match
//                 </div>
//               )}
//               {registrationSuccess === true && (
//                 <div
//                   style={{ color: "rgb(64, 255, 47)" }}
//                   className="registration-modal-info-text"
//                 >
//                   Registration successful
//                 </div>
//               )}
//               {registrationSuccess === false && (
//                 <div
//                   style={{ color: "rgb(255, 0, 0)" }}
//                   className="registration-modal-info-text"
//                 >
//                   Registration unsuccessful
//                 </div>
//               )}
//               {loginSuccess === false && (
//                 <div style={{ color: "rgb(255, 0, 0)" }}>
//                   Login unsuccessful
//                 </div>
//               )}

//               <>
//                 <div className="login-submit-button">
//                   <button
//                     className="button-submit-modal"
//                     type="submit"
//                     disabled={!userPassword || !userName || !isVerified}
//                     style={{
//                       cursor:
//                         !userPassword || !userName || !isVerified
//                           ? "not-allowed"
//                           : "pointer",
//                     }}
//                   >
//                     Login
//                   </button>
//                 </div>
//                 <div
//                   className="login-recaptcha"
//                   style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
//                 >
//                   <ReCAPTCHA
//                     ref={recaptchaRef}
//                     sitekey={NEXT_PUBLIC_RECAPTCHA_SITEKEY}
//                     onChange={handleRecaptchaChange}
//                     theme="dark"
//                   />
//                 </div>
//               </>
//             </form>
//           </div>
//           <div className="no-account">
//             <button className="button-no-account" onClick={changeRegister}>
//               {registered ? "No account?" : "Have account?"}
//             </button>
//           </div>
//           <div>
//             <button className="modal-close" onClick={onClose}>
//               <CloseIcon height="20px" width="20px" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   case false:
//     return (
//       <div className="modal-new">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h4 className="modal-title">Create MasterBetter account</h4>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit} className="sign-in-form">
//               <input
//                 className="register-name-form"
//                 label="Enter your name"
//                 type="text"
//                 placeholder="Enter your name"
//                 name="userName"
//                 value={userName}
//                 onChange={handleChangeUserName}
//                 pattern="^[a-zA-Z0-9]+$" // Only allows letters and numbers
//                 maxLength="20" // Maximum length of 20 characters
//                 required // Makes the field required
//                 title="Nickname: Enter a nickname up to 20 characters containing only letters and numbers"
//               />

//               <input
//                 className="register-password-form"
//                 label="Enter password"
//                 type="password"
//                 placeholder="Enter password"
//                 name="userPassword"
//                 value={userPassword}
//                 onChange={handleChangePassword}
//                 maxLength="20" // Maximum length of 20 characters
//                 required // Makes the field required
//                 title="Password: Enter a password up to 20 characters"
//               />

//               <input
//                 className="confirm-password-form"
//                 label="Confirm password"
//                 type="password"
//                 placeholder="Confirm password"
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleChangeConfirmPassword}
//                 maxLength="20" // Maximum length of 20 characters
//                 required // Makes the field required
//                 title="Confirm Password: Enter the password again for confirmation, up to 20 characters"
//               />

//               {!registered && confirmPassword !== userPassword ? (
//                 <div
//                   className="registration-modal-info-text"
//                   style={{ color: "rgb(255, 0, 0)" }}
//                 >
//                   Passwords do not match
//                 </div>
//               ) : (
//                 <div
//                   className="registration-modal-info-text"
//                   style={{ visibility: "hidden", display: "block" }}
//                 >
//                   Passwords match
//                 </div>
//               )}
//               {registrationSuccess === true && (
//                 <div
//                   style={{ color: "rgb(64, 255, 47)" }}
//                   className="registration-modal-info-text"
//                 >
//                   Registration successful
//                 </div>
//               )}
//               {registrationSuccess === false && (
//                 <div
//                   style={{ color: "rgb(255, 0, 0)" }}
//                   className="registration-modal-info-text"
//                 >
//                   Registration unsuccessful
//                 </div>
//               )}
//               {loginSuccess === false && (
//                 <div style={{ color: "rgb(255, 0, 0)" }}>
//                   Login unsuccessful
//                 </div>
//               )}

//               <>
//                 <div className="register-submit-button">
//                   <button
//                     className="button-submit-signin-modal"
//                     type="submit"
//                     disabled={
//                       isProfanityDetected ||
//                       confirmPassword !== userPassword ||
//                       !userName ||
//                       !isVerified
//                     }
//                     style={{
//                       cursor:
//                         isProfanityDetected ||
//                         confirmPassword !== userPassword ||
//                         !userName ||
//                         !isVerified
//                           ? "not-allowed"
//                           : "pointer",
//                     }}
//                     title={
//                       isProfanityDetected
//                         ? "Profanity detected. Choose a different username."
//                         : ""
//                     }
//                   >
//                     Register
//                   </button>
//                 </div>
//                 <div
//                   className="register-recaptcha"
//                   style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
//                 >
//                   <ReCAPTCHA
//                     ref={recaptchaRef}
//                     sitekey={NEXT_PUBLIC_RECAPTCHA_SITEKEY}
//                     onChange={handleRecaptchaChange}
//                     theme="dark"
//                   />
//                 </div>
//               </>
//             </form>
//           </div>
//           <div className="no-account">
//             <button
//               className="button-already-have-account"
//               onClick={changeRegister}
//             >
//               {registered ? "No account?" : "Have account?"}
//             </button>
//           </div>
//           <div>
//             <button className="modal-close" onClick={onClose}>
//               <CloseIcon height="20px" width="20px" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   default:
//     return <div>oops! please reload</div>;
// }
