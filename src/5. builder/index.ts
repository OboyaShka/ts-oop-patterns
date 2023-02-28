// Пораждающий шаблон проектирования, позволяющий параметризировать создание экземпляра
// некоторого типа путём вызова цепочки методов и создавать путём вызова создающего метода в конце

import { ApiBuilder } from "./example-1";

const builder: ApiBuilder = new ApiBuilder();

builder.setModule("admin").setController("card");

// другая часть системы
builder
    .setAction("cards")
    .addGetParam({ key: "sort", value: "asc" })
    .addGetParam({ key: "id", value: "123" });
// end

console.log(builder.create());
