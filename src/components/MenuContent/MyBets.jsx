import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import queueInstance from '../utility/queue';

const messages = queueInstance.getQueue();
console.log(messages)
const Message = ({ data }) => {
  const isWin = data.win === 'true'; // Convert string 'true'/'false' to boolean
  const borderColor = isWin ? '#4caf50' : '#f44336';
  
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${data.betval}-${data.profit}-content`}
        id={`panel-${data.betval}-${data.profit}-header`}
        sx={{
          backgroundColor: 'white',
          borderColor: borderColor, // Apply borderColor directly
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '8px',
          marginBottom: '8px',
        }}
      >
        <Typography fontWeight="bold">
          {isWin ? `Profit : $${data.profit.toFixed(2)}` : `Loss : $${parseFloat(data.profit + data.betval).toFixed(2)}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '0 0 8px 8px',marginBottom:'8px' }}>
        <Box>
          <Typography><strong>Bet Value:</strong> ${data.betval.toFixed(2)}</Typography>
          <Typography><strong>Bombs:</strong> {data.bombs}</Typography>
          <Typography><strong>Mines Opened:</strong> {data.mineOpen}</Typography>
          <Typography><strong>Outcome:</strong> {isWin ? 'Win' : 'Loss'}</Typography>
          <Typography><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</Typography>
          <Typography><strong>Time:</strong> {new Date(data.timestamp).toLocaleTimeString()}</Typography>
        </Box>

      </AccordionDetails>
    </Accordion>
  );
};


const NotificationMessages = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '2px' }}>
      <Typography variant="h4" fontWeight="bold" marginBottom={2}>
        Recent Bets
      </Typography>

      {messages.slice().reverse().map((msg, index) => (
        <Message key={index} data={msg} />
      ))}

    </Box>
  );
};

const MyBets = () => {
  return (

    <NotificationMessages />

  );
};

export default MyBets;