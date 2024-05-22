import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../domain/repository/CouponRepository";

export default class CouponRepositoryInMemory implements CouponRepository {
    coupons: Coupon[];

    constructor() {
        this.coupons = [
            new Coupon("VALE20", 20, new Date('2999-01-01'))
        ]
    }


    async getByCode(couponCode: string): Promise<Coupon | undefined> {
        return this.coupons.find(coupon => coupon.name === couponCode);
    }
}