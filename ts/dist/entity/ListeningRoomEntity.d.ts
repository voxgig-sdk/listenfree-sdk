import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { ListeningRoom, ListeningRoomLoadMatch, ListeningRoomListMatch, ListeningRoomCreateData } from '../ListenfreeTypes';
declare class ListeningRoomEntity extends ListenfreeEntityBase<ListeningRoom> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: ListeningRoomEntity): ListeningRoomEntity;
    load(this: any, reqmatch?: ListeningRoomLoadMatch, ctrl?: Control): Promise<ListeningRoomEntity>;
    list(this: any, reqmatch?: ListeningRoomListMatch, ctrl?: Control): Promise<ListeningRoomEntity[]>;
    create(this: any, reqdata?: ListeningRoomCreateData, ctrl?: Control): Promise<ListeningRoomEntity>;
}
export { ListeningRoomEntity };
