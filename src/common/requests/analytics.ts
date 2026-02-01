// --- Mock Analytics Service ---
export const analytics = {
    logEvent: (eventName: string, payload: any) => {
        console.log(`[Analytics] ${eventName}:`, payload);
    },
};
