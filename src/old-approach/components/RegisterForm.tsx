import { useState } from 'react';

type Errors = {
    email?: string;
    password?: string;
};

export default function RegisterForm() {
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // e.target is the form
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // extract values
        const email = formData.get('email'); // string | File | null
        const password = formData.get('password'); // string | File | null

        console.log('Email:', email);
        console.log('Password:', password);
        setErrors({});
        setSuccess(false);

        const newErrors: Errors = {};

        // client-side validation
        if (typeof email !== 'string' || !email?.includes('@')) {
            newErrors.email = 'Invalid email address';
        }

        if (typeof password !== 'string' || password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            await new Promise((r) => setTimeout(r, 800));

            setSuccess(true);
        } catch {
            setErrors({ email: 'Something went wrong' });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create account</h2>

            <div className="form-field">
                <label>Email</label>
                <input name="email" defaultValue={''} />
                {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-field">
                <label>Password</label>
                <input type="password" name="password" defaultValue={''} />
                {errors.password && (
                    <p className="form-error">{errors.password}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {success && <div className="form-success">Account created ✅</div>}
        </form>
    );
}
