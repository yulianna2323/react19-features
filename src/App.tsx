import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import OldExampleWithUseTransitionPage from './old-approach/pages/OldExampleWithUseTransitionPage';
import NewExampleWithUseTransitionPage from './new-approach/pages/NewExampleWithUseTransitionPage';
import ExampleWithUseTransitionPage from './pages/ExampleWithUseTransitionPage';
import ExampleWithUseActionStatePage from './pages/ExampleWithUseActionState';
import NewExampleWithUseActionState from './new-approach/pages/NewExampleWithUseActionState';
import OldExampleWithUseActionState from './old-approach/pages/OldExampleWithUseActionState';
import ExampleWithUseOptimisticPage from './pages/ExampleWithUseOptimistic';
import NewExampleWithUseOptimistic from './new-approach/pages/NewExampleWithUseOptimistic';
import OldExampleWithUseOptimistic from './old-approach/pages/OldExampleWithUseOptimistic';
import ExampleWithUseFormStatusPage from './pages/ExampleWithUseFormStatus';
import ExampleWithUsePage from './pages/ExampleWithUse';
import ExampleWithActivityPage from './pages/ExampleWithActivity';
import NewExampleWithUse from './new-approach/pages/NewExampleWithUse';
import NewExampleWithUseFormStatus from './new-approach/pages/NewExampleWithUseFormStatus';
import OldExampleWithUse from './old-approach/pages/OldExampleWithUse';
import NewExampleWithActivity from './new-approach/pages/NewExampleWithActivity';
import OldExampleWithActivity from './old-approach/pages/OldExampleWithActivity';
import ExampleWithUseEffectEventPage from './pages/ExampleWithUseEffectEvent';
import NewExampleWithUseEffectEvent from './new-approach/pages/NewExampleWithUseEffectEvent';
import OldExampleWithUseEffectEvent from './old-approach/pages/OldExampleWithUseEffectEvent';
import OldExampleWithUseFormStatus from './old-approach/pages/OldExampleWithUseFormStatus';

const App: React.FC = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/use-transition-example"
                    element={<ExampleWithUseTransitionPage />}
                >
                    <Route
                        path="old"
                        element={<OldExampleWithUseTransitionPage />}
                    />
                    <Route
                        path="new"
                        element={<NewExampleWithUseTransitionPage />}
                    />
                </Route>
                <Route
                    path="/use-action-state-example"
                    element={<ExampleWithUseActionStatePage />}
                >
                    <Route
                        path="new"
                        element={<NewExampleWithUseActionState />}
                    />
                    <Route
                        path="old"
                        element={<OldExampleWithUseActionState />}
                    />
                </Route>
                <Route
                    path="/use-optimistic-example"
                    element={<ExampleWithUseOptimisticPage />}
                >
                    <Route
                        path="new"
                        element={<NewExampleWithUseOptimistic />}
                    />
                    <Route
                        path="old"
                        element={<OldExampleWithUseOptimistic />}
                    />
                </Route>
                <Route
                    path="/use-form-status-example"
                    element={<ExampleWithUseFormStatusPage />}
                >
                    <Route
                        path="new"
                        element={<NewExampleWithUseFormStatus />}
                    />
                    <Route
                        path="old"
                        element={<OldExampleWithUseFormStatus />}
                    />
                </Route>
                <Route path="/use-example" element={<ExampleWithUsePage />}>
                    <Route path="new" element={<NewExampleWithUse />} />
                    <Route path="old" element={<OldExampleWithUse />} />
                </Route>
                <Route
                    path="/activity-example"
                    element={<ExampleWithActivityPage />}
                >
                    <Route path="new" element={<NewExampleWithActivity />} />
                    <Route path="old" element={<OldExampleWithActivity />} />
                </Route>
                <Route
                    path="/use-effect-event-example"
                    element={<ExampleWithUseEffectEventPage />}
                >
                    <Route
                        path="new"
                        element={<NewExampleWithUseEffectEvent />}
                    />
                    <Route
                        path="old"
                        element={<OldExampleWithUseEffectEvent />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
