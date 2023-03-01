import { Route } from './route';

export class NotFoundRoute extends Route {
    isMatch(hash: string): boolean {
        return true;
    }

    sortOrder(): number {
        return 999999;
    }

    render() {
        console.log('route 404!');
    }
}