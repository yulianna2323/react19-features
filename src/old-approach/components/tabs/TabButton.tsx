// import { useTransition } from 'react';

interface Props {
    action: () => void;
    children: React.ReactNode;
    isActive: boolean;
}
export default function TabButton({ action, children, isActive }: Props) {
    if (isActive) {
        return <b className="tab-active">{children}</b>;
    }
    return (
        <button
            className="tab-button"
            onClick={() => {
                action();
            }}
        >
            {children}
        </button>
    );
}
