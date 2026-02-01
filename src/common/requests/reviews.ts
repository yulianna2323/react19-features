import { Review } from '../types';

// --- Mock API ---
export const fetchReviews = async (productId: string): Promise<Review[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (productId === 'error') {
        throw new Error('Failed to load reviews. Please try again later.');
    }

    return [
        {
            id: '1',
            author: 'Alice',
            rating: 5,
            text: 'Absolutely love this product! High quality and fast shipping.',
            date: '2023-10-15',
        },
        {
            id: '2',
            author: 'Bob',
            rating: 4,
            text: 'Good value for money, but the color was slightly different than expected.',
            date: '2023-10-18',
        },
        {
            id: '3',
            author: 'Charlie',
            rating: 5,
            text: 'Exceeded my expectations. Will buy again!',
            date: '2023-10-20',
        },
    ];
};

// --- Cache / Promise Management ---
const reviewsCache = new Map<string, Promise<Review[]>>();

export function getReviewsPromise(productId: string): Promise<Review[]> {
    if (!reviewsCache.has(productId)) {
        reviewsCache.set(productId, fetchReviews(productId));
    }
    return reviewsCache.get(productId)!;
}

export function clearReviewsCache(productId: string) {
    reviewsCache.delete(productId);
}
