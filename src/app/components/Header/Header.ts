import { Component } from '@/app/components/Component/Component';
import './header.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <header class="c-header" data-id="${data.id}">
            <div class="c-header__titleContainer">
                <h1 class="c-header__title">${data.title} <small class="c-header__subtitle">for user ${data.email}</small></h1>
            </div>
            <div class="c-header__controls">
                <input type="checkbox" />
            </div>
        </header>
    `;
};

export class Header extends Component {
    public mountPoint: string = 'app-header';
    public template = template;
    private title: string = 'Apps by Host';
    // private templateData: {[key: string]: any} = {};
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.templateData.email = options.email;
        this.templateData.title = this.title;
    }

    // init() {
    //     this.render(this.templateData);
    // }
}