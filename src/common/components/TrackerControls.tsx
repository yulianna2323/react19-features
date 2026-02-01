import React from 'react';

interface Props {
    currentUser: string;
    setCurrentUser: (user: string) => void;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export function TrackerControls({
    currentUser,
    setCurrentUser,
    theme,
    setTheme,
}: Props) {
    return (
        <div className="controls">
            <div className="control-group">
                <label>Current User:</label>
                <select
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                >
                    <option value="guest_user">Guest</option>
                    <option value="alice_123">Alice</option>
                    <option value="bob_456">Bob</option>
                </select>
            </div>

            <div className="control-group">
                <label>Theme (Unrelated):</label>
                <button
                    onClick={() =>
                        setTheme((t) => (t === 'light' ? 'dark' : 'light'))
                    }
                >
                    Toggle Theme ({theme})
                </button>
            </div>
        </div>
    );
}
