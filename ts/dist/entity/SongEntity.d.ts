import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Song, SongLoadMatch } from '../ListenfreeTypes';
declare class SongEntity extends ListenfreeEntityBase<Song> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: SongEntity): SongEntity;
    load(this: any, reqmatch?: SongLoadMatch, ctrl?: Control): Promise<SongEntity>;
}
export { SongEntity };
