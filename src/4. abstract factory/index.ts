// Пораждающий шаблон проектирования позволяющий создавать экземпляры некоторого
// абстрактного типа путём вызова одного метода или функции с некоторыми дополнительными параметрами

abstract class AbstractStudentFactory {
    abstract createProgrammer: () => AbstractProgrammerStudent
    abstract createEconomist: () => AbstractEconomistStudent
}

class MGUFactory extends AbstractStudentFactory {
    createProgrammer = (): AbstractProgrammerStudent => new ProgrammerMGU();
    createEconomist = (): AbstractEconomistStudent => new EconomistMGU();
}

class URFUFactory extends AbstractStudentFactory {
    createProgrammer = (): AbstractProgrammerStudent => new ProgrammerURFU();
    createEconomist = (): AbstractEconomistStudent => new EconomistURFU();
}

abstract class AbstractEconomistStudent {
    abstract qualification: string
    abstract calcIncome: (bet: number, hours: number) => number
}

class EconomistMGU extends AbstractEconomistStudent {
    public qualification: string = 'Бакалавр по экономической специальности МГУ'

    calcIncome = (bet: number, hours: number) => {
        return bet * hours
    }
}

class EconomistURFU extends AbstractEconomistStudent {
    public qualification: string = 'Бакалавр по экономической специальности УРФУ'

    calcIncome = (bet: number, hours: number) => {
        return bet * hours * Math.random()
    }
}

abstract class AbstractProgrammerStudent {
    abstract qualification: string
    abstract writeCode: (tasks: any[]) => string
}

class ProgrammerMGU extends AbstractProgrammerStudent {
    public qualification: string = 'Бакалавр по IT специальности МГУ'

    writeCode = (tasks: any[]) => {
        return tasks.map(_ => 'WellDone').join("")
    }
}

class ProgrammerURFU extends AbstractProgrammerStudent {
    public qualification: string = 'Бакалавр по IT специальности УРФУ'

    writeCode = (tasks: any[]) => {
        return tasks.map(_ => 'console.log()').join("")
    }
}

class University {
    constructor(private studentFactory: AbstractStudentFactory) {
        const coder = studentFactory.createProgrammer()
        const economist = studentFactory.createEconomist()

        console.log('Квалификация программиста: ', coder.qualification)
        console.log('Квалификация экономиста: ', economist.qualification)

        console.log('Программист работает...')
        console.log(coder.writeCode(new Array(10).fill(true)))

        console.log('Экономист считает...')
        console.log(economist.calcIncome(220, 40))
    }
}

const MGU = new University(new MGUFactory())
const URFU = new University(new URFUFactory())