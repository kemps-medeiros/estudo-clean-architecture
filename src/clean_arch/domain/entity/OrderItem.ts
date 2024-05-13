export type TOrderItemPayload = {
    idItem: number;
    quantity: number;
    price: number;
    volume?: number;
    density?: number;
}

export default class OrderItem {
    idItem: number;
    quantity: number;
    price: number;
    volume?: number;
    density?: number;

	constructor (payload: TOrderItemPayload) {
        const {idItem, quantity, price, volume, density} = payload;

        this.idItem = idItem;
        this.quantity = quantity;
        this.price = price;
        this.volume = volume;
        this.density= density;
    }   

	getTotalPrice () {
		return this.price * this.quantity;
	}
}