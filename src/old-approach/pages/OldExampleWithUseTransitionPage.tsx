import React from 'react';
import OldTabContainer from '../components/tabs/Tabs';
import Form from '../../common/components/Form';

const Old: React.FC = () => {
    return (
        <div>
            {/*<nav>*/}
            {/*    <Link to="/old">Old</Link> | <Link to="/new">New</Link>*/}
            {/*</nav>*/}
            <h2>React 18</h2>
            <Form />
            <OldTabContainer />
        </div>
    );
};

export default Old;
