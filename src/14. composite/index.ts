// структурный шаблон проектирования, объединяющий объекты в древовидную структуру для представления иерархии
// от частного к целому. Компоновщик позволяет клиентам обращаться к отдельным объектам и к группам объектов одинаково.

type UnitType = 'archer' | 'warrior' | 'beast'

class CombatUnit {
    private attack: number = 0;
    private name: string = 'nameless';

    dealDmg(): number {
        return this.attack;
    }

    getName(): string {
        return this.name;
    }

    setDmg(attack: number): void {
        this.attack = attack;
    }

    setName(name: string): void {
        this.name = name;
    }
}

class UnitFactory {
    createUnit(unitType: UnitType): CombatUnit {
        switch (unitType) {
            case 'archer':
                const archerUnit = new CombatUnit();
                archerUnit.setDmg(10);
                archerUnit.setName('archer');
                return archerUnit;
            case 'warrior':
                const warriorUnit = new CombatUnit();
                warriorUnit.setDmg(15);
                warriorUnit.setName('warrior');
                return warriorUnit;
            case 'beast':
                const beastUnit = new CombatUnit();
                beastUnit.setDmg(32);
                beastUnit.setName('beast');
                return beastUnit;
        }
    }
}

class Composite extends CombatUnit {
    private units: CombatUnit[] = [];

    public addUnit(unit: CombatUnit): void {
        this.units.push(unit);
    }

    public getAllUnitsAttack(): number {
        return this.units
            .map(unit => unit.dealDmg())
            .reduce((a, b) => a + b);
    };
}

class UnitsSquad extends Composite {
    constructor() {
        super();
        this.setName('army');
    }
}

const unitFactory = new UnitFactory();

const group1 = new UnitsSquad();
group1.addUnit(unitFactory.createUnit('archer'));
group1.addUnit(unitFactory.createUnit('beast'));
group1.addUnit(unitFactory.createUnit('warrior'));
group1.addUnit(unitFactory.createUnit('warrior'));
group1.addUnit(unitFactory.createUnit('warrior'));
group1.setName('group1');
group1.setDmg(group1.getAllUnitsAttack());

const group2 = new UnitsSquad();
group2.addUnit(unitFactory.createUnit('archer'));
group2.addUnit(unitFactory.createUnit('archer'));
group2.addUnit(unitFactory.createUnit('archer'));
group2.setName('group2');
group2.setDmg(group2.getAllUnitsAttack());

const group3 = new UnitsSquad();
group3.addUnit(unitFactory.createUnit('archer'));
group3.addUnit(unitFactory.createUnit('archer'));
group3.setName('group3');
group3.setDmg(group3.getAllUnitsAttack());

const army = new UnitsSquad();
army.addUnit(group1);
army.addUnit(group2);
army.addUnit(group3);

console.log('group1Attack: ' + group1.getAllUnitsAttack());
console.log('group2Attack: ' + group2.getAllUnitsAttack());
console.log('group3Attack: ' + group3.getAllUnitsAttack());
console.log('armyAttack: ' + army.getAllUnitsAttack());