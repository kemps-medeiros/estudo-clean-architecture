import ValidateCoupon from "../../application/usecase/validate-coupon/ValidateCoupon";
import CouponRepositoryInMemory from "../../infra/repository/CouponRepositoryInMemory";

describe("ValidationCoupon", () => {
    it("should validate coupon", () => {
        const couponRepository = new CouponRepositoryInMemory();

        const validateCoupon = new ValidateCoupon(couponRepository);

        const isValid = validateCoupon.execute("VALE20");

        expect(isValid).toBeTruthy();
    })
})