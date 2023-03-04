// ООП подход
// class Widget {
// }
//
// interface WidgetFactory {
//     makeWidget(): Widget;
// }
//
// class СoncreteWidgetFactory implements WidgetFactory {
//     public makeWidget(): Widget {
//         return new Widget();
//     }
// }
//
// class SingletonDecorator implements WidgetFactory {
//     private factory: WidgetFactory;
//     private instance: Widget | undefined = undefined;
//
//     constructor(factory: WidgetFactory) {
//         this.factory = factory;
//     }
//
//     public makeWidget(): Widget {
//         if (this.instance === undefined) {
//             this.instance = this.factory.makeWidget();
//         }
//         return this.instance;
//     }
// }

class Widget {
    constructor(private time: number) {
    }

    getTime(): number {
        return this.time;
    }
}

type WidgetFactory = () => Widget

function makeWidget(): Widget {
    return new Widget(new Date().getTime());
}

function useNWidget(n: number): any {
    return (factory: WidgetFactory) => {
        for (let i = 0; i < n; i++) {
            let widget = factory();
            console.log(widget);
        }
    };
}

function singletonDecorator(factory: WidgetFactory): WidgetFactory {
    let instance: Widget | undefined = undefined;

    return (): Widget => {
        if (instance === undefined) {
            instance = factory();
        }
        return instance;
    };
}

useNWidget(10)(makeWidget);
useNWidget(10)(singletonDecorator(makeWidget));