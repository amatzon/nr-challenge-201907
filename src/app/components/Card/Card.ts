import { Component } from '@/app/components/Component/Component';
import './style.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <article class="card" id="Card_${data.id}">
            <h2 class="card__title">${data.title}</h2>
            <div class="card__content" id="CardContent_${data.id}">TE</div>
        </article>
    `;
};

export class Card extends Component {
    public template = template;
    // public title: string = '';
    // public list: any[] = [];

    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.templateData.title = options.title;
        this.templateData.list = options.list;
    }

    // init() {
    //     console.log('init', this.id)
    // }
}