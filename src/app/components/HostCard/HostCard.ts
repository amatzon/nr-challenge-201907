import { Card } from "@/app/components/Card/Card";

const template = function (data: {[key: string]: any}) {
    return `
        <li>
            <article>
                <h2>${data.title}</h2>
                <div>
                    ${data.list}
                </div>
            </article>
        </li>
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