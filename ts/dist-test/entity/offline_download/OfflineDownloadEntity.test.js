"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OfflineDownloadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LISTENFREE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ListenfreeSDK.test();
        const ent = testsdk.OfflineDownload();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'offline_download.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "songId", "req": true, "short": "ID of the song to download", "type": "`$STRING`", "index$": 0 }], "name": "offline_download", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /offline/downloads", "json": "{\"operationId\":\"downloadSongOffline\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"songId\":{\"description\":\"ID of the song to download\",\"type\":\"string\"}},\"required\":[\"songId\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"downloadedAt\":{\"description\":\"Download completion timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"expiresAt\":{\"description\":\"Offline availability expiration\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Download ID\",\"type\":\"string\"},\"progress\":{\"description\":\"Download progress percentage\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"},\"song\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Download status\",\"enum\":[\"pending\",\"downloading\",\"completed\",\"failed\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Song queued for offline download\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Song not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/offline/downloads", "segments": [{ "lit": "offline" }, { "lit": "downloads" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.song`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "offline_download", "name__orig": "offline_download", "Name": "OfflineDownload", "name_": "offline_download", "name-": "offline-download", "NAME": "OFFLINE_DOWNLOAD", "index$": 2 }, { "active": true, "entity": "offline_download", "key$": "BasicOfflineDownloadFlow", "kind": "basic", "name": "BasicOfflineDownloadFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "offline_download_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'OfflineDownload');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const offline_download_ref01_ent = client.OfflineDownload();
        let offline_download_ref01_data = setup.data.new.offline_download['offline_download_ref01'];
        offline_download_ref01_data = (await offline_download_ref01_ent.create(offline_download_ref01_data)).data();
        (0, node_assert_1.default)(null != offline_download_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/offline_download/OfflineDownloadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ListenfreeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['offline_download01', 'offline_download02', 'offline_download03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID': idmap,
        'LISTENFREE_TEST_LIVE': 'FALSE',
        'LISTENFREE_TEST_EXPLAIN': 'FALSE',
        'LISTENFREE_APIKEY': '',
    });
    idmap = env['LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID'];
    const live = 'TRUE' === env.LISTENFREE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ListenfreeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LISTENFREE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LISTENFREE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OfflineDownloadEntity.test.js.map