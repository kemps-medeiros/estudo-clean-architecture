import CouponRepositoryInMemory from "../../infra/repository/CouponRepositoryInMemory";
import ItemRepositoryInMemory from "../../infra/repository/ItemRepositoryInMemory";
import OrderRepositoryInMemory from "../../infra/repository/OrderRepositoryInMemory";
import PlaceOrder from "../../application/usecase/place-order/PlaceOrder"
import MemoryRepositoryFactory from "../../infra/factory/MemoryRepositoryFactory";
import Mediator from "../../infra/mediator/Mediator";
import StockEntryHandler from "../../application/handler/StockEntryHandler";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import GetStock from "../../application/usecase/get-stock/GetStock";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";

describe("PlaceOrder", () => {
    let repositoryFactory: RepositoryFactory;

    beforeEach(async () => {
        repositoryFactory = new MemoryRepositoryFactory();
        const orderRepository = repositoryFactory.createOrderRepository();
        await orderRepository.clean();
    })

    it('Should create an order', async () => {
        const placeOrder = new PlaceOrder(repositoryFactory);

        const placeOrderInput = {
            cpf: "501.961.700-87",
            orderItems: [
                {idItem: 1, quantity: 1},
                {idItem: 2, quantity: 1},
                {idItem: 3, quantity: 3},
            ],
            coupon: "VALE20",
            issueDate: new Date("2021-05-05T10:00:00")
        }

        const output = await placeOrder.execute(placeOrderInput);

        expect(output.total).toBe(5132);
    });

    it('Should create an order and create an code', async () => {

        const placeOrder = new PlaceOrder(repositoryFactory);

        const placeOrderInput = {
            cpf: "501.961.700-87",
            orderItems: [
                {idItem: 1, quantity: 1},
                {idItem: 2, quantity: 1},
                {idItem: 3, quantity: 3},
            ],
            coupon: "VALE20",
            issueDate: new Date("2021-03-01T10:00:00")
        }

        const output = await placeOrder.execute(placeOrderInput);

        expect(output.code).toBe("202100000001");
    })

    it.skip('Should create an order and remove itens from stock', async () => {


        const mediator = new Mediator();
        mediator.register(new StockEntryHandler(repositoryFactory));
        const placeOrder = new PlaceOrder(repositoryFactory, mediator);
        const input = {
            cpf: "935.411.347-80",
            orderItems: [
                { idItem: 1, quantity: 1},
                { idItem: 2, quantity: 1},
                { idItem: 3, quantity: 3}
            ],
            coupon: "VALE20",
            issueDate: new Date("2021-03-01T10:00:00")
        };
        await placeOrder.execute(input);
        const getStock = new GetStock(repositoryFactory);
        const total1 = await getStock.execute(1);
        expect(total1).toBe(-1);
        const total2 = await getStock.execute(2);
        expect(total2).toBe(-1);
        const total3 = await getStock.execute(3);
        expect(total3).toBe(-3);
    })
});