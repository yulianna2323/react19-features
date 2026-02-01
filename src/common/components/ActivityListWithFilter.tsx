import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { ActivityList } from './ActivityList';

export function ActivityListWithFilter({
    activities,
}: {
    activities: ActivityItem[];
}) {
    const [filter, setFilter] = useState('');

    const filtered = activities.filter(
        (a) =>
            a.user.toLowerCase().includes(filter.toLowerCase()) ||
            a.target.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <div className="activity-filter-container">
            <div className="filter-header">
                <input
                    type="text"
                    placeholder="Filter by user or target..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
            </div>
            {filtered.length === 0 ? (
                <p className="no-results">No matches found.</p>
            ) : (
                <ActivityList activities={filtered} />
            )}
        </div>
    );
}
