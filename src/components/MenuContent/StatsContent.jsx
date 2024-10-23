import React, { useState } from 'react';

const StatsContent = () => {
    // Retrieve other data from local storage
    const storedBalance = localStorage.getItem('balance');
    const storedRefillCount = localStorage.getItem('refillCount');
    const storedMaxBalance = localStorage.getItem('maxBalance');
    const storedBetCount = localStorage.getItem('BetsMade');
    const storedBetWins = localStorage.getItem('Win');
    const storedBetZeroWins = localStorage.getItem('WinNothing');
    const storedMineOpen = localStorage.getItem('MineOpen');
    const storedMaxMineOpen = localStorage.getItem('MaxMineOpen');
    const storedMaxWinStreak = localStorage.getItem('MaxWinStreak');
    const storedMaxLosStreak = localStorage.getItem('MaxLosStreak');
    const storedCurrWinStreak = localStorage.getItem('CurrWinStreak');
    const storedCurrLosStreak = localStorage.getItem('CurrLosStreak');


    const [maxBetWin, setMaxBetWin] = useState(() => {
        const savedObject = localStorage.getItem('maxBetWin');
        return savedObject ? JSON.parse(savedObject) : { betVal: 0, mines: 0, minesOpen: 0, profit: 0 };
    });
    const [maxBetLoose, setMaxBetLoose] = useState(() => {
        const savedObject = localStorage.getItem('maxBetLoose');
        return savedObject ? JSON.parse(savedObject) : { betVal: 0, mines: 0, minesOpen: 0, lostAmount: 0 };
    });

    let losCount = storedBetCount- storedBetWins || 0;
    losCount -= storedBetZeroWins || 0;
    const winCount = storedBetWins || 0;
    const betCount = storedBetCount || 0;
    const winRatio = betCount > 0 ? ((winCount / betCount) * 100).toFixed(2) : 0;
    const losRatio = betCount > 0 ? ((losCount / betCount) * 100).toFixed(2) : 0;
    return (
        <div className="p-6 bg-gray-200 text-black rounded-lg shadow-md max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Game Stats</h2>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border-b-2 border-black py-2 w-[50%]">Statistic</th>
                        <th className="border-b-2 border-black py-2">Value</th>
                    </tr>
                </thead>
                <tbody className="text-lg text-center">
                    <tr>
                        <td className="border-b border-gray-400">Mines Opened</td>
                        <td className="border-b border-gray-400">{storedMineOpen || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Balance</td>
                        <td className="border-b border-gray-400">{storedBalance || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Balance</td>
                        <td className="border-b border-gray-400">{storedMaxBalance || 0}</td>
                    </tr>
                    
                    <tr>
                        <td className="border-b border-gray-400">Total Bets</td>
                        <td className="border-b border-gray-400">{storedBetCount || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Total Wins</td>
                        <td className="border-b border-gray-400">{storedBetWins || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Total Lost</td>
                        <td className="border-b border-gray-400">{losCount}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Current Win Streak</td>
                        <td className="border-b border-gray-400">{storedCurrWinStreak}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Win Streak</td>
                        <td className="border-b border-gray-400">{storedMaxWinStreak}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Current Lost Streak</td>
                        <td className="border-b border-gray-400">{storedCurrLosStreak}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Lost Streak</td>
                        <td className="border-b border-gray-400">{storedMaxLosStreak}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Mines Open in a Game</td>
                        <td className="border-b border-gray-400">{storedMaxMineOpen || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Refill Count</td>
                        <td className="border-b border-gray-400">{storedRefillCount || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Win Ratio (%)</td>
                        <td className="border-b border-gray-400">{winRatio}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Losing Ratio (%)</td>
                        <td className="border-b border-gray-400">{losRatio}</td>
                    </tr>
                </tbody>
            </table>

           {/* Max Bet Win */}
<div className="border-t pt-5">
  <h3 className="text-xl font-bold mb-2 text-center">Biggest Win</h3>
  <table className="w-full table-auto border-collapse">
    <tbody className="text-lg text-center">
      <tr className="divide-x">
        <td className='w-4/12'>Bet Amount:</td>
        <td className='w-2/12'>{maxBetWin.betVal}</td>
        <td className='w-4/12'>Profit:</td>
        <td className='w-2/12'>{maxBetWin.profit}</td>
      </tr>
      <tr className="divide-x">
        <td className='w-4/12'>Mines Opened:</td>
        <td className='w-2/12'>{maxBetWin.minesOpen}</td>
        <td className='w-4/12'>Mines:</td>
        <td className='w-2/12'>{maxBetWin.mines}</td>
      </tr>
    </tbody>
  </table>
</div>

{/* Max Bet Loss */}
<div className="border-t pt-5">
  <h3 className="text-xl font-bold mb-2 text-center">Biggest Loss</h3>
  <table className="w-full table-auto border-collapse">
    <tbody className="text-lg text-center">
      <tr className="divide-x">
        <td className='w-4/12'>Bet Amount:</td>
        <td className='w-2/12'>{maxBetLoose.betVal}</td>
        <td className='w-4/12'>Loss:</td>
        <td className='w-2/12'>{maxBetLoose.lostAmount}</td>
      </tr>
      <tr className="divide-x">
        <td className='w-4/12'>Mines Opened:</td>
        <td className='w-2/12'>{maxBetLoose.minesOpen}</td>
        <td className='w-4/12'>Mines:</td>
        <td className='w-2/12'>{maxBetLoose.mines}</td>
      </tr>
    </tbody>
  </table>
</div>


        </div>
    );
};

export default StatsContent;
