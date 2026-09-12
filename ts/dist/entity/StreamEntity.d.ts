import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Stream, StreamLoadMatch } from '../ListenfreeTypes';
declare class StreamEntity extends ListenfreeEntityBase<Stream> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: StreamEntity): StreamEntity;
    load(this: any, reqmatch?: StreamLoadMatch, ctrl?: Control): Promise<StreamEntity>;
}
export { StreamEntity };
