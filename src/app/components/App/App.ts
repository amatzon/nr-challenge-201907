import { Application } from '@/app/types/Application'
import { Header } from '@/app/components/Header/Header'
import { HostBoard } from '@/app/components/HostBoard/HostBoard'

import './app.scss';


export class App {
    private MOUNT: string = 'app';
    private JSON_DATA: string = '/data/host-app-data.json';
    private data: Application[] = [];
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

        this.loadData().then(
            (response) => {
                this.data = this.parseData(response.data);
                this.components.HostBoard.init({data: this.data});
            },
            (response) => {
                console.error(response);
            }
        );
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

    private loadData(): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${this.JSON_DATA}`);
          
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
        
            xhr.onload = (event: ProgressEvent) => {
                try {
                    const json = JSON.parse(xhr.responseText);
                    resolve({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: json,
                    });
                } catch(e) {
                    reject('Error while parsing JSON');
                }
                
            };
        
            xhr.onerror = (event: ProgressEvent) => {
                resolve({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    data: xhr.statusText,
                });
            };
        
            xhr.send();
        });
    }

    private generateId(): number {
        return Math.floor(Math.random() * 10000);
    }

    private parseData(data: []) {
        return data.map((app: Application) => {
            app.id = this.generateId();
            return app;
        })
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