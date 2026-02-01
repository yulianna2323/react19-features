import React, { Suspense, use, useState, Activity } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getActivityPromise } from '../../common/requests/activity';
import { ActivitySkeleton } from '../../common/components/ActivitySkeleton';
import { ActivityListWithFilter } from '../../common/components/ActivityListWithFilter';

function ActivityListWrapper() {
    // This will suspend!
    const activities = use(getActivityPromise());

    return <ActivityListWithFilter activities={activities} />;
}

export default function RecentActivityFeed() {
    const [isVisible, setIsVisible] = useState(true);

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
              <Activity> allows the component to remain "mounted" but hidden.
              It preserves state (like scroll position, input values, or loaded data)
              and prevents expensive re-fetching or re-rendering when toggled back.
              
              mode="hidden" is similar to `display: none` but tells React to 
              deprioritize updates for this subtree.
            */}
            <Activity mode={isVisible ? 'visible' : 'hidden'}>
                <div className="feed-content">
                    <ErrorBoundary
                        fallback={<div>Failed to load activity</div>}
                    >
                        <Suspense fallback={<ActivitySkeleton />}>
                            {/* We pass 'counter' as a prop. Even when hidden, 
                                React will update this prop in the background (at lower priority).
                                When you reveal it, the number will be current! */}
                            <ActivityListWrapper />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </Activity>

            {!isVisible && (
                <div className="hidden-placeholder">
                    Feed is hidden (but kept alive in background).
                    <br />
                    Try typing in the filter before hiding!
                </div>
            )}
        </div>
    );
}
