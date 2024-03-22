export interface Product{
    id: number;
    variant_id: number;
    variant_name: string;
    category_id: number;
    category_name: string;
    product_initial: string;
    product_name: string;
    product_desc: string;
    product_price: number;
    product_stock: number;
    is_active: boolean;
    create_by: string;
    create_date: any;
    modify_by: string;
    modify_date: any;
}