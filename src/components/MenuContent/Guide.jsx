import React, { useState } from 'react';

const Guide = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Initial Balance",
      content: "Your starting balance is $1000. This is the amount you can use to place bets in the game.",
      image: "./GuideImage/Balance.png"
    },
    {
      title: "Setting Betting Amount",
      content: "Select your betting amount, starting at $10. Ensure it's within your available balance.",
      image: "./GuideImage/SetAmount.png"
    },
    {
      title: "Selecting Number of Mines",
      content: "Choose the number of mines (bombs) between 1 and 24. The more mines you set, the higher the risk and the greater the reward.",
      image: "./GuideImage/SetMines.png"
    },
    {
      title: "Placing the Bet",
      content: "After selecting your bet amount and the number of mines, click the 'Bet' button to place your bet. Once placed, it will turn red and say 'Cashout'.",
      image: "./GuideImage/BetButton.png"
    },
    {
      title: "Playing the Game",
      content: "In front of you are 25 cards. Some hide bombs, while others hide diamonds. Keep selecting cards to find diamonds, but hitting a bomb ends the game.",
      image: "./GuideImage/CardsLayout.png"
    },
    {
      title: "Cashing Out",
      content: "Click 'Cashout' anytime to secure your winnings, based on the diamonds found and your bet amount.",
      image: "./GuideImage/CashOut.png"
    },
    {
      title: "Game Results",
      content: "After cashing out or hitting a bomb, a popup shows your winnings or losses. Your balance is updated accordingly.",
      image: "./GuideImage/popups.png"
    },
    {
      title: "Refill Balance",
      content: "If your balance drops to zero, don't worry! You can refill your balance back to $1000 by clicking the 'Refill Balance' button below. Keep playing and good luck!",
      image: "./GuideImage/Refill.png"
    }
  ];

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg min-h-[29rem] flex flex-col justify-between">
      <div className="p-6 flex-grow">
        <h1 className="text-center text-yellow-400 font-extrabold text-2xl md:text-3xl mb-6">Mines Guide</h1>

        <div className="mb-6 flex-grow">
          <img 
            src={pages[currentPage].image} 
            alt={pages[currentPage].title} 
            className="w-full h-auto max-h-40 object-contain rounded-lg shadow-md mb-4"
          />
          <h2 className="text-lg font-bold text-blue-400 mb-2">{pages[currentPage].title}</h2>
          <p className="text-base leading-relaxed">{pages[currentPage].content}</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 pb-6">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0} 
          className={`px-4 py-2 border rounded text-white border-gray-600 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
        >
          Prev
        </button>
        <p className="text-gray-400">{currentPage + 1}/{pages.length}</p>
        <button 
          onClick={nextPage} 
          disabled={currentPage === pages.length - 1} 
          className={`px-4 py-2 border rounded text-white border-gray-600 ${currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Guide;
