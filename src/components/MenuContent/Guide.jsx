import React, { useState } from 'react';

const Guide = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Starting Balance",
      content: "You begin with an initial balance of $1000. This is your starting point for the game, so play wisely and manage your bets to maximize your chances of winning big.",
      image: "./GuideImage/1.png"
    },
    {
      title: "Setting the Bet Amount",
      content: "Set your bet amount based on your balance. The bet limit ranges from a minimum of $10 up to your full balance. Choose an amount that balances risk with reward.",
      image: "./GuideImage/2.png"
    },
    {
      title: "Choosing the Number of Mines",
      content: "Pick the number of mines for the game (let's call this number x). The higher the number of mines, the greater the risk—but also, the higher the potential rewards.",
      image: "./GuideImage/3.png"
    },
    {
      title: "Placing Your Bet",
      content: "Click on the Bet button to start the game after setting your bet amount and number of mines. This action locks in your bet and sets up the game board.",
      image: "./GuideImage/4.png"
    },
    {
      title: "Understanding the Game Board",
      content: "The board has 25 cards with x mines hidden beneath them. The rest are diamonds. Your goal is to uncover as many diamonds as you can while avoiding the mines.",
      image: "./GuideImage/5.png"
    },
    {
      title: "Finding Diamonds",
      content: "Each time you find a diamond, your reward increases. The more diamonds you uncover, the higher your total reward will be. Choose carefully to avoid the mines!",
      image: "./GuideImage/6.png"
    },
    {
      title: "Cash Out Anytime",
      content: "You have the option to cash out at any point during the game. If you feel satisfied with your reward, click Cash Out to secure your winnings and end the round.",
      image: "./GuideImage/7.png"
    },
    {
      title: "Risk of Losing",
      content: "If you uncover a mine, the game ends immediately, and you lose your bet amount. Play carefully and keep your eyes on the diamonds to avoid this outcome.",
      image: "./GuideImage/8.png"
    },
    {
      title: "Low Balance Refill",
      content: "If your balance becomes low, you can refill it to continue playing. Refilling helps you get back in the game if you hit a losing streak and need more funds.",
      image: "./GuideImage/9.png"
    }
    
  ];

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-900 rounded-lg shadow-lg min-h-[29rem] xl:min-h-[25.5rem] flex flex-col justify-between">
      <div className="p-6 flex-grow select-none">
        {/* <h1 className="text-center text-yellow-400 font-extrabold text-2xl xl:text-3xl mb-6">Mines Guide</h1> */}

        <div className="mb-2 flex-grow">
          <img 
            src={pages[currentPage].image} 
            alt={pages[currentPage].title} 
            className="w-full h-auto max-h-40 object-contain rounded-lg shadow-xl mb-4"
          />
          <h2 className="text-lg font-bold text-blue-400 mb-2">{pages[currentPage].title}</h2>
          <p className="text-base leading-relaxed">{pages[currentPage].content}</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 pb-6">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0} 
          className={`px-4 py-2 border rounded  text-gray-900 border-gray-600 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          Prev
        </button>
        <p className="text-gray-400">{currentPage + 1}/{pages.length}</p>
        <button 
          onClick={nextPage} 
          disabled={currentPage === pages.length - 1} 
          className={`px-4 py-2 border rounded text-gray-900 border-gray-600 ${currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 hover:text-white'
            
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Guide;
