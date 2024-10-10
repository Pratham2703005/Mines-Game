import React from 'react'

const NavBar = ({balance}) => {
  return (
    <nav className='w-[100vw] py-4 bg-gray-900'>
        <div className='flex w-[80%] mx-auto justify-between'>
          <h1 className='text-white text-[2rem] font-bold ml-[-20px] xsm:text-5xl xsm:ml-[-100px]'>@PK</h1>
          <div className='text-[1.5rem] text-white font-bold mt-1 xsm:text-4xl'>
            <span className='text-orange-300'>Balance :</span> ${balance}
          </div>
        </div>
      </nav>
  )
}

export default NavBar
