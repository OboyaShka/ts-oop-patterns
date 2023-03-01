import { Route } from '../routing/route';

export class AboutRoute extends Route {
    isMatch(hash: string): boolean {
        return hash === 'about';
    }

    sortOrder(): number {
        return 10;
    }

    render() {
        console.log('About route!');
    }
}