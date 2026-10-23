import { CartItem } from '../models/cart-items';

export class Orderitems {
  itemId?: number;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  productName: string;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productName = cartItem.name;
  }
}
