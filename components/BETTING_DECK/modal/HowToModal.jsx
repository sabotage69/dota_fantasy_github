import React, { useState } from "react";

import { Modal, Button, Col } from "react-bootstrap";

const HowToModal = ({ onClose, instructions, show }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Instructions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container text-white text-responsive">
        {instructions[currentPage].content}
      </Modal.Body>
      <Modal.Footer>
        <Col>
          {" "}
          <Button
            variant="secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
        </Col>
        <Col className="text-end">
          {" "}
          <Button
            variant="primary"
            onClick={goToNextPage}
            disabled={currentPage === instructions.length - 1}
          >
            Next
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default HowToModal;

{
  /* <div className="how-to-modal">
<div
  className="how-to-modal-content"
  
>
  <div className="how-to-modal-header">
    <h2>Instructions</h2>
    <button className="close-button-instruction" onClick={onClose}>
      <div className="close-icon"></div>
    </button>
  </div>
  <div className="how-to-modal-body">
    {instructions[currentPage].content}
  </div>
  <div className="how-to-modal-footer">
    <button
      className={`previous-instruction${
        currentPage === 0 ? " disabled" : ""
      }`}
      onClick={goToPreviousPage}
      disabled={currentPage === 0}
      style={{
        cursor: currentPage === 0 ? "not-allowed" : "pointer",
      }}
    >
      Previous
    </button>
    <button
      className={`next-instruction${
        currentPage === instructions.length - 1 ? " disabled" : ""
      }`}
      onClick={goToNextPage}
      disabled={currentPage === instructions.length - 1}
      style={{
        cursor:
          currentPage === instructions.length - 1
            ? "not-allowed"
            : "pointer",
      }}
    >
      Next
    </button>
  </div>
</div>
</div> */
}
