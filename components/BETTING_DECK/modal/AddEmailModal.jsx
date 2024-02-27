import React, { useEffect, useState, useRef } from "react";

import CloseIcon from "../../CloseIcon";

import faunadb from "faunadb";

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

const AddEmailModal = ({ onClose, user, showModalEmail, isMobile, show }) => {
  const [formEmail, setFormEmail] = useState("");
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
  const [emailUpdateAttempted, setEmailUpdateAttempted] = useState(false);

  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  };

  // console.log(user);
  if (!showModalEmail) {
    return null;
  }
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  async function addEmailToFauna(_userId, _email) {
    await client
      .query(
        q.Let(
          {
            match: q.Match(q.Index("user_by_name"), _userId),
          },
          q.If(
            q.Exists(q.Var("match")),
            q.Update(q.Select(["ref"], q.Get(q.Var("match"))), {
              data: {
                userEmail: _email,
              },
            }),
            null // Return null if the user doesn't exist (no action)
          )
        )
      )
      .catch((err) =>
        console.error(
          "Error: [%s] %s: %s",
          err.name,
          err.message,
          err.errors()[0].description
        )
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // User clicked "Login" button, handle login logic here
    // ...
    setEmailUpdateAttempted(true);
    console.log("Updating email...");
    try {
      await addEmailToFauna(user.userName, formEmail);
      console.log("Email updated!");
      setEmailUpdateSuccess(true);
    } catch (error) {
      console.error("Error during login:", error);
      setEmailUpdateSuccess(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      data-bs-focus="true"
    >
      <div className="modal-dialog modal-dialog-centered" data-bs-focus="true">
        <div className="modal-content" data-bs-focus="true">
          <div className="modal-header" data-bs-focus="true">
            <h4 className="modal-title">Add or change email address</h4>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" data-bs-focus="true">
            <form onSubmit={handleSubmit}>
              <div className="row ps-3 mb-2">
                Current email: {user.userEmail ? user.userEmail : "none"}
              </div>
              <div className="input-group mb-3" data-bs-focus="true">
                <span className="input-group-text" id="basic-addon1">
                  email
                </span>
                <input
                  ref={inputRef}
                  className="form-control form-control-lg col-12"
                  type="email"
                  placeholder="Enter your email"
                  name="formEmail"
                  value={formEmail}
                  onChange={handleChangeEmail}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]"
                  maxLength="255"
                  required
                  title="Please enter a valid email address"
                />
              </div>

              {emailUpdateSuccess === true && emailUpdateAttempted === true ? (
                <div className="row mb-2" style={{ color: "rgb(64, 255, 47)" }}>
                  Email updated successfully
                </div>
              ) : null}
              {emailUpdateSuccess === false && emailUpdateAttempted === true ? (
                <div className="row mb-2" style={{ color: "rgb(255, 0, 0)" }}>
                  Email not updated. Try again
                </div>
              ) : null}
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={!formEmail}
                  style={{
                    cursor: !formEmail ? "not-allowed" : "pointer",
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmailModal;

{
  /* <div className="modal-new">
<div className="modal-content">
  <div className="modal-header">
    <h4 className="modal-title">Add or change email Address</h4>
  </div>
  <div className="modal-body">
    <form onSubmit={handleSubmit} className="change-email-form">
      <div className="current-email">
        Current email: {user.userEmail ? user.userEmail : "none"}
      </div>
      <input
        className="email-form"
        label="Enter your email"
        type="email" // Use type "email" to ensure email format validation
        placeholder="Enter your email"
        name="formEmail"
        value={formEmail}
        onChange={handleChangeEmail}
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]" // Regular expression pattern for email validation
        maxLength="255" // Maximum length of an email address (typically 255 characters)
        required // Makes the field required
        title="Please enter a valid email address"
      />

      {emailUpdateSuccess === true && emailUpdateAttempted === true ? (
        <div
          className="email-update-notice"
          style={{ color: "rgb(64, 255, 47)" }}
        >
          Email updated successfully
        </div>
      ) : null}
      {emailUpdateSuccess === false && emailUpdateAttempted === true ? (
        <div
          className="email-update-notice"
          style={{ color: "rgb(255, 0, 0)" }}
        >
          Email not updated. Try again
        </div>
      ) : null}

      <div className="add-email-div-button">
        <button
          className="button-submit-modal"
          type="submit"
          disabled={!formEmail}
          style={{
            cursor: !formEmail ? "not-allowed" : "pointer",
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  </div>

  <div>
    <button className="modal-close" onClick={onClose}>
      <CloseIcon height="20px" width="20px" />
    </button>
  </div>
</div>
</div> */
}
