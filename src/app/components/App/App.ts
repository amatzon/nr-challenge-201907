import { Application } from '@/app/types/Application'
import { Header } from '@/app/components/Header/Header'
import { HostList } from '@/app/components/HostList/HostList'

import './app.scss';

export class App {
    private MOUNT: string = 'app';
    private JSON_DATA: string = '/data/host-app-data.json';
    private data: Application[] = [];
    private components: any[] = [];

    constructor() {
        this.components.push(
            new Header(),
        )
    }

    public init(): void {
        this.initComponents();
        this.loadData().then(
            (response) => {
                this.data = this.parseData(response.data);
            },
            (response) => {
                console.error(response);
            }
        )
    }

    private initComponents() {
        this.components.forEach((component) => {
            component.init();
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
}