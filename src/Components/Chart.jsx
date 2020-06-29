import React from "react";
import { cloneDeep } from "lodash";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const renderLineChart = ({ History }) => {
	const cloneHistory = cloneDeep(History);
	cloneHistory.map((each) => {
		return (each.date = new Date(each.date).toLocaleDateString("en-GB"));
	});

	return (
		<div>
			<LineChart
				width={850}
				height={400}
				data={cloneHistory}
				margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
				<Line type="monotone" dataKey="priceUsd" stroke="#ea2768" />
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" padding={{ left: 10 }} />
				<YAxis unit="$" />
				<Tooltip />
			</LineChart>
		</div>
	);
};

export default renderLineChart;
