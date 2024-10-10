import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const bombImage = { "src": "./assets/bomb.png", matched: false };
const diamondImage = { "src": "./assets/diamond.png", matched: false };

const App = () => {

  const [balance, setBalance] = useState(1000);
  const [bombs, setBombs] = useState(3);
  const [cards, setCards] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [betval, setBetval] = useState(10);
  const [betPlaced, setBetPlaced] = useState(false);
  const [increment, setIncrement] = useState(0);

  const shuffleCards = () => {
    const allcards = [];
    for (let i = 0; i < 25; i++) {
      if (i < bombs) {
        allcards.push({ ...bombImage, id: i });
      } else {
        allcards.push({ ...diamondImage, id: i });
      }
    }
    allcards.sort(() => Math.random() - 0.5);
    setCards(allcards);
  };

  const handleChoice = (card) => {
    if (betPlaced) {
      setChosen(card);
    }
  };

  useEffect(() => {
    if (chosen) {
      if (chosen.src === './assets/bomb.png') {
        const turned = calculateTurnedCards();
        let totalPrice = (turned) * increment;
        totalPrice *= parseInt(betval)
        totalPrice += parseInt(betval)
        const notify = () => toast.error(`YOU LOST : $${totalPrice}`);
        notify()
        const sound = new Audio('./assets/bombs.mp3'); // Sound file ka path
          sound.play();
        setTimeout(()=>{
          setChosen(null);
          setBetPlaced(false);
          shuffleCards();
        },1000);
      } else {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card === chosen) {
              const sound = new Audio('./assets/diamond.mp3'); // Sound file ka path
              sound.play();
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
    }
  }, [chosen]);

  useEffect(() => {
    shuffleCards();
  }, [betPlaced]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (betval > balance) {
      alert("Not enough balance");
    } else {
      setBetPlaced(true);
      setBalance(balance - betval);
      setIncrement(parseFloat(bombs * 0.04));
      console.log("increment : ", parseFloat(bombs * 0.04))
      console.log(cards)
    }
  };

  const calculateTurnedCards = () => {
    return cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
  };

  const handleCashOut = () => {
    const turned = calculateTurnedCards();

    let totalPrice = turned * increment;
    totalPrice *= parseInt(betval)
    const notify = () => {
      toast.success(`YOU GAIN : ${totalPrice}`)
    }
    notify()
    totalPrice += parseInt(betval)
    
    setBalance((prevBalance) => {
      const newBalance = prevBalance + totalPrice;
      const roundedBalance = parseFloat(newBalance.toFixed(2));
      return roundedBalance;
    });

    setBetPlaced(false);
    setBetval(0);
  };

  return (
    <div>
      <nav className='w-full py-4 bg-gray-900 '>
        <div className='flex w-[80%] mx-auto justify-between'>
          <h1 className='text-white text-5xl font-bold ml-[-100px]'>@PK</h1>
          <div className='text-4xl text-white font-bold'>
            <span className='text-orange-300'>Balance :</span> ${balance}
          </div>
        </div>
      </nav>

      <section className='flex gap-10'>
        {/* FORM SECTION */}
        <div className='w-[30%] h-[70vh] flex justify-center items-center '>
          <form onSubmit={handleSubmit} className='bg-gray-800 p-[1.75rem] rounded-lg shadow-lg flex flex-col items-start min-w-[19.5rem] ml-[230px]'>
            <h1 className='text-white text-2xl font-bold mb-4 mx-auto'>MINES</h1>

            <label htmlFor="betValue" className='text-white mb-1'>Bet Amount : </label>
            <input
              id="betValue"
              type="number"
              min={10}
              max={balance}
              step={1}
              value={betval}
              onChange={(e) => setBetval(e.target.value)}
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
        </div>

        {/* //Card SECTION */}
        <div className='max-w-[570px] mt-10 mx-auto bg-gray-800 px-5 py-5'>
          <div className='grid grid-cols-5 gap-3'>
            {cards.map((card) => (
              <Card key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === chosen || card.matched}
              />
            ))}
          </div>
        </div>
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce />
    </div>
  );
}

export default App;
