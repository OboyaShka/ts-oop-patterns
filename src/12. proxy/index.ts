//  структурный шаблон проектирования, предоставляющий объект, который контролирует доступ к другому объекту,
//  перехватывая все вызовы (выполняет функцию контейнера).

// Виды: виртуальный (lazyload), логирующий, защищающий, кеширующий

class CustomRouter {
    goTo(url: string): void {
        console.log('redirect to ' + url);
    }

    goBack(): void {
        console.log('prev page');
    }
}

class CustomRouterProxy {
    private isAuth: boolean = false;

    constructor(private router: CustomRouter) {
    }

    auth(login: string, password: string): boolean {
        if (login === password) {
            this.isAuth = true;
            return true;
        }

        return false;
    }

    goTo(url: string): void {
        if (this.isAuth) {
            this.router.goTo(url);
            return;
        }
        console.error('no auth');
    }

    goBack(): void {
        if (this.isAuth) {
            this.router.goBack();
            return;
        }
        console.error('no auth');
    }
}

const customRouterProxy = new CustomRouterProxy(new CustomRouter());
customRouterProxy.goTo('/home');
customRouterProxy.goBack();

customRouterProxy.auth('admin', 'admin');

customRouterProxy.goTo('/home');
customRouterProxy.goBack();