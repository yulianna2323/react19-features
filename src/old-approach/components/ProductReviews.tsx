import React, { useState, useEffect, useContext } from 'react';
import { Review } from '../../common/types';
import { fetchReviews } from '../../common/requests/reviews';
import { ReviewsSkeleton } from '../../common/components/ReviewsSkeleton';
import { ErrorFallback } from '../../common/components/ErrorFallback';
import { ReviewsList } from '../../common/components/ReviewsList';
import { ThemeContext, ThemeProvider } from '../../common/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

// Wrapper component to consume context
function ReviewsListWrapper({ reviews }: { reviews: Review[] }) {
    const context = useContext(ThemeContext);
    const isDark = context?.theme === 'dark';

    // Logic for special highlight color (mimicking the new approach logic)
    let specialHighlightColor = 'transparent';
    if (isDark) {
        if (reviews.length > 0) {
            specialHighlightColor = '#444';
        }
    }

    return (
        <div
            className={`reviews-wrapper ${isDark ? 'dark' : ''}`}
            style={{
                backgroundColor: isDark ? specialHighlightColor : 'transparent',
            }}
        >
            <ReviewsList reviews={reviews} />

            <div className="theme-debug-info">
                {['Theme Debug Info:'].map((label) => (
                    <div key={label}>
                        {label} Current theme is {context?.theme}
                    </div>
                ))}
            </div>
        </div>
    );
}

// 3. Main Container (Old Approach: useEffect + useState)
export default function ProductReviews({ productId }: { productId: string }) {
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadReviews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchReviews(productId);
            setReviews(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error('Unknown error occurred'),
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, [productId]);

    return (
        <ThemeProvider>
            <div className="product-reviews-container">
                <div className="reviews-header">
                    <h3>Customer Reviews</h3>
                    <ThemeToggle />
                </div>

                {isLoading && <ReviewsSkeleton />}

                {error && (
                    <ErrorFallback
                        error={error}
                        resetErrorBoundary={() => loadReviews()}
                    />
                )}

                {!isLoading && !error && reviews && (
                    <ReviewsListWrapper reviews={reviews} />
                )}
            </div>
        </ThemeProvider>
    );
}
