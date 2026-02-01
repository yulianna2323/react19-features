import React, { useState, useEffect, useEffectEvent } from 'react';
import { TrackerCartItem } from '../../common/types';
import { analytics } from '../../common/requests/analytics';
import { TrackerControls } from '../../common/components/TrackerControls';
import { TrackerCartList } from '../../common/components/TrackerCartList';
import { TrackerInfoBox } from '../../common/components/TrackerInfoBox';

export default function ShoppingCartTracker() {
    const [cart, setCart] = useState<TrackerCartItem[]>([]);
    const [currentUser, setCurrentUser] = useState('guest_user');
    const [theme, setTheme] = useState('light'); // Unrelated state

    // ✅ The Solution: useEffectEvent
    const onCartChanged = useEffectEvent((items: TrackerCartItem[]) => {
        analytics.logEvent('cart_updated', {
            itemsCount: items.length,
            totalValue: items.reduce((sum, item) => sum + item.price, 0),
            user: currentUser, // Read the latest state without triggering effect
            appTheme: theme, // Read the latest state without triggering effect
        });
    });

    useEffect(() => {
        // We only want this to run when `cart` changes.
        onCartChanged(cart);
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
            <h3>Shopping Cart Tracker (useEffectEvent)</h3>

            <TrackerControls
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                theme={theme}
                setTheme={setTheme}
            />

            <TrackerCartList cart={cart} addItem={addItem} />

            <TrackerInfoBox />
        </div>
    );
}
