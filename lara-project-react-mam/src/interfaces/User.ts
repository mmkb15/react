export interface User {
    id: number;
    name: string;
    email: string;
    role_id?: number | any;
    role?: string;
    password?: string;
    password_confirmation?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const defaultUser: User = {
    id: 0,
    name: '',
    email: '',
    role_id: 0
}

export const errorUser: User = {
    id: 0,
    name: '',
    email: '',
    role_id: 0,
    password: '',
    password_confirmation: ''
}