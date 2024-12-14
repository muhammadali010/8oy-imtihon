import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function Details() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(response => response.json())
      .then(data => setCoin(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!coin) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <Header />
      <div className="flex p-10">
        <div className="w-[500px] pr-10">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-[200px] h-[200px] mb-5 ml-32"
          />
          <h1 className="text-white text-4xl mb-8 font-bold ml-44">{coin.name}</h1>
          <p className="text-white text-sm mb-3 ml-10">{coin.description.en.length > 187
        ? `${coin.description.en.substring(0, 187)}.`
        : coin.description.en}</p>
          <div className="mt-8">
            <div className="flex items-center mb-4 text-2xl ml-10">
              <h1 className="text-white mr-3">Rank:</h1>
              <h1 className="text-white">{coin.market_cap_rank}</h1>
            </div>
            <div className="flex items-center mb-4 text-2xl ml-10">
              <h1 className="text-white mr-3">Current Price:</h1>
              <h1 className="text-white">₹{coin.market_data.current_price.usd}</h1>
            </div>
            <div className="flex items-center mb-4 ml-10">
              <h1 className="text-white mr-2 text-2xl">Market Cap:</h1>
              <h1 className="text-white">₹{coin.market_data.market_cap.usd.toLocaleString()}</h1>
            </div>
          </div>
        </div>
        <div className="flex-1">

          <div className="bg-[#242424] p-5 rounded-lg h-[400px]">
            
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#5fb2ff] text-black border-none px-4 py-2 rounded cursor-pointer">
              24 Hours
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              30 Days
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              3 Months
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              1 Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
