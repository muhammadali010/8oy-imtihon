import React from 'react';

function Header({ currency, setCurrency }) {
  return (
    <div className="flex justify-between items-center mt-5 px-5 sm:px-10 md:px-20 max-w-screen-lg mx-auto p-3">
      <div>
        <h2 className="text-2xl font-bold text-[#87CEEB]">CRYPTOFOLIO</h2>
      </div>
      <div className="flex gap-5 items-center">
        <select className="bg-white  border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"  value={currency}  onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
        <button className="bg-[#87CEEB] py-2 px-5 font-medium rounded-md"> WATCH LIST </button>
      </div>
    </div>
  );
}

export default Header;
