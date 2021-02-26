export interface Order {
    _id?: string;
    uid: string;
    quantity: number;
    priceEach: number;
    status: string;
}