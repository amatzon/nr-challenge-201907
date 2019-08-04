import { Card } from "@/app/components/Card/Card";

const template = function (data: {[key: string]: any}) {
    return `
        <article class="card card--host" id="HostCard_${data.id}">
            <h2 class="card__title">${data.title}</h2>
            <div class="card__content" id="HostCardContent_${data.id}">
                ${data.list}
            </div>
        </article>
    `;
};

export class HostCard extends Card {
    public mountPoint = 'component-hostboard-list';
    public template = template;
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
        console.log('HostCard constructor')
    }

    // init() {

    // }
}