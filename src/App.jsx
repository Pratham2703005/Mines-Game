import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import NavBar from './components/NavBar';

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
      setBetval(parseInt(balance))
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
      <NavBar balance={balance}/>

      <section className='flex gap-10'>
        {/* FORM SECTION */}
        <div className='w-[30%] h-[70vh] flex justify-center items-center '>

          <Form setBetval={setBetval} setBombs={setBombs} handleCashOut={handleCashOut}
          balance={balance} betval={betval} bombs={bombs} betPlaced={betPlaced} handleSubmit={handleSubmit} />
          
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
