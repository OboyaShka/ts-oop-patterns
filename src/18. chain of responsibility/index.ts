// Поведенческий шаблон проектирования, который позволяет избежать жесткой привязки отправителя запроса к получателю.
// Все возможные обработчики запроса образуют цепочку, а сам запрос перемещается по этой цепочке.
// Каждый объект в этой цепочке при получении запроса выбирает, либо закончить обработку запроса,
// либо передать запрос на обработку следующему по цепочке объекту.


abstract class Account {
    protected abstract name: string;
    protected abstract balance: number;
    protected incomer: Account | undefined;

    pay(orderPrice: number): void {
        if (this.canPay(orderPrice)) {
            console.log(`Покупка на ${orderPrice} руб оплачена с помощью ${this.name}`);
        } else if (this.incomer) {
            console.log(`На ${this.name} недостаточно средств`);
            this.incomer.pay(orderPrice);
        } else {
            console.log('К сожалению ни один из способов оплаты не проходит');
        }
    }

    canPay(amount: number): boolean {
        return this.balance >= amount;
    }

    setNext(account: Account) {
        this.incomer = account;
    };
}

class Qiwi extends Account {
    protected name: string = 'Qiwi';

    constructor(protected balance: number) {
        super();
    }
}

class MasterCard extends Account {
    protected name: string = 'MasterCard';

    constructor(protected balance: number) {
        super();
    }
}

class Paypal extends Account {
    protected name: string = 'Paypal';

    constructor(protected balance: number) {
        super();
    }
}

class Visa extends Account {
    protected name: string = 'Visa';

    constructor(protected balance: number) {
        super();
    }
}

const masterCard = new MasterCard(1222);
const qiwi = new Qiwi(2332);
const visa = new Visa(16);
const paypal = new Paypal(15320);

masterCard.setNext(qiwi);
qiwi.setNext(visa);
visa.setNext(paypal);

masterCard.pay(12);
masterCard.pay(14000);
masterCard.pay(19000);