import { Component } from '@/app/components/Component/Component';

const template = function(data: {[key: string]: any}) {
    return `
        <div class="board" id="Board_${data.id}">
            <div id="board__list" data-id="BoardList_${data.id}">
            </div>
        <//div>
    `;
};

/**
 * Board Class
 * @extends Component
 */
export class Board extends Component {
    public template = template;
    public cards: string[] = [];
    
    constructor(options: {[key: string]: any}) {
        super(options);
    }
}