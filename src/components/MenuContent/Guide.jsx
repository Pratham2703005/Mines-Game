import React from 'react';

const Guide = () => {
  return (
    <div className="App px-6 py-10 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="md:text-5xl text-4xl font-extrabold text-center mb-20 ">Betting Guide</h1>

      {/* Section 1: Initial Balance */}
      <div className="section flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <img src="./GuideImage/Balance.png" alt="Initial Balance" className="w-64 h-auto rounded-md shadow-lg mb-6 md:mb-0" />
        <p className="text-lg md:ml-8 leading-relaxed">
          Your starting balance is <span className="font-semibold ">$1000</span>. This is the amount you can use to place bets in the game.
        </p>
      </div>

      {/* Section 2: Setting Betting Amount */}
      <div className="section flex flex-col-reverse md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <p className="text-lg mb-6 md:mb-0 md:mr-8 leading-relaxed">
          Select your betting amount, starting at <span className="font-semibold">$10</span>. Ensure it’s within your available balance.
        </p>
        <img src="./GuideImage/SetAmount.png" alt="Betting Amount" className="w-64 h-auto rounded-md shadow-lg mb-8" />
      </div>

      {/* Section 3: Selecting Number of Mines */}
      <div className="section flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <img src="./GuideImage/SetMines.png" alt="Number of Mines" className="w-64 h-auto rounded-md shadow-lg mb-6 md:mb-0" />
        <p className="text-lg md:ml-8   leading-relaxed">
          Choose the number of mines (bombs) between <span className="font-semibold  ">1</span> and <span className="font-semibold  ">24</span>. The more mines you set, the higher the risk and the greater the reward.
        </p>
      </div>

      {/* Section 4: Placing the Bet */}
      <div className="section flex flex-col-reverse md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <p className="text-lg mb-6 md:mb-0 md:mr-8   leading-relaxed">
          After selecting your bet amount and the number of mines, click the <span className="font-bold text-green-500">"Bet"</span> button to place your bet. Once placed, it will turn red and say <span className="font-bold text-red-500">"Cashout"</span>.
        </p>
        <img src="./GuideImage/BetButton.png" alt="Bet Button" className="w-64 h-auto rounded-md shadow-lg mb-8" />
      </div>

      {/* Section 5: Cashout Option */}
      <div className="section flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <img src="./GuideImage/CashOut.png" alt="Cashout Button" className="w-64 h-auto rounded-md shadow-lg mb-6 md:mb-0" />
        <p className="text-lg md:ml-8   leading-relaxed">
          Click <span className="font-bold text-red-500">"Cashout"</span> anytime to secure your winnings, based on the diamonds found and your bet amount.
        </p>
      </div>

      {/* Section 6: Card Layout */}
      <div className="section flex flex-col-reverse md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <p className="text-lg mb-6 md:mb-0 md:mr-8   leading-relaxed">
          In front of you are <span className="font-bold  ">25 cards</span>. Some hide bombs, while others hide diamonds. Keep selecting cards to find diamonds, but hitting a bomb ends the game.
        </p>
        <img src="./GuideImage/CardsLayout.png" alt="Card Layout" className="w-64 h-auto rounded-md shadow-lg mb-8" />
      </div>

      {/* Section 7: Popups and Winnings */}
      <div className="section flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-600 pb-8">
        <img src="./GuideImage/popups.png" alt="Winnings Popup" className="w-64 h-auto rounded-md shadow-lg mb-6 md:mb-0" />
        <p className="text-lg md:ml-8   leading-relaxed">
          After cashing out or hitting a bomb, a popup shows your winnings or losses. Your balance is updated accordingly.
        </p>
      </div>
      {/* Section 8: Refill Balance when User Loses All Money */}
      <div className="section flex flex-col-reverse md:flex-row items-center justify-between mb-12 pb-8">
      <p className="text-lg mb-6 md:mb-0 md:mr-8   leading-relaxed">
          If your balance drops to zero, don't worry! You can refill your balance back to $1000 by clicking the <strong>"Refill Balance"</strong> button below. Keep playing and good luck!
        </p>
        <img src="./GuideImage/Refill.png" alt="Refill Balance Button" className="w-64 h-auto rounded-md shadow-lg mb-8 md:ml-0 ml-3" />
      </div>

    </div>
  );
}

export default Guide;
