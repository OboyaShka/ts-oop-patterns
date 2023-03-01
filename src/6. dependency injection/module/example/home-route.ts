import { Route } from '../routing/route';

export class HomeRoute extends Route {
    isMatch(hash: string): boolean {
        return !hash || hash === '#' || hash === '#home';
    }

    sortOrder(): number {
        return 10;
    }

    render() {
        console.log('Home route!');
    }
}