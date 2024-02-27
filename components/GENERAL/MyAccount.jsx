import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import faunadb from "faunadb";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const NEXT_PUBLIC_FAUNA_SECRET = process.env.NEXT_PUBLIC_FAUNA_SECRET;

export default function MyAccount() {
  const [formEmail, setFormEmail] = useState("");
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
  const [emailUpdateAttempted, setEmailUpdateAttempted] = useState(false);

  const router = useRouter();
  const { userName, userEmail } = router.query;

  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  };

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: NEXT_PUBLIC_FAUNA_SECRET,
    domain: "db.eu.fauna.com",
    scheme: "https",
  });

  async function addEmailToFauna(_userId, _email) {
    // console.log("function");
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
      // console.log("rtying to add email to fauna");
      await addEmailToFauna(userName, formEmail);
      console.log("Email updated!");
      setEmailUpdateSuccess(true);
    } catch (error) {
      console.error("Error during login:", error);
      setEmailUpdateSuccess(false);
    }
  };

  return (
    <>
      <Container
        className="mt-5 modal-content text-white"
        bg="dark"
        data-bs-theme="dark"
      >
        <Row className="mb-3" bg="dark" data-bs-theme="dark">
          <Col>
            <h2>Account Information</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <strong>Account Name:</strong> {userName}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Current Email:</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={userEmail} />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>New Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    value={formEmail}
                    onChange={handleChangeEmail}
                    maxLength="255"
                    required
                    title="Please enter a valid email address"
                    className="form-control-lg"
                  />
                </Col>
              </Row>
              {emailUpdateAttempted && (
                <Row className="mb-2">
                  <Col>
                    {emailUpdateSuccess ? (
                      <Alert variant="success">
                        Email updated successfully, return to main page to see
                        changes immediately
                      </Alert>
                    ) : (
                      <Alert variant="danger">
                        Email not updated. Try again
                      </Alert>
                    )}
                  </Col>
                </Row>
              )}
              <Button
                variant="primary"
                type="submit"
                disabled={!formEmail}
                style={{
                  cursor: !formEmail ? "not-allowed" : "pointer",
                }}
              >
                Update Email
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
