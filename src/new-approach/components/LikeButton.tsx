import { useActionState } from 'react';
import { toggleLike } from '../../common/actions/likeAction';

const initialState = {
    liked: false,
    count: 42,
    error: null,
};

export default function LikeButton() {
    const [state, runAction, isPending] = useActionState(
        toggleLike,
        initialState,
    );

    return (
        <form style={{ fontFamily: 'sans-serif' }}>
            <button
                formAction={runAction}
                disabled={isPending}
                style={{
                    padding: '8px 14px',
                    fontSize: '16px',
                    cursor: isPending ? 'not-allowed' : 'pointer',
                }}
            >
                {state.liked ? '❤️ Liked' : '🤍 Like'}
            </button>

            <span style={{ marginLeft: 12 }}>{state.count} likes</span>

            {isPending && <p>Saving…</p>}
            {state.error && !isPending && (
                <p style={{ color: 'red' }}>{state.error}</p>
            )}
        </form>
    );
}
