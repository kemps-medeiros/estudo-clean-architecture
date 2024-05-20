import SimulateFreight from "../../application/usecase/simulate-freight/SimulateFreight";
import SimulateFreightInput from "../../application/usecase/simulate-freight/SimulateFreightInput";
import Item from "../../domain/entity/Item";
import OrderItem from "../../domain/entity/OrderItem";
import ItemRepositoryInMemory from "../../infra/repository/ItemRepositoryInMemory";

describe("SimulateFreight", () => {
  it("should simulate a freight of an order", () => {
    const itemRepository = new ItemRepositoryInMemory();

    const simulateFreight = new SimulateFreight(itemRepository);

    const input: OrderItem[] = [
      new OrderItem({ idItem: 1, quantity: 1, price: 1000, density: 333.34, volume: 0.003 }),
      new OrderItem({ idItem: 2, quantity: 1, price: 5000, density: 100, volume: 0.03 }),
      new OrderItem({ idItem: 3, quantity: 3, price: 30, density: 40, volume: 1 }),
    ];

    const output = simulateFreight.execute(new SimulateFreightInput(input));
    expect(output.total).toBe(440.0002);
  });
});
