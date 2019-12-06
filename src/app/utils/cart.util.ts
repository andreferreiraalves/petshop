import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';

export class CartUtil {

    public static get(): Cart {
        const data = localStorage.getItem('petshop.cart');

        if (!data)
            return new Cart();

        return JSON.parse(data);
    }

    public static add(id: string, product: string, quantity: number, price: number, image: string) {
        let cart = this.get();

        const item = new CartItem(id, product, quantity, price, image);

        cart.items.push(item);

        localStorage.setItem('petshop.cart', JSON.stringify(cart));
    }

    public static update(cart: Cart) {
        localStorage.setItem('petshop.cart', JSON.stringify(cart));
    }

    public static clear() {
        localStorage.removeItem('petshop.cart');
    }
}