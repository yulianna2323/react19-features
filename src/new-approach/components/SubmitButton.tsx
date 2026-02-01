import { useFormStatus } from 'react-dom';

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className={'button'}>
            {pending ? 'Saving…' : 'Save'}
        </button>
    );
}
