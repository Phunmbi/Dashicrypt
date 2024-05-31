import React, { useEffect, useState } from "react";
import axios from "axios";
import { cloneDeep } from "lodash";
import LoadingGear from "../Assets/loadingGear.svg";
import Modal from "../Components/Modal";
import Table from "../Components/Table";

const App = () => {
	const [assetsList, setAssetsList] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [history, setHistory] = useState([]);
	const [openId, setOpenId] = useState("");
	const [loadingHistory, setLoadingHistory] = useState(false);

	useEffect(() => {
		async function fetchData() {
			axios({
				method: "GET",
				url: "https://api.coincap.io/v2/assets",
				responseType: "json",
			})
				.then((resp) => {
					setAssetsList(resp.data?.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}

		fetchData();
	}, [assetsList.length]);

	useEffect(() => {
		const clonedAsset = cloneDeep(assetsList);
		const assetsListIds = assetsList.map(each => each.id)

		const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetsListIds}`);

		pricesWs.onmessage = (msg) => {
			clonedAsset.map((eachAsset) => {
				const parsedMessage = JSON.parse(msg.data);
				if (parsedMessage[eachAsset.id]) {
					const convertedParsedMessage = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(parsedMessage[eachAsset.id]);

					const convertedPrice = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(eachAsset.priceUsd);

					if (
						convertedPrice.localeCompare(convertedParsedMessage, undefined, {
							numeric: true,
						}) !== 0
					) {
						eachAsset.priceUsd = parsedMessage[eachAsset.id];
						return setIndicator(eachAsset.id, convertedPrice, convertedParsedMessage);
					}
				}
			});

			setAssetsList(clonedAsset);
		};

		return () => {
			pricesWs.close();
		};
	}, [assetsList]);

	const setIndicator = (id, oldPrice, newPrice) => {
		const low = document.getElementById(`${id}`);

		if (
			oldPrice.localeCompare(newPrice, undefined, {
				numeric: true,
			}) === 1
		) {
			low.className = "priceDrop";
		} else if (
			oldPrice.localeCompare(newPrice, undefined, {
				numeric: true,
			}) === -1
		) {
			low.className = "priceIncrease";
		}

		setTimeout(() => {
			low.className = "";
		}, 1500);
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	const handleClick = (e) => {
		const id = e.target.parentNode.id;

		setLoadingHistory(true);
		axios({
			method: "GET",
			url: `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
			responseType: "json",
		}).then((resp) => {
			const last7 = resp.data.data.reverse().splice(0, 7).reverse();
			setOpenId(id);
			setHistory(last7);
			setLoadingHistory(false);
			setOpenModal(true);
		});
	};

	return (
		<>
			{assetsList.length < 1 ? (
				<div className="container is-flex" style={{ height: "100vh" }}>
					<img className="image" style={{ margin: "auto" }} src={LoadingGear} alt="" />
				</div>
			) : (
				<section className="section" style={{ backgroundColor: "#003459" }}>
					<div className="container has-text-centered">
						<h1
							className="title is-size-1"
							style={{ fontFamily: "Permanent Marker", color: "#ffd519e0" }}
						>
							Crypto Dash
						</h1>
					</div>
					<Table
						assetsList={assetsList}
						handleClick={handleClick}
						loadingHistory={loadingHistory}
					/>
				</section>
			)}
			{openModal && <Modal openId={openId} handleClose={handleClose} History={history} />}
		</>
	);
};

export default App;
