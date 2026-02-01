import React from 'react';

export function ReviewsSkeleton() {
    return (
        <div className="reviews-skeleton">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line long"></div>
                </div>
            ))}
        </div>
    );
}
