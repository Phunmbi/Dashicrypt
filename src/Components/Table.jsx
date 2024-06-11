"use client"

import React from "react";
import { TokenIcon } from "@token-icons/react"

const Table = ({ assetsList, handleClick, loadingHistory }) => {
  return (
    <div className="section">
      <table
        className="table is-hoverable is-fullwidth container"
        style={{
          borderRadius: "7px",
          boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#5348562e" }}>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Icon</th>
            <th>Full Name</th>
            <th>Current Price</th>
            <th>Price History</th>
          </tr>
        </thead>
        <tfoot>
          <tr style={{ backgroundColor: "#5348562e" }}>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Icon</th>
            <th>Full Name</th>
            <th>Current Price</th>
            <th>Price History</th>
          </tr>
        </tfoot>
        <tbody>
          {assetsList.map((eachCoin) => {
            return (
              <tr key={eachCoin.id} id={`${eachCoin.id}`}>
                <td>
                  <strong>{eachCoin.rank}</strong>
                </td>
                <td>
                  <strong>{eachCoin.symbol}</strong>
                </td>
                <td>
                  <TokenIcon symbol={`${eachCoin.symbol}`} size={40} variant="branded" />
                </td>
                <td>
                  <strong>{eachCoin.name}</strong>
                </td>
                <td data-tooltip="Tooltip content">
                  <strong>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(eachCoin.priceUsd)}
                  </strong>
                </td>
                <td
                  className="has-text-link"
                  style={
                    loadingHistory
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                  onClick={(e) => handleClick(e)}
                >
                  View
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
