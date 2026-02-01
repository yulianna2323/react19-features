import React from 'react';
import { Review } from '../types';

export function ReviewsList({ reviews }: { reviews: Review[] }) {
    return (
        <div className="reviews-list">
            {reviews.map((review) => (
                <div key={review.id} className="review-card">
                    <div className="review-header">
                        <span className="author">{review.author}</span>
                        <span className="date">{review.date}</span>
                    </div>
                    <div className="rating">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="review-text">{review.text}</p>
                </div>
            ))}
        </div>
    );
}
