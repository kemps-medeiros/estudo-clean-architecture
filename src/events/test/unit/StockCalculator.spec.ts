import StockEntry from "../../domain/entity/StockEntry";
import StockCalculator from "../../domain/service/StockCalculator";

describe("StockCalculator", () => {
    it("should calculate stock of an item", () => {
        const calculator = new StockCalculator();
        const stockEntries = [
            new StockEntry(1, "in", 6),
            new StockEntry(1, "out", 2),
            new StockEntry(1, "in", 2)
        ];
        const total = calculator.calculate(stockEntries);
        expect(total).toBe(6);
    })
})