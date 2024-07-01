import StockEntry from "../../domain/entity/StockEntry";

describe("StockEntry", () => {
  it("should create an entry on Stock", () => {
    const stockEntry = new StockEntry(1, "in", 6);
    expect(stockEntry.idItem).toBe(1);
    expect(stockEntry.operation).toBe("in");
    expect(stockEntry.quantity).toBe(6);
  });
});
