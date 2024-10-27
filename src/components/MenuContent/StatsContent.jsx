import React, { useState } from 'react';
import StatsPie from './StatsPie';
import { formatAmount } from '../utility/FormatAmount';

const StatsContent = () => {
    // Retrieve other data from local storage
    const storedBalance = localStorage.getItem('balance');
    const storedRefillCount = localStorage.getItem('refillCount');
    const storedMaxBalance = localStorage.getItem('maxBalance');
    const storedBetCount = localStorage.getItem('BetsMade');
    const storedBetWins = localStorage.getItem('Wins');
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

    let losCount = storedBetCount - storedBetWins || 0;
    losCount -= storedBetZeroWins || 0;
    const winCount = storedBetWins || 0;
    const betCount = storedBetCount || 0;
    const winRatio = betCount > 0 ? ((winCount / betCount) * 100).toFixed(2) : 0;
    const losRatio = betCount > 0 ? ((losCount / betCount) * 100).toFixed(2) : 0;
    const noResultRatio = parseFloat(100 - losRatio - winRatio).toFixed(2);
    return (
        <div className="p-6 bg-gray-200 text-black rounded-lg shadow-xl max-w-lg mx-auto mt-5 mb-5 select-none">
            <h1 className="text-3xl font-bold mb-4 text-center">Game Stats</h1>
            <div className='z-50 flex flex-col items-center justify-center h-[50%] overflow-hidden'>
                {/* Heading */}
                <h3 className="text-2xl font-bold mt-4 text-left w-full">Overview :-</h3>

                {/* Pie Chart */}
                <StatsPie data1={winRatio} data2={losRatio} data3={noResultRatio} />

                {/* Legend for the colors */}
                <div className="flex flex-col xl:flex-row mt-4 xl:space-x-4 mb-10">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[rgb(2,230,3)] mr-2"></div>
                        <span>Win Ratio : {winRatio}%</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[rgb(230,2,2)] mr-2"></div>
                        <span>Lose Ratio: {losRatio}%</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-black mr-2"></div>
                        <span>No Result : {noResultRatio}% </span>
                    </div>
                </div>
            </div>




            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border-b-2 border-black py-2 w-[70%]">Statistic</th>
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
                        <td className="border-b border-gray-400">{formatAmount(storedBalance) || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Balance</td>
                        <td className="border-b border-gray-400">{formatAmount(storedMaxBalance) || 0}</td>
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
                        <td className="border-b border-gray-400">Curr Win Streak</td>
                        <td className="border-b border-gray-400">{storedCurrWinStreak || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Win Streak</td>
                        <td className="border-b border-gray-400">{storedMaxWinStreak || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Curr Lost Streak</td>
                        <td className="border-b border-gray-400">{storedCurrLosStreak || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Lost Streak</td>
                        <td className="border-b border-gray-400">{storedMaxLosStreak || 0}</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-400">Max Mines Opened</td>
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
                    <tbody className="text-lg">
                        {/* First Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Bet Amount:</td>
                            <td className='w-1/4 text-right'>{formatAmount(maxBetWin.betVal)}</td>
                        </tr>
                        {/* Second Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Mines:</td>
                            <td className='w-1/4 text-right'>{maxBetWin.mines}</td>
                        </tr>
                        {/* Third Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Mines Opened:</td>
                            <td className='w-1/4 text-right'>{maxBetWin.minesOpen}</td>
                        </tr>
                        {/* Fourth Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Profit:</td>
                            <td className='w-1/4 text-right'>{formatAmount(maxBetWin.profit)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Max Bet Loss */}
            <div className="border-t pt-5">
                <h3 className="text-xl font-bold mb-2 text-center">Biggest Loss</h3>
                <table className="w-full table-auto border-collapse">
                    <tbody className="text-lg">
                        {/* First Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Bet Amount:</td>
                            <td className='w-1/4 text-right'>{formatAmount(maxBetLoose.betVal)}</td>
                        </tr>
                        {/* Second Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Mines:</td>
                            <td className='w-1/4 text-right'>{maxBetLoose.mines}</td>
                        </tr>
                        {/* Third Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Mines Opened:</td>
                            <td className='w-1/4 text-right'>{maxBetLoose.minesOpen}</td>
                        </tr>
                        {/* Fourth Row */}
                        <tr className="flex justify-between px-4 py-2">
                            <td className='w-3/4 text-left'>Loss:</td>
                            <td className='w-1/4 text-right'>{formatAmount(maxBetLoose.lostAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default StatsContent;
