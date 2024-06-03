import React, { Suspense } from "react";
import LoadingGear from "../assets/loadingGear.svg";

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
            <th>Full Name</th>
            <th>Current Price</th>
            <th>Price Chart (7 days)</th>
          </tr>
        </thead>
        <tfoot>
          <tr style={{ backgroundColor: "#5348562e" }}>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Full Name</th>
            <th>Current Price</th>
            <th>Price Chart (7 days)</th>
          </tr>
        </tfoot>
        <tbody>
          {assetsList.map((eachCoin) => {
            const iconSVG = `./node_modules/cryptocurrency-icons/svg/color/${eachCoin.symbol.toLowerCase()}.svg`
            // const Logo = React.lazy(() => import(iconSVG));

            return (
              <tr key={eachCoin.id} id={`${eachCoin.id}`}>
                <td>
                  <strong>{eachCoin.rank}</strong>
                </td>
                <td>
                  <strong>{eachCoin.symbol}</strong>
                </td>
                <td className="iconColumn">
                  {/* <Suspense  fallback={
                  <div className="container is-flex" style={{ height: "100vh" }}>
                    <img className="image" style={{ margin: "auto" }} src={LoadingGear} alt="" />
                  </div>
                }> */}
                    <strong>{eachCoin.name}</strong>
                    {/* <Logo />
                  </Suspense> */}
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
