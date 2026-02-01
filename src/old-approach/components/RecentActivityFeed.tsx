import React, { useState, useEffect } from 'react';
import { ActivityItem } from '../../common/types';
import { fetchActivities } from '../../common/requests/activity';
import { ActivitySkeleton } from '../../common/components/ActivitySkeleton';
import { ActivityListWithFilter } from '../../common/components/ActivityListWithFilter';

export default function RecentActivityFeed() {
    const [isVisible, setIsVisible] = useState(true);
    const [activities, setActivities] = useState<ActivityItem[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // In the old approach, we fetch data on mount.
    // If we unmount (hide) the component, this data is lost unless we lift state up.
    useEffect(() => {
        if (!isVisible) return; // Don't fetch if hidden (optional optimization)

        let isMounted = true;
        setIsLoading(true);

        fetchActivities()
            .then((data) => {
                if (isMounted) {
                    setActivities(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [isVisible]); // Re-fetch when visibility changes (simulating unmount/remount behavior)

    return (
        <div className="feed-container">
            <div className="feed-header">
                <h3>Recent Activity</h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                    }}
                >
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="toggle-btn"
                    >
                        {isVisible ? 'Hide Feed' : 'Show Feed'}
                    </button>
                </div>
            </div>

            {/* 
               Old Approach: Conditional Rendering.
               When !isVisible, the component unmounts.
               When it becomes visible again, it remounts and re-fetches data (because of useEffect).
               State is lost.
            */}
            {isVisible ? (
                <div className="feed-content">
                    {isLoading && <ActivitySkeleton />}
                    {error && <div>Failed to load activity</div>}
                    {!isLoading && !error && activities && (
                        <ActivityListWithFilter activities={activities} />
                    )}
                </div>
            ) : (
                <div className="hidden-placeholder">
                    Feed is unmounted (state lost)
                </div>
            )}
        </div>
    );
}
