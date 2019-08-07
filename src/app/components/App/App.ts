import { Component } from '@/app/components/Component/Component';
import { Header } from '@/app/components/Header/Header'
import { HostBoard } from '@/app/components/HostBoard/HostBoard'
import './style.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <section class="app" id="App_${data.id}">
            <div class="app__header" id="AppHeader_${data.id}"></div>
            <main class="app__content" id="AppContent_${data.id}"></main>
            <div class="app__footer" id="AppFooter_${data.id}"></div>
        </section>
    `;
};

/**
 * Application Class
 * @extends Component
 */
export class App extends Component {
    public template = template;
    public childComponents: {[key: string]: Component} = {};

    constructor(options: {[key: string]: any}) {
        super(options);
        // Cache child component as instances
        this.childComponents = {
            Header: new Header({selector: `AppHeader_${this.id}`}),
            HostBoard: new HostBoard({selector: `AppContent_${this.id}`}),
        }
    }

    init(): void {
        this.render(this.templateData);

        this.loadUserData().then(
            (response) => {
                // Init Header only after user data loads because we need email address
                this.childComponents.Header.init({
                    title: response.data.title,
                    subtitle: `for user ${response.data.email}`,
                });
            }
        );

        // Init the Board synchronously 
        this.childComponents.HostBoard.init();
    }

    /**
     * Mock loading user data from API
     */
    private loadUserData(): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                status: 200,
                statusText: 'OK',
                data: {
                    title: 'Apps by Host',
                    email: 'averylongemailaddress@companyname.com'
                }
            });
        });
    }
}