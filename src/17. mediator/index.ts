abstract class Mediator {
    abstract send: (message: string, colleague: Colleague) => void;
}

class Manager extends Mediator {
    public client: ClientColleague | undefined;
    public employee: EmployeeColleague | undefined;
    public deliveryman: DeliverymanColleague | undefined;

    public send = (message: string, colleague: Colleague): void => {
        if (colleague === this.client)
            this.employee?.notify(message);
        else if (colleague == this.employee) {
            if (this.employee)
                if (this.employee.isExistenceProduct)
                    this.deliveryman?.notify(message);
                else
                    this.client?.notify(message);
        } else if (colleague === this.deliveryman && this.employee?.isExistenceProduct) {
            this.client?.notify(message);
        }
    };
}

abstract class Colleague {
    protected constructor(protected mediator: Mediator) {
    }

    public send(message: string) {
        this.mediator.send(message, this);
    }

    public abstract notify: (message: string) => void;
}

class ClientColleague extends Colleague {
    constructor(mediator: Mediator) {
        super(mediator);
    }

    public notify = (message: string): void => {
        console.log('Клиенту: ' + message);
    };
}

class EmployeeColleague extends Colleague {

    constructor(public isExistenceProduct: boolean, mediator: Mediator) {
        super(mediator);
    }

    public notify = (message: string): void => {
        console.log('Работнику: ' + message);
    };
}


class DeliverymanColleague extends Colleague {
    constructor(mediator: Mediator) {
        super(mediator);
    }

    public notify = (message: string): void => {
        console.log('Доставщику: ' + message);
    };
}

const manager: Manager = new Manager();

const client = new ClientColleague(manager);
const employee = new EmployeeColleague(true, manager);
const deliveryman = new DeliverymanColleague(manager);

manager.client = client;
manager.employee = employee;
manager.deliveryman = deliveryman;

client.send('Работник, поищи, пожалуйста, товар на складе');
employee.send(employee.isExistenceProduct ?
    'Доставщик, отправь товар' : 'Товар не может быть отправлен, товара на складе нету');
deliveryman.send('Товар был отправлен, ожидайте его прибытия');


employee.isExistenceProduct = false;

client.send('Работник, поищи, пожалуйста, товар на складе');
employee.send(employee.isExistenceProduct ?
    'Доставщик, отправь товар' : 'Товар не может быть отправлен, товара на складе нету');
deliveryman.send('Товар был отправлен, ожидайте его прибытия');

