import { ListenfreeEntityBase } from '../ListenfreeEntityBase';
import type { ListenfreeSDK } from '../ListenfreeSDK';
import type { Control } from '../types';
import type { OfflineDownload, OfflineDownloadCreateData } from '../ListenfreeTypes';
declare class OfflineDownloadEntity extends ListenfreeEntityBase<OfflineDownload> {
    constructor(client: ListenfreeSDK, entopts: any);
    make(this: OfflineDownloadEntity): OfflineDownloadEntity;
    create(this: any, reqdata?: OfflineDownloadCreateData, ctrl?: Control): Promise<OfflineDownloadEntity>;
}
export { OfflineDownloadEntity };
