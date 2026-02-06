import { SubmitButton } from '../components/SubmitButton';
import { CityField } from '../components/CityField';
import { saveLocation } from '../../common/actions/saveLocation';
import React, { startTransition, useActionState } from 'react';

const initialState = {
    country: '',
    city: '',
    error: '',
    success: '',
};

export default function LocationForm() {
    const [state, formAction] = useActionState(saveLocation, initialState);
    function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const formData = new FormData();
        formData.append('country', e.target.value);
        formData.append('city', '');
        startTransition(async () => {
            await formAction(formData);
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
    }
    return (
        <div>
            <h2>React 19</h2>
            <form onSubmit={handleSubmit} className={'formContainer'}>
                <h1>Location Settings</h1>
                <div className={'label'}>
                    <label className="block text-gray-700 font-medium">
                        Country
                    </label>

                    <select
                        defaultValue={state.country}
                        name="country"
                        className={'select'}
                        onChange={handleCountryChange}
                    >
                        <option value="">Select a country…</option>
                        <option value="usa">USA</option>
                        <option value="germany">Germany</option>
                        <option value="japan">Japan</option>
                    </select>
                </div>

                <CityField country={state.country} city={state.city} />

                <SubmitButton />
            </form>
        </div>
    );
}
