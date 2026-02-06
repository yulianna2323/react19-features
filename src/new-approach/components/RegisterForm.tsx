'use client';
import { useActionState } from 'react';
import { registerAction } from '../../common/actions/registerAction';

const initialState = {
    errors: {},
    values: {},
    success: false,
};

export default function RegisterForm() {
    const [state, formAction, pending] = useActionState(
        registerAction,
        initialState,
    );

    return (
        <form
            autoComplete={'off'}
            className="register-form"
            action={formAction}
        >
            <div className="form-field">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={state?.values?.email ?? ''}
                    placeholder="Email"
                />
                {state.errors.email && (
                    <p className="form-error">{state.errors.email}</p>
                )}
            </div>
            <div className="form-field">
                <label>Password</label>
                <input
                    name="password"
                    defaultValue={state?.values?.password ?? ''}
                    type="password"
                    placeholder="Password"
                />
                {state.errors.password && (
                    <p className="form-error">{state.errors.password}</p>
                )}
            </div>

            <button disabled={pending}>
                {pending ? 'Registering...' : 'Register'}
            </button>

            {state.success && (
                <p className="form-success">Account created ✅</p>
            )}
        </form>
    );
}
