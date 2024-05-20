import OrderItem from "../../../domain/entity/OrderItem";

export default class SimulateFreightInput {
    constructor(readonly orderItems: OrderItem[]){}
}