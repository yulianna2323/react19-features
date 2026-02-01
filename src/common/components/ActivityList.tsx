import React from 'react';
import { ActivityItem } from '../types';

export function ActivityList({ activities }: { activities: ActivityItem[] }) {
    return (
        <ul className="activity-list">
            {activities.map((item) => (
                <li key={item.id} className="activity-item">
                    <span className="user">{item.user}</span>
                    <span className="action">{item.action}</span>
                    <span className="target">{item.target}</span>
                    <span className="time">{item.timestamp}</span>
                </li>
            ))}
        </ul>
    );
}
