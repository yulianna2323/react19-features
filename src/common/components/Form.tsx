import { useState, useTransition } from 'react';
import { signUp } from '../../server/requests-mock';

export default function Form() {
    const [didSubmit, setDidSubmit] = useState(false);
    const [isPending, startTransition] = useTransition();

    return (
        <div className="form-wrapper">
            {!didSubmit ? (
                <>
                    <p>Sign up for my newsletter:</p>

                    <form
                        action={(formData) => {
                            startTransition(async () => {
                                setDidSubmit(true);
                                await signUp(formData);
                            });
                        }}
                    >
                        <fieldset
                            disabled={isPending}
                            className="form-fieldset"
                        >
                            <input
                                className="input"
                                type="text"
                                placeholder="Email"
                                name="email"
                            />
                            <button className="button" type="submit">
                                {isPending ? 'Signing up...' : 'Sign up'}
                            </button>
                        </fieldset>
                    </form>
                </>
            ) : (
                <p>Thanks for signing up!</p>
            )}
        </div>
    );
}
