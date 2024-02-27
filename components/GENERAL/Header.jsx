import Link from "next/link";
import UTClock from "../UTClock";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import SignInModal from "../BETTING_DECK/modal/SignInModal";
import { useRouter } from "next/router";
import AddEmailModal from "../BETTING_DECK/modal/AddEmailModal";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";

export default function Header({
  onLoggedInUserNameChange,
  onUpdateUser,
  onDataFromGrandchild,
  onDataToParent,
  cookieUser,
  isMobile,
}) {
  const [user, setUser] = React.useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalEmail, setShowEmailModal] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const currentRoute = router.pathname;

  // console.log("current route: " + currentRoute);

  useEffect(() => {
    if (cookieUser) {
      setUser(cookieUser);
      setLoggedInUserName(cookieUser.userName);
      setIsLoggedIn(true);
    }
  }, [cookieUser]);

  const handleDataFromGrandchild = (data) => {
    onDataFromGrandchild(data);
    onDataToParent(data);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleLoginSuccess = (userName) => {
    setLoggedInUserName(userName);
    setIsLoggedIn(true);
    onLoggedInUserNameChange(user);
    onUpdateUser(user);
  };

  const handleUserNameChange = (userName) => {
    setLoggedInUserName(userName);
  };

  const handleProfileDataTransfer = (userData) => {
    setUser(userData);
  };

  function updateUser(userData) {
    setUser(userData);
  }

  useEffect(() => {
    // console.log(user);
  }, [user]);

  const [windowWidth, setWindowWidth] = useState(null);

  // Function to handle the window resize event
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const accountProps = user ? user : null;

  // console.log(accountProps);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const expand = "false";

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="bg-body-tertiary mb-0"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/">Esports Fantasy</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            bg="dark"
            data-bs-theme="dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {isLoggedIn ? loggedInUserName : "Menu"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!isLoggedIn && currentRoute === "/" ? (
                  <Nav.Link onClick={handleOpenModal}>Sign In</Nav.Link>
                ) : null}
                <Nav.Link href="/account">
                  <Link href={{ pathname: "/account", query: accountProps }}>
                    <div className="col">Account</div>
                  </Link>
                </Nav.Link>
                <Nav.Link href="/faq">
                  <Link href="/faq">
                    <div className="col">How to play?</div>
                  </Link>
                </Nav.Link>
                <Nav.Link href="/changelog">
                  <Link href="/changelog">
                    <div className="col">Patch Notes</div>
                  </Link>
                </Nav.Link>
                <Nav.Link href="/contact">
                  <Link href="/contact">
                    <div className="col">Social</div>
                  </Link>
                </Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link onClick={() => setIsLoggedIn(false)}>
                    Sign Out
                  </Nav.Link>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <SignInModal
        show={showModal}
        onClose={handleCloseModal}
        updateUser={updateUser}
        handleSuccessfulLogin={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
        onUserNameChange={handleUserNameChange}
        onProfileDataTransfer={handleProfileDataTransfer}
        onDataCollected={handleDataFromGrandchild}
        isMobile={isMobile}
      />

      <AddEmailModal
        showModalEmail={showModalEmail}
        onClose={handleCloseEmailModal}
        user={user}
        isMobile={isMobile}
        show={showModalEmail}
      />
    </>
  );
}

{
  /* <Navbar bg="dark" fixed="top">
<Container>
  <Navbar.Brand href="/">MasterBetter</Navbar.Brand>
  <Navbar.Toggle
    aria-controls="responsive-navbar-nav"
    onClick={() => setShowOffcanvas(!showOffcanvas)}
  >
    <img src={menuIcon} alt="Menu" />
  </Navbar.Toggle>
  <Offcanvas
    show={showOffcanvas}
    onHide={() => setShowOffcanvas(false)}
    placement="end"
  >
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
        {isLoggedIn ? loggedInUserName : "Menu"}
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Nav className="justify-content-end flex-grow-1">
        {!isLoggedIn ? (
          <Nav.Link onClick={handleOpenModal}>Sign In</Nav.Link>
        ) : null}
        <Nav.Link href="/account">
          <Link href={{ pathname: "/account", query: accountProps }}>
            <div className="col">Account</div>
          </Link>
        </Nav.Link>
        <Nav.Link href="/faq">
          <Link href="/faq">
            <div className="col">FAQ</div>
          </Link>
        </Nav.Link>
        <Nav.Link href="/changelog">
          <Link href="/changelog">
            <div className="col">Patch Notes</div>
          </Link>
        </Nav.Link>
        <Nav.Link href="/contact">
          <Link href="/contact">
            <div className="col">Contact</div>
          </Link>
        </Nav.Link>
        {isLoggedIn ? (
          <Nav.Link onClick={() => setIsLoggedIn(false)}>
            Sign Out
          </Nav.Link>
        ) : null}
      </Nav>
    </Offcanvas.Body>
  </Offcanvas>
</Container>
</Navbar> */
}

{
  /* <div className="account">
{isLoggedIn ? (
  <>
    <div className="header-faq">
      {currentRoute == "/" ? (
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      ) : null}
    </div>
    <div className="account-name" onClick={handleOpenEmailModal}>
      {" "}
      {loggedInUserName}{" "}
    </div>
  </>
) : (
  <div className="account-name"> </div>
)}
<div className="sign-in">
  {isLoggedIn ? (
    <button onClick={() => setIsLoggedIn(false)}>Sign Out</button>
  ) : (
    <button
      onClick={handleOpenModal}
      className={
        isMobile ? "button-sign-in-mobile" : "button-sign-in"
      }
    >
      Sign In
    </button>
  )}
</div>
</div> */
}
