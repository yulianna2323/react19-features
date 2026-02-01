import React, { Suspense, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
    clearReviewsCache,
    getReviewsPromise,
} from '../../common/requests/reviews';
import { ReviewsSkeleton } from '../../common/components/ReviewsSkeleton';
import { ErrorFallback } from '../../common/components/ErrorFallback';
import { ReviewsList } from '../../common/components/ReviewsList';
import { Review } from '../../common/types';
import { ThemeContext, ThemeProvider } from '../../common/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

// 1. The Component that reads the Promise using `use()`
function ReviewsListWrapper({
    reviewsPromise,
}: {
    reviewsPromise: Promise<Review[]>;
}) {
    // 🪄 The Magic: `use` unwraps the promise.
    const reviews = use(reviewsPromise);

    // 🪄 The Magic Part 2: `use` unwraps the Context!
    const themeContext = use(ThemeContext);
    const isDark = themeContext?.theme === 'dark';

    // 🪄 The Magic Part 3: Conditional `use(Context)`
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

            {/* Example of using `use` inside a loop (rendering logic) */}
            <div className="theme-debug-info">
                {['Theme Debug Info:'].map((label) => {
                    // This is valid with `use`!
                    const ctx = use(ThemeContext);
                    return (
                        <div key={label}>
                            {label} Current theme is {ctx?.theme}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// 2. Main Container
export default function ProductReviews({ productId }: { productId: string }) {
    // We get the promise *outside* the Suspense boundary.
    const reviewsPromise = getReviewsPromise(productId);

    return (
        <ThemeProvider>
            <div className="product-reviews-container">
                <div className="reviews-header">
                    <h3>Customer Reviews</h3>
                    <ThemeToggle />
                </div>

                <ErrorBoundary
                    FallbackComponent={ErrorFallback as any}
                    onReset={() => {
                        // Reset the cache so we can try fetching again
                        clearReviewsCache(productId);
                    }}
                >
                    {/* Suspense catches the "suspension" triggered by `use(promise)` */}
                    <Suspense fallback={<ReviewsSkeleton />}>
                        <ReviewsListWrapper reviewsPromise={reviewsPromise} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </ThemeProvider>
    );
}
