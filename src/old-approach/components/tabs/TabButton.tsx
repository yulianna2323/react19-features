// import { useTransition } from 'react';

interface Props {
    action: () => void;
    children: React.ReactNode;
    isActive: boolean;
}
export default function TabButton({ action, children, isActive }: Props) {
    // const [isPending, startTransition] = useTransition();
    if (isActive) {
        return <b>{children}</b>;
    }
    // if (isPending) {
    //     return <b className="pending">{children}</b>;
    // }
    return (
        <button
            onClick={() => {
                action();
            }}
        >
            {children}
        </button>
    );
}
