import React from 'react';
import './Card.css';

const Card = ({ card, handleChoice, flipped, revealed }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className='card h-[3.5rem] w-[3rem] xl:h-24 xl:w-24'>
      <div className={flipped ? 'flipped' : ''}>
        <div className="relative w-full h-full front rounded-lg  bg-black/40">
          <div className="w-full h-full flex justify-center items-center select-none">
            <img
              src={card.src}
              alt="card-front"
              className="block xl:w-[3.75rem] w-[1.5rem] mix-blend-normal object-contain"
            />
          </div>

          {/* Gray tinted overlay when revealed is true */}
          {revealed && (
            <div className="absolute inset-0 bg-CardFlipBg bg-opacity-10 rounded-lg top-[-3.3rem] xl:top-[-5.8rem]"></div>
          )}
        </div>
        
        <div
          className='back rounded-lg block bg-CardColor'
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default Card;