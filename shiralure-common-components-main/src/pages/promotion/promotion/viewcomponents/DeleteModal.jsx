import React from 'react';

/**
 * MuDeleteModal Component
 * A customizable modal for confirming deletion actions.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {function} onConfirm - Function to call when the action is confirmed.
 */
const MuDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Embedded CSS */}
      <style>
        {`
          .mu-msdel-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .msdel-modal-content {
            background: white;
            border-radius: 8px;
            width: 400px; /* Reduced width */
            height: 300px; /* Reduced height */
            padding: 15px 20px; /* Adjusted padding */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .msdel-modal-body {
            text-align: center;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .msdel-warning-icon {
            color: #f1c40f;
            font-size: 4.5rem; /* Reduced icon size */
            margin-bottom: 15px; /* Adjusted margin */
          }

          .msdel-modal-title {
            font-size: 2rem; /* Reduced title font size */
            font-weight: bold;
            margin-bottom: 10px; /* Adjusted margin */
            color: #000000;
          }

          .msdel-modal-description {
            font-size: 0.9rem; /* Reduced description font size */
            font-weight: bold;
            color: #847F7F;
            margin-bottom: 15px; /* Adjusted margin */
            line-height: 1.4;
          }

          .msdel-modal-footer {
            display: flex;
            justify-content: center;
            gap: 15px; /* Adjusted gap */
            width: 100%;
            margin-top: auto;
            padding-bottom: 15px; /* Adjusted padding */
          }

          .msdel-modal-button {
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px; /* Adjusted gap */
            font-size: 1rem; /* Reduced button font size */
            min-width: 140px; /* Reduced min-width */
            height: 48px; /* Reduced height */
            padding: 0 20px; /* Adjusted padding */
          }

          .msdel-modal-button-primary {
            background: #5A66F1;
            color: #FFFFFF;
          }

          .msdel-modal-button-secondary {
            background: #000000;
            color: #FFFFFF;
          }
        `}
      </style>

      <div className="msdel-modal-overlay">
        <div className="msdel-modal-content">
          <div className="msdel-modal-body">
            {/* Warning Icon */}
            <svg
              className="msdel-warning-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>

            <h4 className="msdel-modal-title">Are you sure?</h4>
            <p className="msdel-modal-description">
              You will not be able to recover the deleted record!
            </p>
          </div>

          <div className="msdel-modal-footer">
            <button
              className="msdel-modal-button msdel-modal-button-primary"
              onClick={onConfirm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
              Yes, Delete it!
            </button>

            <button
              className="msdel-modal-button msdel-modal-button-secondary"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
              No, Cancel!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;