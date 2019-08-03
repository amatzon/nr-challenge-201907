import { Header } from '@/app/components/Header/Header'
import { HostBoard } from '@/app/components/HostBoard/HostBoard'

import './app.scss';


export class App {
    private MOUNT: string = 'app';
    private components: {[key: string]: any} = {};

    constructor() {
        this.components.HostBoard = new HostBoard();
    }

    public init(): void {
        this.mount();

        this.loadUserData().then(
            (response) => {
                this.components.Header = new Header({email: response.data.email});
                this.components.Header.init();
            }
        );

        this.initComponents();
    }

    private mount(): void {
        const appElement = document.getElementById(this.MOUNT);
        if (!appElement) {
            throw new Error(`App init failed! Cannot find element #${this.MOUNT} to mount the app to.`);
        }
        appElement.insertAdjacentHTML('afterbegin', this.template());
    }

    private initComponents(): void {
        Object.keys(this.components).forEach((componentName) => {
            this.components[componentName].init();
        })
    }

    private loadUserData(): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                status: 200,
                statusText: 'OK',
                data: {
                    email: 'averylongemailaddress@companyname.com'
                }
            });
        });
    }

    private template() {
        return `
            <section>
                <div id="app-header"></div>
                <div id="app-content"</div>
                <div id="app-footer"></div>
            </section>
        `;
    }
}