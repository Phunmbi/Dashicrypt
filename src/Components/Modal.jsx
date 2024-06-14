import React from "react";
import { TokenIcon } from "@token-icons/react"

import Chart from "./Chart";

const Modal = ({ handleClose, History, data }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => handleClose()} />
      <div
        className="modal-content modal-content-add"
      >
        <div className="modal-details has-text-centered">
          <div className="modal-title">
            <TokenIcon symbol={data.symbol} size={70} variant="branded" />
            <h2><strong>{data.name}</strong></h2>
            <h2><strong>Symbol: {data.symbol}</strong></h2>
            <h2><strong><a href={data.explorer}>{data.id}'s explorer</a></strong></h2>
          </div>
          <div className="modal-details-data has-text-left">
            <h2><strong>Price:</strong> ${parseFloat(data.priceUsd).toFixed(2)}</h2>
            <h2><strong>24hr price change:</strong> {parseFloat(data.changePercent24Hr).toFixed(2)}%</h2>
            <h2><strong>Market Cap:</strong> ${parseFloat(data.marketCapUsd).toFixed(2)}</h2>
            <h2><strong>Max Supply:</strong> {data.maxSupply ? parseFloat(data.maxSupply).toFixed(0) : 'N/A'}</h2>
            <h2><strong>Average Supply:</strong> {parseFloat(data.supply).toFixed(0)}</h2>
            <h2><strong>24hr trading volume:</strong> ${parseFloat(data.volumeUsd24Hr).toFixed(2)}</h2>
          </div>
        </div>
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
