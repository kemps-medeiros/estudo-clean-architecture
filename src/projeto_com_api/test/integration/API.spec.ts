import axios from "axios";
import PlaceOrder from "../../application/usecase/place-order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import MemoryRepositoryFactory from "../../infra/factory/MemoryRepositoryFactory";
import ExpressHttp from "../../infra/http/ExpressHttp";
import Router from "../../infra/http/Router";
import Http from "../../infra/http/Http";
import OrderRepository from "../../domain/repository/OrderRepository";
jest.mock('axios');

describe("API test", () => {

    let repositoryFactory: RepositoryFactory;
    let http: Http;
    let router: Router;
    let orderRepository: OrderRepository;
    let placeOrder: PlaceOrder;
    
    beforeEach(async function () {
        repositoryFactory = new MemoryRepositoryFactory();
        orderRepository = repositoryFactory.createOrderRepository();
        await orderRepository.clean();
        placeOrder = new PlaceOrder(repositoryFactory);
        http = new ExpressHttp();
        router = new Router(http, repositoryFactory);
        router.init();
        http.listen(3002);
    });
    
    it("Deve testar a API", async function () {
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
        await placeOrder.execute(input);
        await placeOrder.execute(input);

        (axios.get as jest.Mock).mockResolvedValue({
            data: [
                { id: 1, cpf: "935.411.347-80", total: 1000 },
                { id: 2, cpf: "935.411.347-80", total: 1000 },
                { id: 3, cpf: "935.411.347-80", total: 1000 }
            ]
        });

        const response = await axios.get(
            "http://localhost:3002/orders"
        );
        const orders = response.data;
        expect(orders).toHaveLength(3);
    });
    
    afterEach(async function () {
        await http.close();
    });
});