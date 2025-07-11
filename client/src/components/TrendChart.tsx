import { AgCharts } from "ag-charts-react";
import { useState } from "react";
import type { AgChartOptions } from "ag-charts-community";

const TrendChart = ({trend}: {trend: string}) => {
    const [options,] = useState<AgChartOptions>({
        data: JSON.parse(trend),
        series: [{type: "bar", xKey: "month", yKey: "paper_count"}],
        axes: [
            { type: "category", position: "bottom", title: { text: "Month" } },
            { type: "number", position: "left", title: { text: "Paper Count" } }
        ],
        legend: { enabled: true },
    });

    return <div className="m-10 p-6 border-4 rounded-3xl border-blue-700 "><AgCharts options={options} /></div>
}

export default TrendChart