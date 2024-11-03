import React, { useEffect, useRef } from "react";
import { Avatar, Card, CardContent, CardHeader, Typography, Chip, IconButton, Box } from "@mui/material";
import { GitHub as GithubIcon, LinkedIn as LinkedInIcon, Twitter, Instagram as InstagramIcon } from "@mui/icons-material";
import Typed from "typed.js";

const titles = [
  "Software Developer",
  "Problem Solver",
  "3D Graphics Enthusiast",
  "Full Stack Developer",
  "Tech Lover"
];

export default function About() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: titles,
      typeSpeed: 65,
      backSpeed: 65,
      loop: true,
    };

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        // padding: 2,
        maxWidth: 345,
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Card sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar alt="Your Name" src="/pk1-image.jpg" sx={{ width: 56, height: 56 }} />
          }
          title={<Typography variant="h5">Pratham Israni</Typography>}
          subheader={
            <span>
              <span ref={typedRef} style={{ fontWeight: "bold" }}></span>
            </span>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" className='text-justify'>
            Motivated software developer with a passion for bringing ideas to life through web development.
            Skilled in full-stack technologies and 3D graphics. Committed to daily DSA problem-solving for the past 8 months.
            Let's connect and create something amazing together!
          </Typography>
          <Box sx={{ margin: '10px 0', display: 'flex', flexWrap: 'wrap' }}>
            {["C", "C++", "HTML", "CSS", "JavaScript", "React.js","Tailwind" ,"Node.js", "Express", "MongoDB", "Three.js", "R3F"].map((skill) => (
              <Chip 
                key={skill} 
                label={skill} 
                variant="outlined" 
                sx={{ 
                  margin: '2px', 
                  backgroundColor: '#333', // Dark background color
                  color: '#fff', // Light text color
                  borderColor: '#444', // Optional: Change border color to match background
                  fontWeight:'500',
                  '&:hover': {
                    backgroundColor: '#999',
                    color : '#222',
                    // fontWeight: 'bold' // Optional: Darker background on hover
                  },
                }} 
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 ,justifyContent: 'space-between'}}>
            <IconButton href="https://github.com/Pratham2703005" target="_blank" aria-label="GitHub">
              <GithubIcon />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/pratham-israni-a6b672275/" target="_blank" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://x.com/Pratham85477378" target="_blank" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton href="https://www.instagram.com/pk2732004/" target="_blank" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://leetcode.com/u/Pratham012/" target="_blank" aria-label="LeetCode">
              <img 
                src="/about/leetcde.webp" 
                alt="LeetCode" 
                style={{ width: '21px', height: '21px', filter: 'invert(0.5)' }} // Change color
              />
            </IconButton>
            <IconButton href="https://www.geeksforgeeks.org/user/pk2732004/" target="_blank" aria-label="GeeksforGeeks">
              <img 
                src="/about/gfg.svg" 
                alt="GeeksforGeeks" 
                style={{ width: '28px', height: '28px', filter: 'invert(0.5)' }} // Change color
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
