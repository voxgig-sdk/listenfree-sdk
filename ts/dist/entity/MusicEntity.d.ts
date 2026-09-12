import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Music, MusicListMatch } from '../ListenfreeTypes';
declare class MusicEntity extends ListenfreeEntityBase<Music> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: MusicEntity): MusicEntity;
    list(this: any, reqmatch?: MusicListMatch, ctrl?: Control): Promise<MusicEntity[]>;
}
export { MusicEntity };
