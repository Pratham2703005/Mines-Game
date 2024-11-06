import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import queueInstance from '../utility/queue';

const Message = ({ data }) => {
  const isWin = data.win === 'true';
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
          borderColor: borderColor,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '8px',
          marginBottom: '8px',
        }}
      >
        <Typography fontWeight="bold">
          {isWin ? `Profit : $${parseFloat(data.profit).toFixed(2)}` : `Loss : $${parseFloat(data.profit).toFixed(2)}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '0 0 8px 8px', marginBottom: '8px' }}>
        <Box>
          <Typography><strong>Bet Value:</strong> ${data.betval.toFixed(2)}</Typography>
          <Typography><strong>Bombs:</strong> {data.bombs}</Typography>
          <Typography><strong>Mines Opened:</strong> {data.mineOpen}</Typography>
          <Typography><strong>Outcome:</strong> {isWin ? 'Win' : 'Loss'}</Typography>
          <Typography><strong>Increment:</strong> {data.increment}x</Typography>
          <Typography><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</Typography>
          <Typography><strong>Time:</strong> {new Date(data.timestamp).toLocaleTimeString()}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const NotificationMessages = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observer = useRef();
  const ITEMS_PER_PAGE = 10;

  const lastMessageElementRef = useCallback(
    (node) => {
      if (loading || error || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, error, hasMore]
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const allMessages = queueInstance.getQueue().reverse(); // Reverse queue initially
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const newMessages = allMessages.slice(start, end);

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setHasMore(end < allMessages.length);
      } catch (err) {
        setError('Error fetching messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [page]);

  return (
    <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '2px' }}>
      <Typography variant="h4" fontWeight="bold" marginBottom={2}>
        Recent Bets
      </Typography>

      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {messages.map((msg, index) => (
        <div key={index} ref={index === messages.length - 1 ? lastMessageElementRef : null}>
          <Message data={msg} />
        </div>
      ))}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && !hasMore && (
        <Typography variant="body1" align="center" color="text.secondary" mt={2}>
          No more messages to display.
        </Typography>
      )}
    </Box>
  );
};

const MyBets = () => {
  return <NotificationMessages />;
};

export default MyBets;