import { getTotalPrice } from "./getTotalPrice";
import { CartSliceState } from "../redux/slices/cartSlice";

export const getCartItems = (): CartSliceState => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const total = getTotalPrice(items);

    return {
        total,
        items,
    }
}