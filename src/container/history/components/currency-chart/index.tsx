import React from 'react';

import Chart from 'chart.js/auto';
import { useDynamic } from './hooks';

export type CurrencyChartProps = {
    currencyBuy: string;
    currencySell: string;
};

const CurrencyChart = (props: CurrencyChartProps) => {
    const { labels, data } = useDynamic(props);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useLayoutEffect(() => {
        if (!data.length) return;

        const chart = new Chart(canvasRef.current, {
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
            chart.clear();
            chart.destroy();
        }
    }, [labels, data]);

    return (
        <React.Fragment>
            <canvas ref={canvasRef}></canvas>
        </React.Fragment>
    );
}

export default CurrencyChart;