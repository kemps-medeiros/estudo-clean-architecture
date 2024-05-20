import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem, { TOrderItemPayload } from "./OrderItem";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon?: Coupon;
  freight: Freight;
  code: OrderCode;

  constructor(cpf: string, readonly issueDate: Date = new Date(), readonly sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = new Freight();
    this.code = new OrderCode(issueDate, sequence);
  }

  addItem(item: Item, quantity: number) {
    const orderItemPayload: TOrderItemPayload = {
      idItem: item.idItem,
      price: item.price,
      quantity: quantity,
      volume: item.getVolume(),
      density: item.getDensity(),
    };

    this.orderItems.push(new OrderItem(orderItemPayload));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotalPrice() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotalPrice();
    }

    if (this.coupon?.isValid) {
      total = total * ((100 - this.coupon.discount) / 100);
    }

    total += this.getFreight();

    return total;
  }

  getFreight() {
    return this.freight.calculate(this.orderItems);
  }
}
