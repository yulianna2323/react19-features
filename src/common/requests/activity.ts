import { ActivityItem } from '../types';

export const fetchActivities = async (): Promise<ActivityItem[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return [
        {
            id: '1',
            user: 'Alice',
            action: 'liked',
            target: 'Product A',
            timestamp: '2 mins ago',
        },
        {
            id: '2',
            user: 'Bob',
            action: 'commented on',
            target: 'Product B',
            timestamp: '5 mins ago',
        },
        {
            id: '3',
            user: 'Charlie',
            action: 'purchased',
            target: 'Product C',
            timestamp: '10 mins ago',
        },
        {
            id: '4',
            user: 'Dave',
            action: 'reviewed',
            target: 'Product A',
            timestamp: '15 mins ago',
        },
    ];
};

let activityPromise: Promise<ActivityItem[]> | null = null;

export function getActivityPromise() {
    if (!activityPromise) {
        activityPromise = fetchActivities();
    }
    return activityPromise;
}
