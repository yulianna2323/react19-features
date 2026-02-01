import React from 'react';
import { TrackerCartItem } from '../types';

interface Props {
    cart: TrackerCartItem[];
    addItem: () => void;
}

export function TrackerCartList({ cart, addItem }: Props) {
    return (
        <div className="cart-area">
            <p>
                Items in Cart: <strong>{cart.length}</strong>
            </p>
            <button onClick={addItem} className="add-btn">
                Add Random Product
            </button>

            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
