import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({
  show,
  onHide,
  title,
  children,
}) => {
  return (
    <>
      <style>{`
        .custom-modal .modal-dialog {
          max-width: 600px;
          width: 100%;
        }
        .custom-modal-header {
          border-bottom: 2px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
        }
        .custom-modal-title {
          font-size: 18px;
          color: #000;
          font-weight: 600;
          margin: 0;
        }
        .custom-modal-body {
          padding: 1rem 1.5rem;
          font-size: 14px;
          color: #333;
        }
      `}</style>

      <Modal show={show} onHide={onHide} centered className="custom-modal">
        {title && (
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title">{title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body className="custom-modal-body">{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
