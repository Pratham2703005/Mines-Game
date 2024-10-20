import React, { useRef } from 'react';
import { VscDebugRestart } from "react-icons/vsc";

const Form = ({ setBetval, setBombs, handleCashOut, balance, betval, bombs, betPlaced, handleSubmit, handleRefill }) => {
  const bombref = useRef(null); // Moved inside the component

  const handleBombFocus = () => {
    if (bombref.current) {
      bombref.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-BetSec rounded-lg shadow-lg flex flex-col items-start md:min-w-[25.5rem] max-w-[332px] md:h-[76vh] md:ml-[310px] p-[1.75rem]'>
      <h1 className='text-white text-2xl font-bold mb-4 mx-auto'>MINES</h1>

      <label htmlFor="betValue" className='text-white mb-1'>Bet Amount : </label>
      <div className='flex items-center w-full'>
        <input
          id="betValue"
          type="number"
          min={10}
          step={1}
          value={betval}
          onChange={(e) => setBetval(prev => prev === 0 ? prev + Number(e.target.value) : Number(e.target.value))}
          onInput={(e) => e.target.value = e.target.value.replace(/^0+/, '')}
          className='w-full px-4 py-2 mb-4 text-white bg-Input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          placeholder='Enter Bet Value'
          disabled={betPlaced}
        />
        <button
          onClick={() => setBetval(Math.floor(balance / 2))}
          className='bg-gray-600 mb-4 text-white rounded-md px-4 py-2 ml-2 hover:bg-gray-700 transition duration-200'
        >
          1/2
        </button>
        <button
          onClick={() => setBetval(Math.floor(balance))}
          className='bg-gray-600 mb-4 text-white rounded-md px-4 py-2 ml-2 hover:bg-gray-700 transition duration-200'
        >
          2x
        </button>
      </div>

      <label htmlFor="numMines" className='text-white mb-1'>Number of Mines : </label>
      <input
        ref={bombref}
        id="numMines"
        type="number"
        min={1}
        max={24}
        value={bombs}
        step={1}
        onChange={(e) => setBombs(e.target.value)}
        className='w-full px-4 py-2 mb-4 text-white bg-Input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Enter no. of mines'
        disabled={betPlaced}
      />
      <div className='w-full flex items-center justify-between'>
        {!betPlaced ? (
          <button
            type='submit'
            className='w-full bg-[rgb(2,230,3)] text-white py-2 rounded-md hover:bg-[rgb(8,164,8)] transition-colors mt-8 mr-2'
          >
            Bet
          </button>
        ) : (
          <button
            type='button'
            onClick={() => {
              handleCashOut(); // Corrected function call
              handleBombFocus(); // Calling focus function
            }}
            className='w-full bg-[rgb(230,2,2)] text-white py-2 rounded-md hover:bg-[rgb(255,50,50)] transition-colors mt-8 mr-2'
          >
            Cash Out
          </button>
        )}
        <button
          onClick={handleRefill}
          disabled={betPlaced}
          className='bg-blue-500 text-white px-4 py-3 rounded mt-8'>
          <VscDebugRestart />
        </button>
      </div>
    </form>
  );
};

export default Form;
