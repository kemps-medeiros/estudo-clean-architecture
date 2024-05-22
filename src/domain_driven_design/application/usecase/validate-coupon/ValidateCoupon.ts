import CouponRepository from "../../../domain/repository/CouponRepository";

export default class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository) {}

    async execute(couponCode: string): Promise<boolean> {
        const coupon = await this.couponRepository.getByCode(couponCode);
        if(!coupon) return false;
        return coupon.isValid;
    }
}