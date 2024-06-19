import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      "insert into ccca.order (code, cpf, issue_date, coupon, freight, sequence, total) values ($1, $2, $3, $4, $5, $6, $7) returning *",
      [
        order.code.value,
        order.cpf.getValue(),
        order.issueDate,
        order.coupon?.name,
        order.freight.calculate,
        order.sequence,
        order.getTotalPrice(),
      ]
    );
    for (const orderItem of order.orderItems) {
      await this.connection.query(
        "insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
        [orderData.id_order, orderItem.idItem, orderItem.price, orderItem.quantity]
      );
    }
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query("select count(*)::int as count from ccca.order", []);
    return row.count;
  }
}
