export interface User{
    id: number;
    name: string;
    role_id?: number | any;
    role?: number | any;
    email: string;
    password?: string;
    password_confirmation?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const defaultUser: User = {
    id: 0,
    name: '',
    role_id: 0,
    role: 0,
    email: '',
    password: '',
    password_confirmation: '',
    createdAt: new Date(),
    updatedAt: new Date(),
} 

export const errorUser: User = {
    id: 0,
    name: '',
    email: '',
    role_id: '',
    role: '',
    password: '',
    password_confirmation: '',
    createdAt: new Date(),
    updatedAt: new Date(),
}
