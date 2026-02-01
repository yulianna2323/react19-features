import React from 'react';
import ProductReviews from '../components/ProductReviews';

const New: React.FC = () => {
    return (
        <div>
            <h2>React 18</h2>
            <ProductReviews productId={'123'} />
        </div>
    );
};

export default New;
