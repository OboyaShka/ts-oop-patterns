//  поведенческий шаблон проектирования. Используется в тех случаях, когда во время выполнения программы
//  объект должен менять своё поведение в зависимости от своего состояния.

type StatusType = 'waitingForPayment' | 'shipping' | 'delivered'

class OrderStatus {
    constructor(public status: StatusType, private nextStatus: new () => OrderStatus) {
    }

    next(): OrderStatus {
        return new this.nextStatus();
    }
}

class WaitingPayment extends OrderStatus {
    constructor() {
        super('waitingForPayment', Shipping);
    }
}

class Shipping extends OrderStatus {
    constructor() {
        super('shipping', Delivered);
    }
}

class Delivered extends OrderStatus {
    constructor() {
        super('delivered', Delivered);
    }
}

class Order {
    public state: OrderStatus;

    constructor() {
        this.state = new WaitingPayment();
    }

    public nextState(): void {
        this.state = this.state.next();
    };

    public cancelOrder(): void {
        this.state.status === 'waitingForPayment'
            ? console.log('Order canceled!')
            : console.log('Order can not be canceled!');
    };
}

const newOrder = new Order();
newOrder.cancelOrder();
console.log(newOrder.state.status);
newOrder.nextState();
newOrder.cancelOrder();
console.log(newOrder.state.status);
newOrder.nextState();
newOrder.cancelOrder();
console.log(newOrder.state.status);