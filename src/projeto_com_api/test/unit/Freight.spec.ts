import Dimension from "../../domain/entity/Dimension";
import Freight from "../../domain/entity/Freight";
import Item from "../../domain/entity/Item";

describe('Freight', () => {
    it("Deve calcular o frete de um item", function () {
        const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3);
        const freight = new Freight();
        freight.addItem(item, 2);
        expect(freight.getTotal()).toBe(60);
    });
    
    it("Deve calcular o frete mínimo de um item", function () {
        const item = new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 0.9);
        const freight = new Freight();
        freight.addItem(item, 1);
        expect(freight.getTotal()).toBe(10);
    });
})