import React, { useEffect, useState } from 'react';
import { VscDebugRestart } from "react-icons/vsc";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Swal from 'sweetalert2';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgb(8 25 39)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgb(8 25 39)',
  },
}));

const Form = ({ setBetval, setBombs, handleCashOut, balance, betval, bombs, betPlaced, handleSubmit, setBalance }) => {
  const [refillCount, setRefillCount] = useState(0); // Track refills

  useEffect(() => {
    const storedRefillCount = localStorage.getItem('refillCount');
    if (storedRefillCount) setRefillCount(parseInt(storedRefillCount));
  }, []);

  const handleRefill = () => {       // When want to reinvest money
    Swal.fire({
      title: "Are you sure?",
      text: "You want to refill your balance",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, refill!"
    }).then((result) => {
      if (result.isConfirmed) {
        setBetval(0);
        setBalance(1000);
        setRefillCount(prev => prev + 1);
        localStorage.setItem('balance', 1000);
        localStorage.setItem('refillCount', refillCount + 1);

        Swal.fire({
          title: "Done!",
          text: "Your balance has been refilled.",
          icon: "success"
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='bg-[rgb(33,55,67)] rounded-lg shadow-lg flex flex-col items-start xl:min-w-[25.5rem] max-w-[332px] xl:h-[76vh] xl:ml-[310px] px-[1.25rem] py-[1.75rem]'>
      <h1 className='text-white text-2xl font-bold mb-4 mx-auto'>MINES</h1>

      <div className="flex justify-between items-center mb-1 w-full">
        <span className="text-gray-400">Bet Amount</span>
        <span className="text-gray-400">$0.00</span>
      </div>
      <div className="flex items-stretch w-full shadow-customBox border-[rgb(47,69,83)] border-[1px]">
        <div className="flex-1 relative ">
          <input
            id="betValue"
            type="number"
            min={10}
            step={1}
            value={betval}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setBetval(prev => prev === 0 ? prev + Number(e.target.value) : Number(e.target.value))}
            onInput={(e) => e.target.value = e.target.value.replace(/^0+/, '')}
            className="w-full px-3 py-2 text-white bg-[rgb(15,33,46)] border-[1.5px] border-[#2a3544] focus:outline-none rounded hover:border-[#557086]"
            placeholder="0.00000000"
            disabled={betPlaced}
          />
        </div>
        <button
          type="button"
          onClick={() => setBetval(Math.floor(balance / 2))}
          disabled={betPlaced}
          className="px-4 py-2 bg-[rgb(47,69,83)] text-white border-r border-[#2a3544] hover:bg-[#557086] transition-colors"
        >
          ½
        </button>
        <button
          type="button"
          onClick={() => setBetval(Math.floor(balance))}
          disabled={betPlaced}
          className="px-4 py-2 bg-[rgb(47,69,83)] text-white hover:bg-[#557086] transition-colors rounded"
        >
          2×
        </button>
      </div>



      <>
        <div className="text-gray-400 my-1 ">Mines</div>
        <div className="relative w-full shadow-customBox border-[rgb(47,69,83)] border-[1.5px] hover:border-[#557086]">
          <select
            id="numMines"
            value={bombs}
            onChange={(e) => setBombs(e.target.value)}
            className="w-full px-3 py-2 text-white bg-[rgb(15,33,46)] appearance-none rounded focus:outline-none"
            disabled={betPlaced}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </>



      <div className='w-full flex items-center justify-between'>
        {!betPlaced ? (
          <button
            type='submit'
            className='w-full bg-[rgb(2,230,3)] text-white py-2 rounded hover:bg-[rgb(8,164,8)] transition-colors mt-8 mr-2'
          >
            Bet
          </button>
        ) : (
          <button
            type='button'
            onClick={handleCashOut}
            className='w-full bg-[rgb(230,2,2)] text-white py-2 rounded hover:bg-[rgb(255,50,50)] transition-colors mt-8 mr-2'
          >
            Cash Out
          </button>
        )}

        <BootstrapTooltip title="Re-Fill Balance">
          <button
            type="button"  // <- Add type="button" here as well
            onClick={handleRefill}
            disabled={betPlaced}
            className='bg-blue-500 text-white px-4 py-3 rounded mt-8'>
            <VscDebugRestart />
          </button>
        </BootstrapTooltip>
      </div>
    </form>
  );
};

export default Form;
