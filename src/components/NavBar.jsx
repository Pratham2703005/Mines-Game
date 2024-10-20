import React from 'react'

const NavBar = ({ balance }) => {
  return (
    <nav className='w-full py-4 bg-NavBar flex justify-center shadow-lg'>
      <div className='flex flex-row w-[80%] items-center justify-between'>
        <h1 className='text-white text-3xl font-bold md:text-5xl'>
          @PK
        </h1>
        <div className='flex items-center text-2xl text-white font-bold md:text-4xl'>
          <p className='text-orange-300 mr-2'>Balance:</p>
          <span className='text-green-400'>${balance}</span>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
