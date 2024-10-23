import React, { useState ,useEffect} from 'react';
import { BarChart, User, HelpCircle, UserCircle, Settings, Bell, Lock, LogOut, X, Menu, Sun, Moon, ArrowLeft } from 'lucide-react';

const menuOptions = [
  { label: 'Statistics', icon: BarChart },
  { label: 'Profile', icon: User },
  { label: 'Help', icon: HelpCircle },
  { label: 'Account', icon: UserCircle },
  { label: 'Settings', icon: Settings },
  { label: 'Notifications', icon: Bell },
  { label: 'Privacy', icon: Lock },
  { label: 'Logout', icon: LogOut },
];

const MenuButton = ({ onClick, isVisible }) => (
  <button 
    className={`p-2 bg-[rgb(19,33,51)] mt-2 border rounded-md text-foreground hover:bg-muted transition-colors text-white ${isVisible ? '' : 'hidden'}`}
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
      <div className="relative w-3/4 md:w-2/5 max-h-[40vh] bg-white rounded-md z-50 overflow-y-scroll border border-gray-200">
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

const LargeWindow = ({ show, setShow, title, children, onBack }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShow(false)} />
      <div className="relative w-11/12 md:w-3/4 min-h-[80vh] bg-white rounded-md z-50 overflow-hidden border border-gray-200">
        <div className="flex justify-between items-center pt-3 pb-2 px-6 border-b border-gray-200 bg-gray-100">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <X className="w-5 h-5 cursor-pointer text-gray-600" onClick={() => setShow(false)} />
        </div>
        <div className="h-full max-h-[70vh] overflow-y-auto p-6 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // Simulating theme state

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md ${theme === 'light' ? 'bg-gray-200' : 'bg-white'}`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-gray-600" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-200' : 'bg-white'}`}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] text-gray-600" />
      </button>
    </div>
  );
};

const SettingsContent = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-800">Theme Settings</h3>
    <p className="text-gray-600">Choose between light and dark mode:</p>
    <ThemeSwitcher />
  </div>
);

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
    if (option.label === 'Settings') {
      setLargeWindowContent(<SettingsContent />);
    } else {
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