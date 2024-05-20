import Freight from "../../../domain/entity/Freight";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

export default class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  execute(input: SimulateFreightInput): SimulateFreightOutput {
    const freight = new Freight();

    for (const orderItem of input.orderItems) {
      const item = this.itemRepository.getById(orderItem.idItem);
      if (!item) throw new Error("Item Not Found");

    }

    const total = freight.calculate(input.orderItems);

    const output = new SimulateFreightOutput(total);
    return output;
  }
}
