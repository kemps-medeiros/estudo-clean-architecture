import Order from "../../../domain/entity/Order";
import OrderPlaced from "../../../domain/event/OrderPlaced";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import Mediator from "../../../infra/mediator/Mediator";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
	itemRepository: ItemRepository;
	couponRepository: CouponRepository;
	orderRepository: OrderRepository;
	stockEntryRepository: StockEntryRepository;

	constructor (readonly repositoryFactory: RepositoryFactory, readonly mediator: Mediator = new Mediator()) {
		this.itemRepository = repositoryFactory.createItemRepository();
		this.couponRepository = repositoryFactory.createCouponRepository();
		this.orderRepository = repositoryFactory.createOrderRepository();
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
		const sequence = await this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.issueDate, sequence);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getById(orderItem.idItem);
			if (!item) throw new Error("Item not found");
			order.addItem(item, orderItem.quantity);
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.getByCode(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		const total = order.getTotal();
		await this.orderRepository.save(order);
		await this.mediator.publish(new OrderPlaced(order));
		const output = new PlaceOrderOutput(order.code.value, total);
		return output;
	}
}