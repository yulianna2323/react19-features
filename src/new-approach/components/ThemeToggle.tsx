import React, { use } from 'react';
import { ThemeContext } from '../../common/context/ThemeContext';

export default function ThemeToggle() {
    // 🪄 The Magic: `use(Context)` works just like `useContext(Context)`
    // BUT it can be used conditionally (inside if/loops) if needed!
    const context = use(ThemeContext);

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
