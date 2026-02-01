import React, { useState, useEffect, useRef } from 'react';
import { TrackerCartItem } from '../../common/types';
import { analytics } from '../../common/requests/analytics';
import { TrackerControls } from '../../common/components/TrackerControls';
import { TrackerCartList } from '../../common/components/TrackerCartList';

export default function ShoppingCartTracker() {
    const [cart, setCart] = useState<TrackerCartItem[]>([]);
    const [currentUser, setCurrentUser] = useState('guest_user');
    const [theme, setTheme] = useState('light');

    // ----------------------------------------------------------------
    // Old Approach: The "Ref Pattern"
    // To access the latest state inside useEffect without adding it to dependencies,
    // we have to manually sync it to a ref.
    // ----------------------------------------------------------------

    const latestStateRef = useRef({ currentUser, theme });

    // Keep the ref updated on every render
    useEffect(() => {
        latestStateRef.current = { currentUser, theme };
    });

    useEffect(() => {
        // Now we can read from the ref inside the effect.
        // This effect ONLY runs when `cart` changes, but has access to fresh state.
        const { currentUser: user, theme: appTheme } = latestStateRef.current;

        analytics.logEvent('cart_updated', {
            itemsCount: cart.length,
            totalValue: cart.reduce((sum, item) => sum + item.price, 0),
            user,
            appTheme,
        });
    }, [cart]); // 👈 Only `cart` is a dependency!

    // --- UI Helpers ---
    const addItem = () => {
        const newItem = {
            id: Date.now().toString(),
            name: `Product ${cart.length + 1}`,
            price: Math.floor(Math.random() * 50) + 10,
        };
        setCart([...cart, newItem]);
    };

    return (
        <div className="tracker-container">
            <h3>Shopping Cart Tracker</h3>

            <TrackerControls
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                theme={theme}
                setTheme={setTheme}
            />

            <TrackerCartList cart={cart} addItem={addItem} />

            <div
                className="info-box"
                style={{
                    background: '#f0f9ff',
                    borderColor: '#bae6fd',
                    color: '#0369a1',
                }}
            >
                <p>
                    <strong>Old Approach (Ref Pattern):</strong>
                </p>
                <p>
                    We use a <code>useRef</code> to manually track the latest{' '}
                    <em>User</em> and <em>Theme</em>.
                    <br />
                    This allows the <code>useEffect</code> to read fresh values
                    without re-running when they change.
                    <br />
                    It works, but it requires extra boilerplate code (the ref
                    and the syncing effect).
                </p>
            </div>
        </div>
    );
}
