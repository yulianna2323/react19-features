export async function toggleLike(prevState: any) {
    const nextLiked = !prevState.liked;
    const nextCount = prevState.count + (nextLiked ? 1 : -1);

    // Simulate server delay
    await new Promise((res) => setTimeout(res, 3000));

    // Simulate random failure
    if (Math.random() < 0.3) {
        return {
            ...prevState,
            error: 'Server error. Try again.',
        };
    }

    return {
        liked: nextLiked,
        count: nextCount,
        error: null,
    };
}
