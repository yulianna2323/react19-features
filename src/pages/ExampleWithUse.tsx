import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ExampleWithUsePage: React.FC = () => {
    return (
        <div className="example-page-container">
            <nav className="example-nav">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <span className="separator">|</span>
                <Link to="/use-example/old" className="nav-link">
                    Old
                </Link>
                <span className="separator">|</span>
                <Link to="/use-example/new" className="nav-link">
                    New
                </Link>
            </nav>
            <h1 className="example-title">use</h1>
            <Outlet />
        </div>
    );
};

export default ExampleWithUsePage;
