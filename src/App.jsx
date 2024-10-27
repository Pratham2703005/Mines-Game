import React, { useEffect, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Card from './components/Card';
import Form from './components/Form';
import NavBar from './components/NavBar';
import { formatAmount } from './components/utility/FormatAmount';
import queueInstance from './components/utility/queue';

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
  const [maxBalance, setMaxBalance] = useState(1000); // Track max balance
  const [betCount, setBetCount] = useState(0);
  const [betWin, setBetWin] = useState(0);
  const [betZeroWin, setBetZeroWin] = useState(0);
  const [mineOpen, setMineOpen] = useState(0);
  const [maxMineOpen, setMaxMineOpen] = useState(0);
  const [currwinStreak, setCurrWinStreak] = useState(0);
  const [maxWinStreak, setMaxWinStreak] = useState(0);
  const [currLosStreak, setCurrLosStreak] = useState(0);
  const [maxLosStreak, setMaxLosStreak] = useState(0);
  const [bombHit, setBombHit] = useState(false);

  const [maxBetWin, setMaxBetWin] = useState(() => {
    const savedObject = localStorage.getItem('maxBetWin');
    return savedObject ? JSON.parse(savedObject) : { betVal: 0, mines: 0, minesOpen: 0, profit: 0 };
  });
  const [maxBetLoose, setMaxBetLoose] = useState(() => {
    const savedObject = localStorage.getItem('maxBetLoose');
    return savedObject ? JSON.parse(savedObject) : { betVal: 0, mines: 0, minesOpen: 0, lostAmount: 0 };
  })
  // useEffect(() => {      // Disabling Inspect 
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'F12') e.preventDefault();
  //     if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
  //     if (e.ctrlKey && e.shiftKey && e.key === 'C') e.preventDefault();
  //     if (e.ctrlKey && e.shiftKey && e.key === 'J') e.preventDefault();
  //     if (e.ctrlKey && e.key === 'U') e.preventDefault();
  //   };

  //   const disableRightClick = (e) => {
  //     e.preventDefault();
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', disableRightClick);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);

  useEffect(() => {       //Retrieval of data from localStorage
    const storedBalance = localStorage.getItem('balance');
    const storedMaxBalance = localStorage.getItem('maxBalance');
    const storedBetCount = localStorage.getItem('BetsMade');
    const storedBetWins = localStorage.getItem('Wins');
    const storedBetZeroWins = localStorage.getItem('WinNothing');
    const storedMineOpen = localStorage.getItem('MineOpen');
    const storedMAxMineOpen = localStorage.getItem('MaxMineOpen');
    const storedcurrWinStreak = localStorage.getItem('CurrWinStreak');
    const storedMaxWinStreak = localStorage.getItem('MaxWinStreak');
    const storedcurrLosStreak = localStorage.getItem('CurrLosStreak');
    const storedMaxLosStreak = localStorage.getItem('MaxLosStreak');

    if (storedcurrWinStreak) setCurrWinStreak(parseInt(storedcurrWinStreak));
    if (storedMaxWinStreak) setMaxWinStreak(parseInt(storedMaxWinStreak));
    if (storedcurrLosStreak) setCurrLosStreak(parseInt(storedcurrLosStreak));
    if (storedMaxLosStreak) setMaxLosStreak(parseInt(storedMaxLosStreak));
    if (storedMAxMineOpen) setMaxMineOpen(parseInt(storedMAxMineOpen));
    if (storedMineOpen) setMineOpen(parseInt(storedMineOpen));
    if (storedBetZeroWins) setBetZeroWin(parseInt(storedBetZeroWins));
    if (storedBetWins) setBetWin(parseInt(storedBetWins));
    if (storedBetCount) setBetCount(parseInt(storedBetCount));
    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedMaxBalance) setMaxBalance(parseFloat(storedMaxBalance));

    if (!storedBalance) localStorage.setItem('balance', 1000); // Set default balance to 1000 if not present
    if (!storedMaxBalance) localStorage.setItem('maxBalance', 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('maxBetWin', JSON.stringify(maxBetWin));
  }, [maxBetWin])

  useEffect(() => {
    localStorage.setItem('maxBetLoose', JSON.stringify(maxBetLoose));
  }, [maxBetLoose]);

  const shuffleCards = () => {   //function to shuffle cards
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
    setBombHit(false);
  };

  const handleChoice = (card) => {
    if (betPlaced && !bombHit) {
      setChosen(card);
    }
  };

  useEffect(() => {     // when we select a card
    if (chosen) {
      if (chosen.src === './assets/bomb.png') {
        setBombHit(true);
        const turned = cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
        let TP = turned * increment;
        TP *= parseInt(betval);
        let totalPrice = parseFloat(TP.toFixed(2))
        queueInstance.enqueue({betval, bombs, mineOpen, profit:totalPrice, win:'false' })
        if (totalPrice >= maxBetLoose.lostAmount || (betval > maxBetLoose.betVal && betval > maxBetLoose.lostAmount)) {
          setMaxBetLoose({
            betVal: betval,
            mines: bombs,
            minesOpen: mineOpen,
            lostAmount: totalPrice
          })
        }
        setCurrLosStreak((prev) => {
          setCurrWinStreak(0);
          localStorage.setItem('CurrWinStreak', 0);
          const streak = prev + 1;
          if (streak > maxLosStreak) {
            setMaxLosStreak(streak);
            localStorage.setItem('MaxLosStreak', streak);
          }
          localStorage.setItem('CurrLosStreak', streak);
          return streak;
        });
        totalPrice += parseInt(betval);

        notyf.error(`YOU LOST : $${formatAmount(totalPrice)}`);
        const sound = new Audio('./assets/bombs.mp3'); // Sound file path
        sound.play();


        setTimeout(() => {
          setChosen(null);
          setBetPlaced(false);
          shuffleCards();
          setMineOpen(() => {
            localStorage.setItem('MineOpen', 0);
            return 0;
          })
        }, 500);


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
        setMineOpen(prev => {
          const tmp = prev + 1;
          localStorage.setItem('MineOpen', tmp);
          return tmp;
        })
      }
    }
  }, [chosen]);

  useEffect(() => {  // after bet place randomize the cards
    shuffleCards();
  }, [betPlaced]);

  const handleSubmit = (e) => {     // Handle Betting Value and setting reward for right selection
    e.preventDefault();
    if (betval > balance) {
      setBetval(parseInt(balance));
    } else {
      setBetPlaced(true);
      const tmp = balance - betval;
      setBalance(parseFloat(tmp.toFixed(2)));
      localStorage.setItem('balance', parseFloat(tmp.toFixed(2))); // Save updated balance in localStorage
      setIncrement(parseFloat(bombs * 0.04));

      setBetCount(prevCount => {
        const newCount = prevCount + 1;
        localStorage.setItem('BetsMade', newCount); // Save updated bet count to localStorage
        return newCount;
      });
      setMineOpen(() => {
        localStorage.setItem('MineOpen', 0);
        return 0;
      })
    }
  };

  const handleCashOut = () => {     // Handle Reward Time and resetting the position
    const turned = cards.reduce((count, card) => (card.matched ? count + 1 : count), 0);
    let TP = turned * increment;
    TP *= parseInt(betval);
    let totalPrice = parseFloat(TP.toFixed(2))

    queueInstance.enqueue({betval, bombs, mineOpen, profit:totalPrice, win:'true' })

    if (totalPrice !== 0) {
      setBetWin(prev => {
        const newWindCnt = prev + 1;
        localStorage.setItem('Wins', newWindCnt);
        return newWindCnt;
      })
      setCurrWinStreak((prev) => {
        setCurrLosStreak(0);
        localStorage.setItem('CurrLosStreak', 0);
        const streak = prev + 1;
        if (streak > maxWinStreak) {
          setMaxWinStreak(streak);
          localStorage.setItem('MaxWinStreak', streak);
        }
        localStorage.setItem('CurrWinStreak', streak);
        return streak;
      });
    } else {
      setBetZeroWin(prevCount => {
        const newCount = prevCount + 1;
        localStorage.setItem('WinNothing', newCount); // Save updated bet count to localStorage
        return newCount;
      });
    }

    if (totalPrice >= betval * 2) {
      notyf.success(`JACKPOT : ${formatAmount(totalPrice)}`);
    } else if (totalPrice >= betval) {
      notyf.success(`EPIC WIN: ${formatAmount(totalPrice)}`);
    } else {
      notyf.success(`YOU GAIN : ${formatAmount(totalPrice)}`);
    }

    if (totalPrice >= maxBetWin.profit) {
      setMaxBetWin({
        betVal: betval,
        mines: bombs,
        minesOpen: mineOpen,
        profit: totalPrice,
      })
    }
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



    setTimeout(() => {
      setBetPlaced(false);

    }, 100)


    setMineOpen(() => {
      localStorage.setItem('MineOpen', 0);
      if (maxMineOpen < mineOpen) {
        setMaxMineOpen(mineOpen)
        localStorage.setItem('MaxMineOpen', mineOpen);
      }
      return 0;
    })


  };

  

  return (
    <div>
      <NavBar balance={balance}/>

      <section className='flex gap-0 xl:gap-5 flex-col-reverse xl:flex-row'>
        {/* FORM SECTION */}
        <div className='w-full h-[50vh] flex justify-center items-center xl:h-[88vh] xl:w-[30%]'>
          <Form
            setBetval={setBetval}
            setBombs={setBombs}
            handleCashOut={handleCashOut}
            balance={balance}
            betval={betval}
            bombs={bombs}
            betPlaced={betPlaced}
            handleSubmit={handleSubmit}
            setBalance={setBalance}
          />
        </div>

        {/* CARD SECTION */}
        <div className='max-w-[100vw] bg-[rgb(19,33,46)] xl:px-5 xl:py-5 xl:mt-[1.5rem] mx-auto xl:mr-[9rem] rounded-xl mt-5'>
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
