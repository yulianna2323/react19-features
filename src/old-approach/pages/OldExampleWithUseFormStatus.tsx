import React, { useState } from 'react';
import { citiesByCountry } from '../../common/constants';
import { saveLocation } from '../../common/actions/saveLocation';

// In React 18, we don't have useFormStatus or useActionState.
// We have to manually manage:
// 1. Form state (country, city)
// 2. Loading state (isPending)
// 3. Error/Success state
// 4. Prop drilling of 'isPending' to the submit button and fields

export default function OldExampleWithUseFormStatus() {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Derived state for city list
    const cityList = country ? citiesByCountry[country] || [] : [];

    async function handleCountryChange(
        e: React.ChangeEvent<HTMLSelectElement>,
    ) {
        const newCountry = e.target.value;
        setCountry(newCountry);
        setCity(''); // Reset city when country changes

        // Simulate the "auto-save" or action behavior on change if desired,
        // but typically in React 18 controlled forms, we just update state.
        // If we want to mimic the "action" behavior of the new example which submits on change:

        const formData = new FormData();
        formData.append('country', newCountry);
        formData.append('city', '');

        setIsPending(true);
        try {
            // We have to manually call the action and handle the result
            const result = await saveLocation(
                { country: newCountry, city: '' },
                formData,
            );
            if (result.error) {
                setError(result.error);
                setSuccess('');
            } else {
                setSuccess(result.success);
                setError('');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setIsPending(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('country', country);
        formData.append('city', city);

        try {
            const result = await saveLocation({ country, city }, formData);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
                // In React 18, we might manually reset or keep state depending on requirements.
                // The new example keeps the state.
            }
        } catch (err) {
            setError('Failed to save');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div>
            <h2>React 18</h2>

            <form onSubmit={handleSubmit} className={'formContainer'}>
                <h1>Location Settings</h1>

                <div className={'label'}>
                    <label className="block text-gray-700 font-medium">
                        Country
                    </label>

                    <select
                        name="country"
                        className={'select'}
                        value={country}
                        onChange={handleCountryChange}
                        disabled={isPending}
                    >
                        <option value="">Select a country…</option>
                        <option value="usa">USA</option>
                        <option value="germany">Germany</option>
                        <option value="japan">Japan</option>
                    </select>
                </div>

                {/*
               In React 18, we can't use useFormStatus in a child component to detect parent loading.
               We MUST pass 'isPending' and data down as props.
            */}
                <div>
                    <label className={'label'}>City</label>
                    <select
                        name="city"
                        className={'select'}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!country || isPending}
                    >
                        {!country && <option>Select a country first…</option>}
                        {country && <option value="">Select a city</option>}
                        {country &&
                            cityList.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                    </select>
                    {isPending && country && (
                        <p className={'status'}>
                            Saving location for {country.toUpperCase()}…
                        </p>
                    )}
                </div>

                <button type="submit" disabled={isPending} className={'button'}>
                    {isPending ? 'Saving…' : 'Save'}
                </button>

                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
                )}
                {success && (
                    <p style={{ color: 'green', marginTop: '10px' }}>
                        {success}
                    </p>
                )}
            </form>
        </div>
    );
}
