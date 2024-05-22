import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class OrderRepositoryInMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    await this.orders.push(order);
  }

  async count(): Promise<number> {
    return await this.orders.length;
  }
}
