import { ListeningRoomEntity } from './entity/ListeningRoomEntity';
import { MusicEntity } from './entity/MusicEntity';
import { OfflineDownloadEntity } from './entity/OfflineDownloadEntity';
import { PlaylistEntity } from './entity/PlaylistEntity';
import { SearchEntity } from './entity/SearchEntity';
import { SongEntity } from './entity/SongEntity';
import { StreamEntity } from './entity/StreamEntity';
import { VideoEntity } from './entity/VideoEntity';
export type * from './ListenfreeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ListenfreeEntityBase } from './ListenfreeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ListenfreeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ListeningRoom(entopts?: Record<string, any>): ListeningRoomEntity;
    Music(entopts?: Record<string, any>): MusicEntity;
    OfflineDownload(entopts?: Record<string, any>): OfflineDownloadEntity;
    Playlist(entopts?: Record<string, any>): PlaylistEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Song(entopts?: Record<string, any>): SongEntity;
    Stream(entopts?: Record<string, any>): StreamEntity;
    Video(entopts?: Record<string, any>): VideoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ListenfreeSDK;
    tester(testopts?: any, sdkopts?: any): ListenfreeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ListenfreeSDK;
export { stdutil, config, BaseFeature, ListenfreeEntityBase, ListenfreeSDK, SDK, };
