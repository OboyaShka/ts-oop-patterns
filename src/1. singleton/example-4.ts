let instanse

export default () => {
    if (!instanse) {
        console.log("Hello from example 4")

        instanse = {
            version: "4"
            // Логика
        }
    }

    return instanse
}