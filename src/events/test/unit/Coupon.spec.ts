import Coupon from "../../domain/entity/Coupon";

describe('Coupon', () => {
    it("Deve criar um cupom de desconto", function () {
        const coupon = new Coupon("VALE20", 20);
        const isExpired = coupon.isExpired();
        expect(isExpired).toBeFalsy();
    });
    
    it("Deve criar um cupom de desconto e calcular o desconto", function () {
        const coupon = new Coupon("VALE20", 20);
        const discount = coupon.calculateDiscount(1000);
        expect(discount).toBe(200);
    });
    
    
    it("Deve criar um cupom de desconto expirado", function () {
        const coupon = new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00"));
        const isExpired = coupon.isExpired(new Date("2022-03-01T10:00:00"));
        expect(isExpired).toBeTruthy();
    });
})