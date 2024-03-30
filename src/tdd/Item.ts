export type TItemPayload = {
    sequentialNumber: number;
    groupItem: string;
    description: string;
    price: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
}

export default class Item {
    sequentialNumber: number;
    groupItem: string;
    description: string;
    price: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;

    constructor(payload: TItemPayload) {
        const {sequentialNumber, groupItem, description, price, width, height, length, weight} = payload;
        
        this.sequentialNumber = sequentialNumber;
        this.groupItem = groupItem;
        this.description =  description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }

    getVolume() {
        if (this.width && this.height && this.length) {
            return this.width/100 * this.height/100 * this.length/100
        }

        return 0;
    }

    getDensity() {
        if (this.width && this.height && this.length && this.weight) {
            return this.weight/this.getVolume()
        }

        return 0;
    }
}