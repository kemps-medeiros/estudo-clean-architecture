import CouponRepositoryInMemory from "../../infra/repository/CouponRepositoryInMemory";
import ItemRepositoryInMemory from "../../infra/repository/ItemRepositoryInMemory";
import OrderRepositoryInMemory from "../../infra/repository/OrderRepositoryInMemory";
import PlaceOrder from "../../application/usecase/place-order/PlaceOrder"
import MemoryRepositoryFactory from "../../infra/factory/MemoryRepositoryFactory";

describe("PlaceOrder", () => {
    it('Should create an order', async () => {

        const repositoryFactory = new MemoryRepositoryFactory();

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

        const repositoryFactory = new MemoryRepositoryFactory();

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
});