export interface Product{
    id?                 : number;
    name                : string;
    short_description   : string;
    category_id         : number;
    category?           : string;
    brand_id            : number;
    brand?              : string;
    price               : number;
    quantity            : number;
    point_of_restock    : number;
    active              : boolean;
    image?              : File | null;

}
export const defaultProduct: Product = {
    name                : "",
    short_description   : "",
    category_id         : 0,
    brand_id            : 0,
    price               : 0,
    quantity            : 0,
    point_of_restock    : 0,
    active              : true

}