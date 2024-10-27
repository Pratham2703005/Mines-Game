import React from 'react';
import './Card.css';

const Card = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className='card h-[3.5rem] w-[3rem] xl:h-24 xl:w-24'>
      <div className={flipped ? 'flipped' : ''}>
        <div className="relative w-full h-full front rounded-lg border-[2px] border-solid border-white">
          <div className="w-full h-full flex justify-center items-center select-none">
            <img
              src={card.src}
              alt="card-front"
              className="block xl:w-[3.75rem] w-[1.5rem] mix-blend-color-burn object-contain"
            />
          </div>
        </div>
        
        <div
          className='back rounded-lg block border-[2px] border-solid border-white bg-[rgb(8,30,52)]'
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default Card;
