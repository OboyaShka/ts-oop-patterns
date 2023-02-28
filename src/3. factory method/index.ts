// Пораждающий шаблон проектирования позволяющий создавать экземпляр некоторого типа путём вызова метода,
// позволяет менять создаваемый тип в наследниках без изменения логики базового класса

interface SimpleItem<T = number> {
    id: T,
    name: string
}

const mockData: SimpleItem[] = [
    {
        id: 1,
        name: 'Пылесос'
    },
    {
        id: 2,
        name: 'Телефон'
    },
]

class Product {
    private id: number
    private name: string

    constructor(item: SimpleItem) {
        this.id = item.id
        this.name = item.name
    }
}

class ProductRepository {
    protected url: string = 'https://my-website.haha/product'

    public get(id: number): Product | null {
        const data = mockData.filter(item => item.id === id)
        if (!data[0]) return null

        return this.createProduct(data[0])
        // return new Product(data[0])
    }

    public all(): Product[] {
        return mockData.map(this.createProduct)
        // return mockData.map(item => new Product(item))
    }

    protected createProduct(item: SimpleItem): Product {
        return new Product(item)
    }
}

class SuperProduct extends Product {
    private catalogNumber: string

    constructor(item: SimpleItem) {
        super(item)
        this.catalogNumber = `${item.id}-${item.name}`
    }
}

class SuperProductRepository extends ProductRepository {
    override url: string = 'https://your-website.hehe/product/super'

    override createProduct(item: SimpleItem): SuperProduct {
        return new SuperProduct(item)
    }
}