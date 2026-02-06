import { RegisterState } from '../types';

export async function registerAction(
    prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const email = formData.get('email') ?? '';
    const password = formData.get('password') ?? '';

    // FormData.get() returns: FormDataEntryValue | null
    // which is: string | File | null

    if (typeof email !== 'string' || !email.includes('@')) {
        return {
            ...prevState,
            errors: { email: 'Email is required' },
        };
    }

    if (typeof password !== 'string' || password.length < 8) {
        return {
            ...prevState,
            errors: { password: 'Password must be at least 8 characters' },
            values: { email },
        };
    }
    try {
        // simulate async
        //await new Promise((r, reject) => setTimeout(reject, 500));
        await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
        return {
            ...prevState,
            errors: { email: 'Something went wrong' },
        };
    }

    return {
        values: {
            email,
            password,
        },
        success: true,
        errors: {},
    };
}
