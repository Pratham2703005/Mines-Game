import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Guide = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Initial Balance",
      content: "Your starting balance is $1000. This is the amount you can use to place bets in the game.",
      image: "./GuideImage/Balance.png"
    },
    {
      title: "Setting Betting Amount",
      content: "Select your betting amount, starting at $10. Ensure it's within your available balance.",
      image: "./GuideImage/SetAmount.png"
    },
    {
      title: "Selecting Number of Mines",
      content: "Choose the number of mines (bombs) between 1 and 24. The more mines you set, the higher the risk and the greater the reward.",
      image: "./GuideImage/SetMines.png"
    },
    {
      title: "Placing the Bet",
      content: "After selecting your bet amount and the number of mines, click the 'Bet' button to place your bet. Once placed, it will turn red and say 'Cashout'.",
      image: "./GuideImage/BetButton.png"
    },
    {
      title: "Playing the Game",
      content: "In front of you are 25 cards. Some hide bombs, while others hide diamonds. Keep selecting cards to find diamonds, but hitting a bomb ends the game.",
      image: "./GuideImage/CardsLayout.png"
    },
    {
      title: "Cashing Out",
      content: "Click 'Cashout' anytime to secure your winnings, based on the diamonds found and your bet amount.",
      image: "./GuideImage/CashOut.png"
    },
    {
      title: "Game Results",
      content: "After cashing out or hitting a bomb, a popup shows your winnings or losses. Your balance is updated accordingly.",
      image: "./GuideImage/popups.png"
    },
    {
      title: "Refill Balance",
      content: "If your balance drops to zero, don't worry! You can refill your balance back to $1000 by clicking the 'Refill Balance' button below. Keep playing and good luck!",
      image: "./GuideImage/Refill.png"
    }
  ];

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card sx={{ 
      maxWidth: '40rem', 
      margin: 'auto', 
      backgroundColor: '#111827', 
      color: 'white', 
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      maxHeight: '80vh', // Add a max-height to ensure it doesn't overflow
      overflow: 'hidden' // Prevents the card from scrolling
    }}>
      <CardContent sx={{ padding: '1.5rem 1rem', overflowY: 'auto' }}>
        <Typography variant="h2" component="h1" sx={{ 
          fontSize: { xs: '1.75rem', md: '2.25rem' }, 
          fontWeight: 800, 
          textAlign: 'center', 
          marginBottom: '1.5rem', 
          color: '#fbbf24'
        }}>
          Mines Guide
        </Typography>
    
        <div style={{ marginBottom: '1.5rem' }}>
          <img 
            src={pages[currentPage].image} 
            alt={pages[currentPage].title} 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '12rem', // Ensures the image doesn't exceed 12rem in height
              objectFit: 'contain',
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              marginBottom: '1rem'
            }}
          />
          <Typography variant="h4" component="h2" sx={{ 
            fontSize: '1.25rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem', 
            color: '#60a5fa'
          }}>
            {pages[currentPage].title}
          </Typography>
          <Typography variant="body1" sx={{ 
            fontSize: '1rem', 
            lineHeight: 1.5
          }}>
            {pages[currentPage].content}
          </Typography>
        </div>
    
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="outlined"
            startIcon={<ChevronLeft />}
            sx={{
              color: 'white',
              borderColor: '#4B5563',
              '&:hover': {
                backgroundColor: '#374151',
                borderColor: '#4B5563'
              }
            }}
          >
            Prev
          </Button>
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            {currentPage + 1}/{pages.length}
          </Typography>
          <Button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            variant="outlined"
            endIcon={<ChevronRight />}
            sx={{
              color: 'white',
              borderColor: '#4B5563',
              '&:hover': {
                backgroundColor: '#374151',
                borderColor: '#4B5563'
              }
            }}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
    
  );
};

export default Guide;