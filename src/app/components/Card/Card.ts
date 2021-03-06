import { Component } from '@/app/components/Component/Component';
import { ListItem } from '@/app/components/ListItem/ListItem';

const template = function (data: {[key: string]: any}) {
    return `
        <article class="card" id="Card_${data.id}">
            <h2 class="card__title">${data.title}</h2>
            <ul class="card__list" id="CardList_${data.id}"></ul>
        </article>
    `;
};

export class Card extends Component {
    public template = template;
    public title: string = 'Card Title Goes Here';
    public childComponents: any[] = [];
    public list: any[] = [];

    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.templateData.title = options.title;
    }

    init(options: {[key: string]: any} = {}) {
        this.list = options.list || [];
        this.templateData.title = options.title || this.title;

        this.render(this.templateData);
        this.initList(options.list, `CardList_${this.id}`);
    }
    
    /**
     * Our card expects a customisable list to display. List items become the child components
     * @param list List of objects to create from
     * @param selector Custom template DOM selector
     * @param Item Custom template 
     * @param limit Limit the list of items to display
     */
    initList(list: any[], selector: string, Item: any = ListItem, limit?: number | null): void {
        const listContainer = document.getElementById(selector);
        if (listContainer) listContainer.innerHTML = '';
        let counter = 0;
        for (let item of list) {
            if (limit !== null && counter === limit) {
                break;
            }
            const listItem = new Item({selector: selector});
            this.childComponents = Array().concat(this.childComponents, listItem);
            listItem.init({item: item.name, apdex: item.apdex, version: item.version});
            counter++;
        }
    }

}