import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepositoryInMemory from "../repository/CouponRepositoryInMemory";
import ItemRepositoryInMemory from "../repository/ItemRepositoryInMemory";
import OrderRepositoryInMemory from "../repository/OrderRepositoryInMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

	createItemRepository(): ItemRepository {
		return new ItemRepositoryInMemory();
	}

	createCouponRepository(): CouponRepository {
		return new CouponRepositoryInMemory();
	}

	createOrderRepository(): OrderRepository {
		return new OrderRepositoryInMemory();
	}
}