export class Route {
    isMatch(hash: string): boolean {
        return false;
    }

    sortOrder() {
        return 0;
    }

    render(): void {
        console.log('Route.render()');
    }
}