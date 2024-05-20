import OrderCode from "../../domain/entity/OrderCode";

describe("OrderCode", () => {
  it("Should create an code order", () => {
    const date = new Date("2021-03-01T10:00:00");
    const sequentialNumber = 1;
    const orderCode = new OrderCode(date, sequentialNumber);

    const code = orderCode.value;

    expect(code).toBe("202100000001");
  });
});
