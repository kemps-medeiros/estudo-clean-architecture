import SimulateFreight from "../../application/usecase/simulate-freight/SimulateFreight";
import MemoryRepositoryFactory from "../../infra/factory/MemoryRepositoryFactory";

describe("SimulateFreight", () => {
  it("should simulate a freight of an order", async () => {
    const repositoryFactory = new MemoryRepositoryFactory();


    const simulateFreight = new SimulateFreight(repositoryFactory);
    const input = {
      orderItems: [
        { idItem: 1, quantity: 1},
        { idItem: 2, quantity: 1},
        { idItem: 3, quantity: 3}
      ]
    };
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(260);
  });
});
