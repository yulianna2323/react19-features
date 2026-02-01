import React from 'react';
import LikeButton from '../components/LikeButton';
import RegisterForm from '../components/RegisterForm';

const New: React.FC = () => {
    return (
        <div>
            <h2>React 19</h2>
            <RegisterForm />
            <LikeButton />
        </div>
    );
};

export default New;
