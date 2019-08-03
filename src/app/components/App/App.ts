import './app.scss';

export class App {
    protected MOUNT: string = 'app';

    constructor() {
        console.log('App constructor')
    }

    public init(): void {
        console.log('App init')
    }
}