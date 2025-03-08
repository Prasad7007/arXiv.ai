import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const TrendChart = ({trend}) => {
    const [options, setOptions] = useState({
        data: JSON.parse(trend),
        series: [{type: "bar", xKey: "month", yKey: "paper_count"}],
        axes: [
            { type: "category", position: "bottom", title: { text: "Month" } },
            { type: "number", position: "left", title: { text: "Paper Count" } }
        ],
        legend: { enabled: true },
    });

    return <AgCharts options={options} />
}

export default TrendChart