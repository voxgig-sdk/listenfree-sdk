import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { Video, VideoLoadMatch } from '../ListenfreeTypes';
declare class VideoEntity extends ListenfreeEntityBase<Video> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: VideoEntity): VideoEntity;
    load(this: any, reqmatch?: VideoLoadMatch, ctrl?: Control): Promise<VideoEntity>;
}
export { VideoEntity };
