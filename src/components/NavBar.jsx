import React from 'react'

const NavBar = ({balance}) => {
  return (
    <nav className='w-full py-4 bg-gray-900 '>
        <div className='flex w-[80%] mx-auto justify-between'>
          <h1 className='text-white text-5xl font-bold ml-[-100px]'>@PK</h1>
          <div className='text-4xl text-white font-bold'>
            <span className='text-orange-300'>Balance :</span> ${balance}
          </div>
        </div>
      </nav>
  )
}

export default NavBar
