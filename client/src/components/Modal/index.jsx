import React from "react";
import "../../App.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <>
      <div onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>

          <div className="modal-body">{props.children}</div>

          <div className="modal-footer">
            <button className="modal-enter-button">Enter</button>
            <button onClick={props.onClose} className="modal-close-button">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
