import React from 'react'

const Form = ({ setBetval, setBombs, handleCashOut, balance, betval, bombs, betPlaced, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='bg-gray-800  rounded-lg shadow-lg flex flex-col items-start min-w-[19.5rem]  xsm:ml-[230px] p-[1.75rem]'>
      <h1 className='text-white text-2xl font-bold mb-4 mx-auto'>MINES</h1>

      <label htmlFor="betValue" className='text-white mb-1'>Bet Amount : </label>
      <input
        id="betValue"
        type="number"
        min={10}
        step={1}
        value={betval}
        onChange={(e) => setBetval(prev => prev === 0 ? prev + Number(e.target.value) : Number(e.target.value))}
        onInput={(e) => e.target.value = e.target.value.replace(/^0+/, '')} // remove leading zeros
        className='w-full px-4 py-2 mb-4 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Enter Bet Value'
        disabled={betPlaced}
      />


      {/* Label for Number of Mines */}
      <label htmlFor="numMines" className='text-white mb-1'>Number of Mines : </label>
      <input
        id="numMines"
        type="number"
        min={1}
        max={24}
        value={bombs}
        step={1}
        onChange={(e) => setBombs(e.target.value)}
        className='w-full px-4 py-2 mb-4 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Enter no. of mines'
        disabled={betPlaced}
      />

      {!betPlaced ? (
        <button
          type='submit'
          className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors mt-9'
        >
          Bet
        </button>
      ) : (
        <button
          type='button'
          onClick={handleCashOut}
          className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors mt-9'
        >
          Cash Out
        </button>
      )}
    </form>
  )
}

export default Form
