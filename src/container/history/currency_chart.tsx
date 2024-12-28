import React from 'react';

import Chart from 'chart.js/auto';
import { getHistory } from '../../api';

export type CurrencyChartProps = {
    currencyBuy: string;
    currencySell: string;
};

const CurrencyChart = (props: CurrencyChartProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    
    React.useLayoutEffect(() => {
        // Construct chart
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let labels = [];
        let data = [];

        {
            let historyBuyCur = getHistory(props.currencyBuy)
            let historySellCur = getHistory(props.currencySell)

            let dictHistoryBuy = {}
            for (let record of historyBuyCur) {
                dictHistoryBuy[record[0]] = record[1];
            }

            for (let record of historySellCur) {
                if (record[0] in dictHistoryBuy) {
                    labels.push(record[0]);
                    data.push(record[1] / dictHistoryBuy[record[0]]);
                }
            }
        }

        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: `Стоимость ${props.currencySell} в ${props.currencyBuy}`,
                    data,
                    fill: false,
                    borderColor: '#1e88e5',
                    pointRadius: 0
                }]
            },
        });
        
        return () => {
            // Dispose the instance
            chart.destroy();
        }
    }, [props.currencyBuy, props.currencySell]);

    return (
        <React.Fragment>
            <canvas ref={canvasRef}></canvas>
        </React.Fragment>
    );
}

export default CurrencyChart;