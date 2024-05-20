export default class Coupon {
    name: string;
    discount: number;
    expirationDate: Date;
    isValid: boolean;


    constructor(name: string, disccountInPercentege: number, expirationDate: Date) {
        this.name = name;
        this.discount = disccountInPercentege;
        this.expirationDate = expirationDate;
        this.isValid = this.validateCouponDate(expirationDate) ? true : false;
    }

    private validateCouponDate(expirationDate: Date) {
        return expirationDate > new Date();
    }
}