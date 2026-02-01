import { useFormStatus } from 'react-dom';

export function CurrentLocation() {
    const { data } = useFormStatus();
    const city = data?.get('city');
    const country = data?.get('country');

    return (
        <div>
            Your current location:{' '}
            {city && country
                ? `${city}, ${country}`
                : 'Please select a location'}
        </div>
    );
}
