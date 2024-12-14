import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center mt-5 px-5 sm:px-10 md:px-20 max-w-screen-lg mx-auto'>
        <div>
            <h2 className='text-2xl font-bold text-[#87CEEB]'>CRYPTOFOLIO</h2>
        </div>
        <div className='flex gap-5'>
            <select className='bg-transparent bg-white rounded-md' name="" id="">
                <option value="">USD</option>
                <option value="">RUB</option>
                <option value="">EURO</option>
            </select>
            <button className='bg-[#87CEEB] py-2 px-5 font-medium rounded-md'>WATCH LIST</button>
        </div>
    </div>
  )
}

export default Header
