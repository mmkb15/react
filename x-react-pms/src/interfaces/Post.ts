export interface Post {
    id?: number;
    userId: number;
    title: string;
    body: string;
}
export const defaultPost: Post = {
    userId: 1,
    title: "",
    body: "",
};