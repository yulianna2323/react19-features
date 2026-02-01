import { useFormStatus } from 'react-dom';
import { citiesByCountry } from '../../common/constants';

export function CityField({
    country,
    city,
}: {
    country: string;
    city: string;
}) {
    const { pending } = useFormStatus();
    const cityList = country ? citiesByCountry[country] : [];
    const disabled = !country;
    return (
        <div>
            <label className={'label'}>City</label>
            <select
                name="city"
                className={'select'}
                defaultValue={city}
                disabled={disabled}
            >
                {!country && <option>Select a country first…</option>}
                {country && <option>Select a city</option>}
                {country &&
                    cityList.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
            </select>
            {pending && country && (
                <p className={'status'}>
                    Saving location for {country.toUpperCase()}…
                </p>
            )}
        </div>
    );
}
