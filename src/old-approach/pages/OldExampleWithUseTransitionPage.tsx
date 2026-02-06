import React from 'react';
import OldTabContainer from '../components/tabs/Tabs';
import Form from '../../common/components/Form';

const Old: React.FC = () => {
    return (
        <div>
            <h2>React 18</h2>
            <Form />
            <OldTabContainer />
        </div>
    );
};

export default Old;
