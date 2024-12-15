import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function Chart({ coinId }) {
    const [chartData, setChartData] = useState([]);
    const [timeframe, setTimeframe] = useState('24h');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const daysMapping = {
            '24h': 1,
            '30d': 30,
            '3m': 90,
            '1y': 365
        };
        const days = daysMapping[timeframe] || 1;
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)
            .then(response => response.json())
            .then(data => {
                setChartData(data.prices);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error loading chart data:", error);
                setIsLoading(false);
            });
    }, [coinId, timeframe]);

    const options = {
        chart: {
            type: 'line',
            height: 350,
            background: 'transparent',
            toolbar: { show: false }
        },
        theme: { mode: 'dark' },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#999' } }
        },
        yaxis: {
            labels: {
                style: { colors: '#999' },
                formatter: value => '$' + value.toFixed(2)
            }
        },
        tooltip: {
            theme: 'dark',
            x: { format: 'dd MMM yyyy HH:mm' },
            y: { formatter: value => '$' + value.toFixed(2) }
        },
        grid: { borderColor: '#333' }
    };
    const series = [
        {
            name: 'Price',
            data: chartData.map(item => ({ x: new Date(item[0]), y: item[1] }))
        }
    ];
    return (
        <div className="w-full mt-10 h-[600px]">
            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <ReactApexChart options={options} series={series} type="line" height={350} />
            )}
            <div className="mt-4 flex gap-4 justify-center">
                {['24h', '30d', '3m', '1y'].map(tf => (
                    <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`buttons w-[200px] h-[41px] text-white  rounded ${timeframe === tf ? 'bg-blue-500 text-black' : 'bg--transparent'
                            }`}
                    >
                        {tf === '24h' ? '24 Hours' : tf === '30d' ? '30 Days' : tf === '3m' ? '3 Months' : '1 Year'}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Chart;
