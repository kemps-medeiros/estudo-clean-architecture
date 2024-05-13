import Coupon from "../../domain/entity/Coupon";
import Item, { TItemPayload } from "../../domain/entity/Item";
import Order from "../../domain/entity/Order";

describe('Order', () => {
    it("should not create an order if cpf is invalid", () => {
        expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf Inválido"));
    })

    it("should create an order with 3 itens", () => {
        const order = new Order("501.961.700-87");

        const payloadIten1: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "banana",
            price: 2000
        }

        const payloadIten2: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "apple",
            price: 4000
        }

        const payloadIten3: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "pineapple",
            price: 5000
        }
        

        order.addItem(new Item(payloadIten1), 1);
        order.addItem(new Item(payloadIten2), 1);
        order.addItem(new Item(payloadIten3), 2);

        const total = order.getTotalPrice();

        expect(total).toBe(16010);
    })

    it("should create an order with 3 itens and discount coupon", () => {
        const order = new Order("501.961.700-87");

        const payloadIten1: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "banana",
            price: 2000
        }

        const payloadIten2: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "apple",
            price: 4000
        }

        const payloadIten3: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "pineapple",
            price: 5000
        }
        

        order.addItem(new Item(payloadIten1), 1);
        order.addItem(new Item(payloadIten2), 1);
        order.addItem(new Item(payloadIten3), 2);

        order.addCoupon(new Coupon("VALE10", 10, new Date('2999-01-01')));

        const total = order.getTotalPrice();

        expect(total).toBe(14410);
    })

    it('should create an order with 3 itens with expired dicount coupon', () => {
        const order = new Order("501.961.700-87");

        const payloadIten1: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "banana",
            price: 2000
        }

        const payloadIten2: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "apple",
            price: 4000
        }

        const payloadIten3: TItemPayload = {
            idItem: 1,
            groupItem: "food",
            description: "pineapple",
            price: 5000
        }
        

        order.addItem(new Item(payloadIten1), 1);
        order.addItem(new Item(payloadIten2), 1);
        order.addItem(new Item(payloadIten3), 2);

        order.addCoupon(new Coupon("VALE10", 10, new Date('2024-01-01')));

        const total = order.getTotalPrice();

        expect(total).toBe(16010);
    })

    it('should create an order with 3 itens and caculate the freight', () => {
        const order = new Order("501.961.700-87");

        const payloadIten1: TItemPayload = {
            idItem: 1,
            groupItem: "any",
            description: "camera",
            price: 1000,
            width: 20,
            height: 15,
            length: 10,
            weight: 1
        }

        const payloadIten2: TItemPayload = {
          idItem: 2,
          groupItem: "instruments",
          description: "guitarra",
          price: 4000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
        };

        const payloadIten3: TItemPayload = {
            idItem: 3,
            groupItem: "kitchen",
            description: "geladeira",
            price: 5000,
            width: 200,
            height: 100,
            length: 50,
            weight: 40,
        }
        

        order.addItem(new Item(payloadIten1), 1);
        order.addItem(new Item(payloadIten2), 1);
        order.addItem(new Item(payloadIten3), 1);

        const total = order.getTotalPrice();
        const freight = order.getFreight();

        expect(total).toBe(10440);
        expect(freight).toBe(440);
    })

    it('should create an order with 3 itens and caculate the minimun freight', () => {
        const order = new Order("501.961.700-87");

        const payloadIten1: TItemPayload = {
            idItem: 1,
            groupItem: "any",
            description: "camera",
            price: 1000,
            width: 10,
            height: 10,
            length: 10,
            weight: 0.9
        }

        const payloadIten2: TItemPayload = {
          idItem: 2,
          groupItem: "instruments",
          description: "guitarra",
          price: 4000,
        };

        const payloadIten3: TItemPayload = {
            idItem: 3,
            groupItem: "kitchen",
            description: "geladeira",
            price: 5000,
        }
        

        order.addItem(new Item(payloadIten1), 1);
        order.addItem(new Item(payloadIten2), 1);
        order.addItem(new Item(payloadIten3), 1);

        const total = order.getTotalPrice();
        const freight = order.getFreight();

        expect(total).toBe(10010);
        expect(freight).toBe(10);
    })

})