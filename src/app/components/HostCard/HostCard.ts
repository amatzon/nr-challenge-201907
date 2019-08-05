import { Card } from '@/app/components/Card/Card';
import './style.scss';

const template = function (data: {[key: string]: any}) {
    return `
        <article class="card card--host" id="HostCard_${data.id}">
            <h2 class="card__title">${data.title}</h2>
            <ul class="card__list" id="HostCardList_${data.id}">
            </ul>
        </article>
    `;
};

export class HostCard extends Card {
    public template = template;
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
    }

    init(options: {[key: string]: any} = {}) {
        this.list = options.list || [];
        this.templateData.title = options.title || this.title;

        this.render(this.templateData);
        this.initList(this.list, `HostCardList_${this.id}`, 5);

        console.log('this.list', this.list)
    }
}