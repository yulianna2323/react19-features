export async function updateProductQuantityAction(quantity: number) {
    await new Promise((r) => setTimeout(r, 600));
    return Promise.reject('Error');
}
