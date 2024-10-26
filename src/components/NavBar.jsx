import React from 'react';
import PopupMenuComponent from './PopupMenuComponent';
import { formatAmount } from '../utility';

const NavBar = ({ balance }) => {
  return (
    <nav className='w-full py-4 bg-NavBar flex justify-center shadow-lg'>
      <div className='flex flex-row w-[80%] items-center justify-between'>
        <div className='flex flex-row md:gap-5 gap-3 ml-[-1.5rem] items-center'>
          <PopupMenuComponent />
          {/* Set the logo and apply the blend effect */}
          <img 
            src="/stake.png"  // Make sure the image path is correct
            alt="Logo" 
            className="h-10 w-auto min-w-2"  // Use darken or multiply for blending
            // style={{ backgroundColor: 'rgb(19, 33, 51)' }}  // Apply the background color here
          />
        </div>
        <div className='flex items-center text-20px text-white font-bold md:text-4xl'>
          <p className='text-orange-300 mr-2'>Balance:</p>
          <span className='text-green-400'>${formatAmount(balance)}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
