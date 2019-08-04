import { Component } from '@/app/components/Component/Component';
import { Header } from '@/app/components/Header/Header'
import { HostBoard } from '@/app/components/HostBoard/HostBoard'
import './app.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <section class="app" data-id="${data.id}">
            <div id="app-header"></div>
            <div id="app-content"></div>
            <div id="app-footer"></div>
        </section>
    `;
};

export class App extends Component {
    public template = template;
    public childComponents: {[key: string]: Component} = {};

    constructor(options: {[key: string]: any}) {
        super(options);
        this.childComponents = {
            HostBoard: new HostBoard(),
        }
    }

    init(): void {
        this.render(this.templateData);

        this.loadUserData().then(
            (response) => {
                this.childComponents.Header = new Header({email: response.data.email});
                this.childComponents.Header.init();
            }
        );

        console.log('init', this.id)

        this.childComponents.HostBoard.init();
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
}