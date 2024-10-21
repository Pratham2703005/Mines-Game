import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Card from './components/Card';
import Form from './components/Form';
import NavBar from './components/NavBar';

const bombImage = { src: './assets/bomb.png', matched: false };
const diamondImage = { src: './assets/diamond.png', matched: false };
const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
});

const App = () => {
  const [balance, setBalance] = useState(1000); // Default balance
  const [bombs, setBombs] = useState(3);
  const [cards, setCards] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [betval, setBetval] = useState(10);
  const [betPlaced, setBetPlaced] = useState(false);
  const [increment, setIncrement] = useState(0);
  const [refillCount, setRefillCount] = useState(0); // Track refills
  const [maxBalance, setMaxBalance] = useState(1000); // Track max balance

  // Load balance, refill count, and max balance from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedRefillCount = localStorage.getItem('refillCount');
    const storedMaxBalance = localStorage.getItem('maxBalance');
    
    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedRefillCount) setRefillCount(parseInt(storedRefillCount));
    if (storedMaxBalance) setMaxBalance(parseFloat(storedMaxBalance));
    
    if (!storedBalance) localStorage.setItem('balance', 1000); // Set default balance to 1000 if not present
  }, []);

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
        const turned = cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
        let totalPrice = turned * increment;
        totalPrice *= parseInt(betval);
        totalPrice += parseInt(betval);

        notyf.error(`YOU LOST : $${parseFloat(totalPrice.toFixed(2))}`);
        const sound = new Audio('./assets/bombs.mp3'); // Sound file path
        sound.play();

        setTimeout(() => {
          setChosen(null);
          setBetPlaced(false);
          shuffleCards();
        }, 1000);
      } else {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card === chosen) {
              const sound = new Audio('./assets/diamond.mp3'); // Sound file path
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
      setBetval(parseInt(balance));
    } else {
      setBetPlaced(true);
      const tmp = balance - betval;
      setBalance(parseFloat(tmp.toFixed(2)));
      localStorage.setItem('balance', parseFloat(tmp.toFixed(2))); // Save updated balance in localStorage
      setIncrement(parseFloat(bombs * 0.04));
    }
  };

  const handleCashOut = () => {
    const turned = cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
    let totalPrice = turned * increment;
    totalPrice *= parseInt(betval);
    notyf.success(`YOU GAIN : ${parseFloat(totalPrice.toFixed(2))}`);
    totalPrice += parseInt(betval);

    setBalance((prevBalance) => {
      const newBalance = prevBalance + totalPrice;
      const roundedBalance = parseFloat(newBalance.toFixed(2));
      
      // Update max balance if new balance is higher
      if (roundedBalance > maxBalance) {
        setMaxBalance(roundedBalance);
        localStorage.setItem('maxBalance', roundedBalance); // Save max balance in localStorage
      }

      localStorage.setItem('balance', roundedBalance); // Save balance in localStorage
      return roundedBalance;
    });
    setBetval(0);
    setBetPlaced(false);
  };

  const handleRefill = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to refill your balance",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, refill!"
    }).then((result) => {
      if (result.isConfirmed) {
        setBetval(0);
        setBalance(1000);
        setRefillCount(prev => prev + 1);
        localStorage.setItem('balance', 1000);
        localStorage.setItem('refillCount', refillCount + 1);

        Swal.fire({
          title: "Done!",
          text: "Your balance has been refilled.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div>
      <NavBar balance={balance} maxBalance={maxBalance} refillCount={refillCount} />

      <section className='flex gap-5 md-gap-10 flex-col-reverse md:flex-row'>
        {/* FORM SECTION */}
        <div className='w-full h-[50vh] flex justify-center items-center md:h-[88vh] md:w-[30%]'>
          <Form
            setBetval={setBetval}
            setBombs={setBombs}
            handleCashOut={handleCashOut}
            balance={balance}
            betval={betval}
            bombs={bombs}
            betPlaced={betPlaced}
            handleSubmit={handleSubmit}
            handleRefill={handleRefill}
          />
        </div>

        {/* CARD SECTION */}
        <div className='max-w-[100vw] bg-Input md:px-5 md:py-5 md:mt-[1.5rem] mx-auto md:mr-[9rem] rounded-md mt-5'>
          <div className='max-w-full grid grid-cols-5 gap-3'>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === chosen || card.matched}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
