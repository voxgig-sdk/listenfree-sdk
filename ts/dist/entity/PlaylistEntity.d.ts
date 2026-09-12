import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Playlist, PlaylistLoadMatch, PlaylistListMatch, PlaylistCreateData, PlaylistUpdateData, PlaylistRemoveMatch } from '../ListenfreeTypes';
declare class PlaylistEntity extends ListenfreeEntityBase<Playlist> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: PlaylistEntity): PlaylistEntity;
    load(this: any, reqmatch?: PlaylistLoadMatch, ctrl?: Control): Promise<PlaylistEntity>;
    list(this: any, reqmatch?: PlaylistListMatch, ctrl?: Control): Promise<PlaylistEntity[]>;
    create(this: any, reqdata?: PlaylistCreateData, ctrl?: Control): Promise<PlaylistEntity>;
    update(this: any, reqdata?: PlaylistUpdateData, ctrl?: Control): Promise<PlaylistEntity>;
    remove(this: any, reqmatch?: PlaylistRemoveMatch, ctrl?: Control): Promise<PlaylistEntity>;
}
export { PlaylistEntity };
