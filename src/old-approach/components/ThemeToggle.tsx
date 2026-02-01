import React, { useContext } from 'react';
import { ThemeContext } from '../../common/context/ThemeContext';

export default function ThemeToggle() {
    // Old approach: useContext hook
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('ThemeToggle must be used within a ThemeProvider');
    }

    const { theme, toggleTheme } = context;

    return (
        <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
            Current Theme: <strong>{theme.toUpperCase()}</strong> (Click to
            Toggle)
        </button>
    );
}
