import { useState } from 'react';
import { toggleLike } from '../../common/actions/likeAction';

const initialState = {
    liked: false,
    count: 42,
    error: null,
};

export default function LikeButton() {
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState(initialState);
    async function toggleLikeHandler() {
        setIsPending(true);
        const state = await toggleLike(initialState);
        setState(state);
        setIsPending(false);
    }

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <button
                onClick={toggleLikeHandler}
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
        </div>
    );
}
