import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    getByCode(couponCode: string): Coupon | undefined;
}