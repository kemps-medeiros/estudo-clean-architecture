import Dimension from "../../domain/entity/Dimension";
import Item from "../../domain/entity/Item";

describe('Item', () => {
    it("Deve criar um item com dimensões e calcular o volume", function () {
        const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10));
        const volume = item.getVolume();
        expect(volume).toBe(0.03);
    });
    
    it("Deve criar um item com dimensões e calcular a densidade", function () {
        const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3);
        const density = item.getDensity();
        expect(density).toBe(100);
    });
    
    it("Deve lançar uma exception se o peso do item for negativo", function () {
        expect(() => new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), -100)).toThrow(new Error("Invalid weight"));
    });
})