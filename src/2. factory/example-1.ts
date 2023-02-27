// Вариант с настройкой создания экземпляра одного класса

class Car {
    private readonly color: string
    private readonly speed: number

    constructor(color: string, speed: number) {
        this.color = color
        this.speed = speed
    }

    public carModel(): string {
        return `${this.color}-${this.speed}`
    }
}

export interface CarFactoryConfig {
    color: string
    type: CarType
}

export type CarType = 'sport' | 'daily' | 'jeep'

export enum CarMotor {
    'sport' = 300,
    'daily' = 120,
    'jeep' = 80,
}

export const carFactory = (config: CarFactoryConfig) => new Car(config.color, CarMotor[config.type])
