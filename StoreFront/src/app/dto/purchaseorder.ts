import { Customer } from './customer';
import { Address } from './address';
import { Order } from './order';
import { Orderitems } from './orderitems';

export class Purchaseorder {
  customerDto!: Customer;
  addressDto!: Address;
  orderDto!: Order;
  orderItemDtoList!: Orderitems[];
}
