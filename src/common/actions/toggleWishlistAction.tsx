export async function toggleWishlistAction(isWishlisted: boolean) {
    console.log('jghjhgjhgjhg', isWishlisted);
    await new Promise((r) => setTimeout(r, 2000));
    return Promise.resolve('Success');
    // return Promise.reject('Error');
}
