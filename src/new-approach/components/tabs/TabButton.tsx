import { useTransition } from 'react';

interface Props {
    action: () => void;
    children: React.ReactNode;
    isActive: boolean;
}
export default function TabButton({ action, children, isActive }: Props) {
    const [isPending, startTransition] = useTransition();
    if (isActive) {
        return <b className="tab-active">{children}</b>;
    }
    if (isPending) {
        return <b className="tab-pending">{children}</b>;
    }
    return (
        <button
            className="tab-button"
            onClick={() => {
                startTransition(async () => {
                    await action();
                });
            }}
        >
            {children}
        </button>
    );
}
