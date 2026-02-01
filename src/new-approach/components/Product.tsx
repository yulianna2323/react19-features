import { useOptimistic, startTransition } from 'react';
import { Product } from '../../common/types';

interface Props {
    product: Product;
    updateWishlisted: (newValue: boolean) => Promise<void> | void;
    updateQuantity: (newValue: number) => Promise<void> | void;
    error: string | null;
    min: number;
    max: number;
}

export function ProductActions({
    product,
    updateWishlisted,
    updateQuantity,
    error,
    min,
    max,
}: Props) {
    const [isWishlisted, optimisticToggleWishlist] = useOptimistic(
        product.isWishlisted,
        (prev, newValue: boolean) => newValue,
    );

    const [qty, setOptimisticQty] = useOptimistic<number>(product.quantity);

    function handleWishlistToggle() {
        startTransition(async () => {
            optimisticToggleWishlist(!isWishlisted);
            await updateWishlisted(!isWishlisted);
        });
    }

    function updateQty(nextQty: number) {
        if (nextQty < min || nextQty > max) return;
        startTransition(async () => {
            setOptimisticQty(nextQty);
            await updateQuantity(nextQty);
        });
    }

    return (
        <div className="product-actions">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>

            <div className="buttons">
                <button
                    className={`wishlist ${isWishlisted ? 'active' : ''}`}
                    onClick={handleWishlistToggle}
                >
                    {isWishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
                </button>

                <div className="qty-control">
                    <button
                        className="btn"
                        onClick={() => updateQty(qty - 1)}
                        disabled={qty <= min}
                    >
                        −
                    </button>

                    <span className="qty">{qty}</span>

                    <button
                        className="btn"
                        onClick={() => updateQty(qty + 1)}
                        disabled={qty >= max}
                    >
                        +
                    </button>
                </div>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
