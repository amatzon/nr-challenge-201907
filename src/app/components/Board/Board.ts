import { getJSON } from '@/app/helpers/xhr'
import { Component } from '@/app/components/Component/Component';

export class Board extends Component {
    public cards: string[] = [];
    
    constructor(options: {[key: string]: any}) {
        super(options);
    }

    loadData(path: string): Promise<any> {
        return getJSON(path)
    }
}