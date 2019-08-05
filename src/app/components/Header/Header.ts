import { Component } from '@/app/components/Component/Component';
import './style.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <header class="header" id="Header_${data.id}">
            <div class="header__container">
                <h1 class="header__title">
                    <span class="header__titlemain">${data.title}</span>
                    <small class="header__subtitle">${data.subtitle}</small>
                </h1>
            </div>
            <div class="header__controls">
                <label>
                    <input type="checkbox" />
                    <span>Show as list</span>
                </label>
            </div>
        </header>
    `;
};

export class Header extends Component {
    public template = template;
    private title: string = 'Header Title Goes Here';
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
    }

    init(options: {[key: string]: any} = {}) {
        this.templateData.title = options.title || this.title;
        this.templateData.subtitle = options.subtitle;
        this.render(this.templateData);
    }
}