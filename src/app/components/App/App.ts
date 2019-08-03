import { Component } from '@/app/components/Component/Component';
import { Header } from '@/app/components/Header/Header'
import { HostBoard } from '@/app/components/HostBoard/HostBoard'
import './app.scss';

const template = function () {
    return `
        <section>
            <div id="app-header"></div>
            <div id="app-content"></div>
            <div id="app-footer"></div>
        </section>
    `;
};

export class App extends Component {
    public template = template;

    constructor(options: {[key: string]: any}) {
        super(options);
        this.childComponents = {
            HostBoard: new HostBoard(),
        }
    }

    init(): void {
        this.render();

        this.loadUserData().then(
            (response) => {
                this.childComponents.Header = new Header({email: response.data.email});
                this.childComponents.Header.init();
            }
        );

        this.initChildComponents();
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