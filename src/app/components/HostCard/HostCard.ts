import { Application } from '@/app/types/Application';
import { Card } from '@/app/components/Card/Card';
import { ApplicationItem } from '@/app/components/ApplicationItem/ApplicationItem';
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
        this.initList(this.list, `HostCardList_${this.id}`, ApplicationItem, 5);
    }

    /**
     * Updates the list with new data received
     * Removes event listeners before removing DOM
     * @param list New list of applications
     */
    updateList(list: Application[]) {
        this.list = list;
        this.childComponents.forEach((appItem) => {
            appItem.removeListeners();
        })
        this.initList(this.list, `HostCardList_${this.id}`, ApplicationItem, 5);
    }
}