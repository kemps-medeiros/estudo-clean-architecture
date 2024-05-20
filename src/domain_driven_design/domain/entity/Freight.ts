import OrderItem from "./OrderItem";

export default class Freight {
    distance = 1000;


    calculate(orderItens: OrderItem[]) {
        let total = 0;
        
        for (const orderItem of orderItens) {
            if(orderItem.volume && orderItem.density) {
                total+= this.distance * orderItem.volume * (orderItem.density/100);
            }
        }

        if(total < 10) {
            total = 10;
        }

        return total;
    }
}