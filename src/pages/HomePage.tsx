import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Latest React Features</h1>
            <nav className="nav-grid">
                <Link to="/use-transition-example" className="nav-card">
                    useTransition
                </Link>
                <Link to="/use-action-state-example" className="nav-card">
                    useActionState
                </Link>
                <Link to="/use-optimistic-example" className="nav-card">
                    useOptimistic
                </Link>
                <Link to="/use-form-status-example" className="nav-card">
                    useFormStatus
                </Link>
                <Link to="/use-example" className="nav-card">
                    use
                </Link>
                <Link to="/activity-example" className="nav-card">
                    Activity
                </Link>
                <Link to="/use-effect-event-example" className="nav-card">
                    useEffectEvent
                </Link>
            </nav>
        </div>
    );
};

export default Home;
