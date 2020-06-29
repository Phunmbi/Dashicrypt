import React from "react";
import Chart from "./Chart";

const Modal = ({ handleClose, History, openId }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => handleClose()} />
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "7px",
        }}
      >
        <h2 className="has-text-centered" style={{ margin: "15px auto" }}>
          <strong>{openId}</strong>
        </h2>
        <Chart History={History} />
      </div>
      <button
        onClick={() => handleClose()}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
