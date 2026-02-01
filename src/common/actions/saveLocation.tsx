import { citiesByCountry } from '../constants';

export async function saveLocation(prev: any, formData: FormData) {
    await new Promise((r) => setTimeout(r, 1000));

    const country = formData.get('country')?.toString() || '';
    const city = formData.get('city')?.toString() || '';

    if (!country) {
        return { ...prev, error: 'Country required' };
    }

    const validCities = citiesByCountry[country] ?? [];
    if (!validCities.includes(city)) {
        return { ...prev, country, error: 'Invalid city for selected country' };
    }

    return {
        country,
        city,
        error: '',
        success: 'Saved successfully!',
    };
}
