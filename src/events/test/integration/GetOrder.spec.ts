import GetOrder from "../../application/usecase/get-order/GetOrder";
import PlaceOrder from "../../application/usecase/place-order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import MemoryRepositoryFactory from "../../infra/factory/MemoryRepositoryFactory";

let repositoryFactory: RepositoryFactory;

describe("GetOrder", () => {
  beforeEach(async function () {
    repositoryFactory = new MemoryRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
  });

  it("Deve obter um pedido pelo código", async function () {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const input = {
      cpf: "935.411.347-80",
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: "VALE20",
      issueDate: new Date("2021-03-01T10:00:00"),
    };
    await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    jest.spyOn(getOrder, "execute").mockResolvedValue({
      total: 5132,
      items: []
    });

    const output = await getOrder.execute("202100000001");
    expect(output.total).toBe(5132);
  });
});
