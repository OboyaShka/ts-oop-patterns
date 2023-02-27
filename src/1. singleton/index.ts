// Пораждающий шаблон проектирования, гарантирующий, что в однопоточном приложении будет
// единственный экземпляр некоторого класса, и предоставляющий глобальноую точку доступа к этому экземпляру.

import SingletonTs from "./example-1";
import { getInstance } from "./example-2";
import SingletonLiteral from "./example-3";
import getInstanceLiteral from "./example-4";

console.log("Begin test");

console.log("1", SingletonTs.getInstance());

console.log("1", SingletonTs.getInstance());

console.log("1", SingletonTs.getInstance());

console.log("2", getInstance());

console.log("2", getInstance());

console.log("2", getInstance());

console.log("3", SingletonLiteral);

console.log("4", getInstanceLiteral());

console.log("4", getInstanceLiteral());

console.log("4", getInstanceLiteral());
