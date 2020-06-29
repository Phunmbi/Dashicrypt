import React, { useEffect, useState } from "react";
import axios from "axios";
import { cloneDeep } from "lodash";
import LoadingGear from "../Assets/loadingGear.svg";
import Modal from "../Components/Modal";
import Table from "../Components/Table";
import browserDetection from "../Utils/browserDetection";

const App = () => {
	const [assetsList, setAssetsList] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [history, setHistory] = useState([]);
	const [openId, setOpenId] = useState("");
	const [loadingHistory, setLoadingHistory] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		async function fetchData() {
			axios({
				method: "GET",
				url: "http://ip-api.com/json",
				responseType: "json",
			})
				.then((resp) => {
					setUserInfo({
						browser: browserDetection(navigator),
						ip: resp?.query,
						lat: resp?.lat,
						lon: resp?.lon,
						city: resp?.city,
						country: resp?.country,
					});
				})
				.catch((e) => {
					console.log(e.toString(), e);
				});
		}

		fetchData();
	}, [userInfo.ip]);

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
		const pricesWs = new WebSocket(
			"wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,tether,ripple,bitcoin-cash,bitcoin-sv,binance-coin,eos,cardano,tezos,stellar,chainlink,unus-sed-leo,tron,huobi-token,neo,ethereum-classic,cosmos,dash,usd-coin,iota,zcash,maker,nem,ontology,vechain,basic-attention-token,dogecoin,omisego,paxos-standard-token,digibyte,zilliqa,0x,decred,theta-token,icon,algorand,qtum,lisk,enjin-coin,synthetix-network-token,bitcoin-gold,augur,nano,trueusd,kyber-network,multi-collateral-dai,ravencoin,monacoin,waves,siacoin,holo,status,quant,komodo,wax,verge,crypto-com,dxchain-token,electroneum,steem,bytom,nervos-network,nexo,loopring,energi,unibright,ethlend,iostoken,terra-luna,solve,bitshares,hypercash,republic-protocol,decentraland,maidsafecoin,abbc-coin,golem-network-tokens,ardor,aelf,zcoin,aion,zencash,v-systems,pax-gold,aeternity,power-ledger,streamr-datacoin,bancor,ripio-credit-network,rlc,swissborg,crypterium,stratis,pundi-x,eidoo,kava,waykichain"
		);

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
							style={{ fontFamily: "Permanent Marker", color: "#ffd519e0" }}>
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
