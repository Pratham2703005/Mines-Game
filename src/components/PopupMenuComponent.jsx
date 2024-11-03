import React, { useState, useEffect } from 'react';
import { BarChart, BookOpen, UserCircle, ReceiptText, MessageCircleQuestion, X, Menu, Sun } from 'lucide-react';
import StatsContent from './MenuContent/StatsContent';
import Guide from './MenuContent/Guide';
import MyBets from './MenuContent/MyBets';
import LargeWindow from './MenuContent/LargeWindow';
import HelpSection from './MenuContent/HelpSection';
import About from './MenuContent/About';
import ThemeSwitcher from './MenuContent/ThemeSwitcher';

const menuOptions = [
  { label: 'Guide', icon: BookOpen },
  { label: 'My Bets', icon: ReceiptText},
  { label: 'Statistics', icon: BarChart },
  { label: 'Theme', icon: Sun },
  { label: 'About me', icon: UserCircle },
  { label: 'Help', icon: MessageCircleQuestion },
];

const MenuButton = ({ onClick, isVisible }) => (
  <button 
    className={`p-2 bg-NavBar mt-2 border rounded-md text-foreground hover:bg-muted transition-colors text-white ${isVisible ? '' : 'hidden'}`}
    onClick={onClick}
  >
    <Menu className="h-4 w-4" />
  </button>
);

const PopupMenu = ({ show, setShow, title, options, onOptionClick }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShow(false)} />
      <div className="relative md:w-[30%] w-3/4 max-h-[40vh] bg-white rounded-md z-50 overflow-y-scroll border border-gray-200">
        <div className="flex justify-between items-center pt-3 pb-2 px-6 bg-gray-100">
          <small className="uppercase text-gray-600 font-light text-xs">{title}</small>
          <X className="w-4 h-4 cursor-pointer text-gray-600" onClick={() => setShow(false)} />
        </div>
        <div className="max-h-[60vh] overflow-y-auto bg-white">
          <div className="flex flex-col">
            {options.map((option, index) => (
              <button
                key={index}
                className="flex items-center gap-3 px-6 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => onOptionClick(option)}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PopupMenuComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLargeWindow, setShowLargeWindow] = useState(false);
  const [largeWindowContent, setLargeWindowContent] = useState(null);
  const [largeWindowTitle, setLargeWindowTitle] = useState('');

  useEffect(() => {
    if (showMenu || showLargeWindow) {
      // Body scroll disable
      document.body.style.overflow = 'hidden';
    } else {
      // Body scroll enable
      document.body.style.overflow = 'auto';
    }

    // Clean up when component unmounts or menu/large window closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMenu, showLargeWindow]);

  const handleOptionClick = (option) => {
    setShowMenu(false);
    setLargeWindowTitle(option.label);
    
    if (option.label === 'Theme') {
      setLargeWindowContent(<ThemeSwitcher />);
    } else if (option.label === 'Statistics') {
      setLargeWindowContent(<StatsContent />);
    } else if (option.label === 'Guide') {
      setLargeWindowContent(<Guide />);
    } else if (option.label === 'My Bets') {
      setLargeWindowContent(<MyBets />);
    } else if(option.label === 'Help'){
      setLargeWindowContent(<HelpSection />)
    }else if(option.label === 'About me'){
      setLargeWindowContent(<About/>)
    }
    else {
      setLargeWindowContent(
        <p className="text-gray-600">This is the {option.label} window. Content coming soon!</p>
      );
    }

    setShowLargeWindow(true);
  };
  

  const handleBack = () => {
    setShowLargeWindow(false);
    setShowMenu(true);
  };

  return (
    <div>
      <MenuButton
        onClick={() => {
          setShowMenu(true);
        }}
        isVisible={!showMenu && !showLargeWindow}
      />
      <PopupMenu 
        show={showMenu} 
        setShow={setShowMenu} 
        title="Menu" 
        options={menuOptions} 
        onOptionClick={handleOptionClick}
      />
      <LargeWindow 
        show={showLargeWindow} 
        setShow={setShowLargeWindow} 
        title={largeWindowTitle}
        onBack={handleBack}
      >
        {largeWindowContent}
      </LargeWindow>
    </div>
  );
};


export default PopupMenuComponent;