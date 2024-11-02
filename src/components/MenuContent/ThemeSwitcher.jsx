import React, { useState, useEffect } from 'react';
import { Sun, Flame, Leaf, Droplet, Moon, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const THEME_STORAGE_KEY = 'user-theme-preference';

const themes = [
    {
        name: 'Default',
        icon: Sun,
        class: 'root',
        description: 'Clean blue professional theme',
        gradient: 'from-blue-400 to-blue-600',
        lightText: true
    },
    {
        name: 'Bloody Red',
        icon: Flame,
        class: 'red',
        description: 'Bold and energetic',
        gradient: 'from-red-500 to-red-700',
        lightText: true
    },
    {
        name: 'Forest',
        icon: Leaf,
        class: 'green',
        description: 'Natural and calming',
        gradient: 'from-green-500 to-green-700',
        lightText: true
    },
    {
        name: 'Sunset',
        icon: Droplet,
        class: 'orange',
        description: 'Warm and welcoming',
        gradient: 'from-orange-400 to-orange-600',
        lightText: true
    },
    {
        name: 'Midnight',
        icon: Moon,
        class: 'black',
        description: 'Dark and focused',
        gradient: 'from-gray-700 to-gray-900',
        lightText: true
    },
    {
        name: 'Cloudy',
        icon: Cloud,
        class: 'grey',
        description: 'Soft and neutral',
        gradient: 'from-gray-400 to-gray-600',
        lightText: true
    }
];

const ThemeSwitcher = () => {
    // Initialize state from localStorage or default to 'root'
    const [activeTheme, setActiveTheme] = useState(() => {
        return localStorage.getItem(THEME_STORAGE_KEY) || 'root';
    });

    const handleThemeChange = (themeClass) => {
        // Remove all existing theme classes
        document.documentElement.classList.remove('root', 'red', 'green', 'orange', 'black', 'grey');
        // Add the new theme class
        document.documentElement.classList.add(themeClass);
        // Update state
        setActiveTheme(themeClass);
        // Save to localStorage
        localStorage.setItem(THEME_STORAGE_KEY, themeClass);
    };

    // Apply the theme on initial render
    useEffect(() => {
        handleThemeChange(activeTheme);
    }, [activeTheme]); // Update the theme if activeTheme changes

    return (
        <motion.div 
            layout
            className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Theme Settings</h2>
                <p className="text-sm opacity-70">Select your preferred theme</p>
            </div>

            <motion.div 
                layout 
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
                {themes.map((theme) => (
                    <motion.button
                        key={theme.class}
                        onClick={() => handleThemeChange(theme.class)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-lg
                            bg-gradient-to-r ${theme.gradient}
                            transition-all duration-200
                            ${activeTheme === theme.class ? 'ring-2 ring-white ring-opacity-60 shadow-lg' : ''}`}
                    >
                        <div className={`flex flex-col items-center gap-2 text-white text-sm`}>
                            <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                                <theme.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{theme.name}</span>
                        </div>
                    </motion.button>
                ))}
            </motion.div>

            <div className="mt-6 text-sm opacity-70">
                <p>Current theme: {themes.find(t => t.class === activeTheme)?.name}</p>
            </div>
        </motion.div>
    );
};

export default ThemeSwitcher;
