import React, { useEffect, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
// import './App.css';
import Card from './components/Card';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import NavBar from './components/NavBar';

const bombImage = { "src": "./assets/bomb.png", matched: false };
const diamondImage = { "src": "./assets/diamond.png", matched: false };
const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
});
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

        // const notify = () => toast.error(`YOU LOST : $${parseFloat(totalPrice.toFixed(2))}`);
        // notify()
        notyf.error(`YOU LOST : $${parseFloat(totalPrice.toFixed(2))}`)
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
      const tmp = balance - betval;
      setBalance(parseFloat(tmp.toFixed(2)));
      setIncrement(parseFloat(bombs * 0.04));
    }
  };

  const calculateTurnedCards = () => {
    return cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
  };

  const handleCashOut = () => {
    const turned = calculateTurnedCards();

    let totalPrice = turned * increment;
    totalPrice *= parseInt(betval)
    // const notify = () => {
    //   toast.success(`YOU GAIN : ${parseFloat(totalPrice.toFixed(2))}`)
    // }
    // notify()
    notyf.success(`YOU GAIN : ${parseFloat(totalPrice.toFixed(2))}`)
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

      <section className='flex gap-5 md-gap-10 flex-col-reverse md:flex-row'>
        {/* FORM SECTION */}
        <div className='w-full h-[50vh] flex justify-center items-center  md:h-[88vh] md:w-[30%]'>
          <Form setBetval={setBetval} setBombs={setBombs} handleCashOut={handleCashOut}
          balance={balance} betval={betval} bombs={bombs} betPlaced={betPlaced} handleSubmit={handleSubmit} />
        </div>
        
        {/* //Card SECTION */}
        <div className='max-w-[100vw] bg-Input md:px-5 md:py-5 md:mt-[1.5rem] mx-auto md:mr-[9rem] rounded-md mt-5'>
          <div className='max-w-full grid grid-cols-5 gap-3'>
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
      {/* <ToastContainer
        position="top-center" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce /> */}
    </div>
  );
}

export default App;
