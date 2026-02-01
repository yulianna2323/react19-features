import React, { useState, useMemo } from 'react';
import { ProductActions } from '../components/Product';
import { toggleWishlistAction } from '../../common/actions/toggleWishlistAction';
import { debounce } from '../../common/utils';
import { updateProductQuantityAction } from '../../common/actions/updateProductQuantityAction';

const initialState = {
    id: '123',
    name: 'Shoes',
    price: 165,
    isWishlisted: false,
    quantity: 1,
};

const New: React.FC = () => {
    const [product, setProduct] = useState(initialState);
    const [error, setError] = useState<null | string>(null);

    async function updateWishlisted(newValue: boolean) {
        try {
            setError(null);
            await toggleWishlistAction(newValue);
            setProduct((prev) => ({
                ...prev,
                isWishlisted: newValue,
            }));
        } catch (err) {
            setError('Failed to update wishlist');
        }
    }

    async function updateProductQuantity(newValue: number) {
        try {
            setError(null);
            await updateProductQuantityAction(newValue);
            setProduct((prev) => ({
                ...prev,
                quantity: newValue,
            }));
        } catch (err) {
            setError('Failed to update product quantity');
        }
    }

    const handleOnKeyDownWishlist = useMemo(
        () => debounce(updateWishlisted, 1000),
        [],
    );

    const handleOnUpdateProductQuantity = useMemo(
        () => debounce(updateProductQuantity, 1000),
        [],
    );

    return (
        <div>
            <h2>React 18</h2>
            <ProductActions
                error={error}
                product={product}
                updateWishlisted={handleOnKeyDownWishlist}
                updateQuantity={handleOnUpdateProductQuantity}
                max={100}
                min={1}
            />
        </div>
    );
};

export default New;
