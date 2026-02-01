import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ExampleWithUseOptimisticPage: React.FC = () => {
    return (
        <div className="example-page-container">
            <nav className="example-nav">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <span className="separator">|</span>
                <Link to="/use-optimistic-example/old" className="nav-link">
                    Old
                </Link>
                <span className="separator">|</span>
                <Link to="/use-optimistic-example/new" className="nav-link">
                    New
                </Link>
            </nav>
            <h1 className="example-title">useOptimistic</h1>
            <Outlet />
        </div>
    );
};

export default ExampleWithUseOptimisticPage;
