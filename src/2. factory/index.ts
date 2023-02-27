// Пораждающий шаблон проектирования, позволяющий создавать экземпляр некоторого типа
// путём вызова одного метода или функции с некоторыми дополнительными параметрами

import { carFactory } from "./example-1";

console.log(carFactory({color: 'green', type: 'sport'}))
console.log(carFactory({color: 'red', type: 'jeep'}))