import React from 'react';

export function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}) {
    return (
        <div className="error-container">
            <p className="error-message">⚠️ {error.message}</p>
            <button className="retry-button" onClick={resetErrorBoundary}>
                Try Again
            </button>
        </div>
    );
}
