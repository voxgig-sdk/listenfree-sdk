import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Search, SearchLoadMatch } from '../ListenfreeTypes';
declare class SearchEntity extends ListenfreeEntityBase<Search> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    load(this: any, reqmatch?: SearchLoadMatch, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };
