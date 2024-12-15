import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Chart from '../components/Chart';

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
          <p className="text-white text-sm mb-3 ml-10">
            {coin.description.en.length > 187
              ? `${coin.description.en.substring(0, 187)}.`
              : coin.description.en}
          </p>
          <div className="mt-8 ml-10 text-white text-2xl">
            <div className='flex gap-2 mb-3'>
            <h1>Rank :</h1>
            <h2>{coin.market_cap_rank}</h2>
            </div>
            <div className='flex gap-2 mb-3'>
            <h1>Current Price : </h1>
            <h2>₹{coin.market_data.current_price.usd}</h2>
            </div>
            <div className='flex gap-2'>
            <h1>Market Cap </h1>
            <h2>:₹{coin.market_data.market_cap.usd.toLocaleString()}</h2>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Chart coinId={id} />
        </div>
      </div>
    </div>
  );
}


export default Details