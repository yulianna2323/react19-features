export function debounce<T extends (...args: any[]) => Promise<void> | void>(
    func: T,
    wait: number,
): (...args: Parameters<T>) => Promise<void> {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let resolvePromise: (() => void) | null = null;

    return (...args: Parameters<T>) => {
        return new Promise<void>((resolve) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            // If there was a previous promise waiting, resolve it now so it doesn't hang forever
            // (or you could reject it, depending on desired behavior)
            if (resolvePromise) {
                resolvePromise();
            }

            resolvePromise = resolve;

            timeout = setTimeout(async () => {
                await func(...args);
                if (resolvePromise) {
                    resolvePromise();
                    resolvePromise = null;
                }
            }, wait);
        });
    };
}
