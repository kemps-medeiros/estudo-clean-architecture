import Coupon from "../../domain/entity/Coupon";
import Dimension from "../../domain/entity/Dimension";
import Item from "../../domain/entity/Item";
import Order from "../../domain/entity/Order";

describe('Order', () => {
    it("Não deve criar um pedido com Cpf inválido", function () {
        expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf Inválido"));
    });
    
    it("Deve criar um pedido com 3 itens", function () {
        const order = new Order("935.411.347-80");
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
        const total = order.getTotal();
        expect(total).toBe(6090);
    });
    
    it("Deve criar um pedido com 3 itens com cupom de desconto", function () {
        const order = new Order("935.411.347-80");
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
        const coupon = new Coupon("VALE20", 20);
        order.addCoupon(coupon);
        const total = order.getTotal();
        expect(total).toBe(4872);
    });
    
    it("Deve criar um pedido com 3 itens com cupom de desconto expirado", function () {
        const order = new Order("935.411.347-80", new Date("2022-03-01T10:00:00"));
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
        const coupon = new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00"));
        order.addCoupon(coupon);
        const total = order.getTotal();
        expect(total).toBe(6090);
    });
    
    it("Deve criar um pedido com 3 itens e calcular o frete", function () {
        const order = new Order("935.411.347-80");
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(100, 50, 50), 20), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
        const total = order.getTotal();
        expect(total).toBe(6350);
    });
    
    it("Deve criar um pedido com 3 itens e calcular o frete mínimo", function () {
        const order = new Order("935.411.347-80");
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 0.9), 1);
        const total = order.getTotal();
        expect(total).toBe(40);
    });
    
    it("Deve criar um pedido e calcular o código", function () {
        const order = new Order("935.411.347-80", new Date("2021-03-01T10:00:00"), 1);
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
        expect(order.code.value).toBe("202100000001");
    });
    
    it("Deve lançar uma exception ao tentar criar um pedido com quantidade negativa", function () {
        const order = new Order("935.411.347-80");
        expect(() => order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), -100)).toThrow(new Error("Quantity must be positive"));
    });
    
    it("Deve lançar uma exception ao tentar criar um pedido com item duplicado", function () {
        const order = new Order("935.411.347-80");
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1)
        expect(() => order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1)).toThrow(new Error("Duplicated item"));
    });
})