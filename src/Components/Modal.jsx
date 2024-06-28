import React from "react";
import { TokenIcon } from "@token-icons/react"

import Chart from "./Chart";

const Modal = ({ handleClose, History, data }) => {
  function capitalizeFirstLetter(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }

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
            <h2><strong>{data.symbol}</strong></h2>
            <h2><strong><a href={data.explorer}>{`${capitalizeFirstLetter(data.id)}`}'s explorer</a></strong></h2>
          </div>
          <div className="modal-details-data has-text-left">
            <h2><strong>Price: </strong>{new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(data.priceUsd)}</h2>
            <h2><strong>24hr price change: </strong> {new Intl.NumberFormat("en-US", {style: "percent",}).format(data.changePercent24Hr/100)}</h2>
            <h2><strong>Market Cap: </strong> {new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(data.marketCapUsd)}</h2>
            <h2><strong>Max Supply: </strong> {data.maxSupply ? new Intl.NumberFormat("en-US", {style: "decimal"}).format(data.maxSupply): 'N/A'}</h2>
            <h2><strong>Average Supply: </strong> {new Intl.NumberFormat("en-US", {style: "decimal"}).format(data.supply)}</h2>
            <h2><strong>24hr trading volume: </strong> {new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(data.volumeUsd24Hr)}</h2>
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
