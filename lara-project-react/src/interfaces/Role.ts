export interface Role{
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const defaultRole: Role = {
    id: 0,
    name: '',   
    createdAt: new Date(),
    updatedAt: new Date(),
}