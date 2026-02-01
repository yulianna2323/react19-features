import React from 'react';

export function ActivitySkeleton() {
    return (
        <div className="activity-skeleton">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-row"></div>
            ))}
        </div>
    );
}
