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
                    <input type="checkbox" name="view" value="grid" id="Checkbox_${data.id}" />
                    <span>Show as list</span>
                </label>
            </div>
        </header>
    `;
};

export class Header extends Component {
    public template = template;
    private title: string = 'Header Title Goes Here';
    private checkboxElem: HTMLElement | null = null;
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.onChange = this.onChange.bind(this);
    }

    init(options: {[key: string]: any} = {}): void {
        this.templateData.title = options.title || this.title;
        this.templateData.subtitle = options.subtitle;
        this.render(this.templateData);
        this.checkboxElem = document.getElementById(`Checkbox_${this.id}`);
        this.initListeners();
    }

    initListeners(): void {
        if (this.checkboxElem) {
            this.checkboxElem.addEventListener('change', this.onChange);
        }
    }

    onChange(e: Event): void {
        e.preventDefault();
        const boardElem = document.getElementsByClassName('board__cards');
        boardElem[0].classList.toggle('asList');
    }
}