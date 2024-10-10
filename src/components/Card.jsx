import React from 'react'
import './Card.css'

const Card = ({card, handleChoice, flipped}) => {
  const handleClick = ()=>{
    handleChoice(card);
  }
  return (
    <div className='card h-24 w-24'>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card-front" 
        className="front rounded-lg block border-[2px] border-solid border-white absolute bg-[#fff]"/>

        <div className='back  rounded-lg block border-[2px] border-solid border-white bg-blue-950'
        onClick={handleClick}
        ></div>
      </div>
    </div>
  )
}

export default Card
