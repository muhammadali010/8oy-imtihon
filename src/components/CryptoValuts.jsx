import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function CryptoCoins() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 10;

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
            .then(response => response.json())
            .then(data => setCoins(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-[#14161a] py-10">
            <h3 className="text-center font-light text-4xl text-white mb-8">Cryptocurrency Prices by Market Cap</h3>

            <div className="flex justify-center items-center mb-8">
                <input
                    className="bg-transparent border-2 border-gray-600 w-[1040px] py-2 px-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    type="text"
                    placeholder="Search For a Crypto Currency..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1">
                    <div className='wrapper bg-[#87CEEB] h-14 flex p-4'>
                        <h1 className='ml-10'>Coin</h1>
                        <h1 className='ml-64 mr-48'>Price</h1>
                        <h1>24h Change</h1>
                        <h1 className='ml-60'>Market Cap</h1>
                    </div>
                    {currentCoins.map((coin) => (
                        <div key={coin.id} className="card flex items-center justify-between p-4 bg-transparent rounded-lg shadow-lg text-white">
                            <div className="flex items-center space-x-4 w-1/4">
                                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                                <Link to={`/coin/${coin.id}`} className="text-lg font-medium">{coin.name}</Link>
                            </div>

                            <span className="w-1/4 text-center text-lg font-semibold">
                                ₹ {coin.current_price.toFixed(2)}
                            </span>

                            <div className={`w-1/4 flex justify-center items-center text-lg font-semibold ${ coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-white' }`}>
                                <FaEye className="mr-2" />
                                <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                            </div>
                            <span className="w-1/4 text-right text-lg font-semibold">
                                ₹ {coin.market_cap.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                {[...Array(Math.ceil(filteredCoins.length / coinsPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CryptoCoins;
