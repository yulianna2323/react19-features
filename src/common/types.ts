export type Action<State> = (
    prevState: State,
    formData: FormData,
) => State | Promise<State>;

export type RegisterState = {
    success: boolean;
    errors: {
        email?: string;
        password?: string;
    };
    values?: {
        email?: string;
        password?: string;
    };
};

export interface FormStateI {
    data: {
        name: string;
        email: string;
    };
    errors: null | string;
}

export type Product = {
    id: string;
    name: string;
    price: number;
    isWishlisted: boolean;
    quantity: number;
};

export type CartItem = {
    id: string;
    name: string;
    qty: number;
};

export interface LocationSettingsState {
    city: string;
    country: string;
    error: string;
    success: string;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
}

export interface ActivityItem {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
}

export interface TrackerCartItem {
    id: string;
    name: string;
    price: number;
}
