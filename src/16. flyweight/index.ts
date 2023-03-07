// структурный шаблон проектирования, который позволяет использовать разделяемые объекты сразу в нескольких контекстах.
// Данный паттерн используется преимущественно для оптимизации работы с памятью. (Кеширование)

class Star {
    constructor(private name: string) {
    }
}

class StarFactory {
    private stars: { [key in string]: Star } = {};

    create(name: string): Star {
        const star = this.stars[name];
        if (star) return star;
        this.stars[name] = new Star(name);
        return this.stars[name];
    };

    getStars(): Star[] {
        return Object.values(this.stars);
    };
}

const starFactory: StarFactory = new StarFactory();

const sun = starFactory.create('sun');
const sirius = starFactory.create('sirius ');
const sun2 = starFactory.create('sun');
const aldebaran = starFactory.create('aldebaran');

console.log(starFactory.getStars());