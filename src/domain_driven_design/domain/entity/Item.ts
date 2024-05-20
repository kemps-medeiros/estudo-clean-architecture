export type TItemPayload = {
    idItem: number;
    groupItem: string;
    description: string;
    price: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
}

export default class Item {
    idItem: number;
    groupItem: string;
    description: string;
    price: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;

    constructor(payload: TItemPayload) {
        const {idItem, groupItem, description, price, width, height, length, weight} = payload;
        
        this.idItem = idItem;
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