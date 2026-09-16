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
(0, node_test_1.describe)('StreamEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LISTENFREE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ListenfreeSDK.test();
        const ent = testsdk.Stream();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'stream.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "bitrate", "req": false, "short": "Audio bitrate in kbps", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "format": "date-time", "name": "expiresAt", "req": false, "short": "Expiration time of the stream URL", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "quality", "req": false, "short": "Audio quality", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "uri", "name": "streamUrl", "req": false, "short": "URL for streaming the song", "type": "`$STRING`", "index$": 3 }], "name": "stream", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "song_id", "orig": "song_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "high", "kind": "query", "name": "quality", "orig": "quality", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /songs/{songId}/stream", "json": "{\"operationId\":\"streamSong\",\"parameters\":[{\"description\":\"Unique identifier of the song\",\"in\":\"path\",\"name\":\"songId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Audio quality preference\",\"in\":\"query\",\"name\":\"quality\",\"required\":false,\"schema\":{\"default\":\"high\",\"enum\":[\"low\",\"medium\",\"high\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bitrate\":{\"description\":\"Audio bitrate in kbps\",\"type\":\"integer\"},\"expiresAt\":{\"description\":\"Expiration time of the stream URL\",\"format\":\"date-time\",\"type\":\"string\"},\"quality\":{\"description\":\"Audio quality\",\"enum\":[\"low\",\"medium\",\"high\"],\"type\":\"string\"},\"streamUrl\":{\"description\":\"URL for streaming the song\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Stream URL retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Song not found\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/songs/{songId}/stream", "rename": { "param": { "songId": "song_id" } }, "segments": [{ "lit": "songs" }, { "var": "song_id" }, { "lit": "stream" }], "select": { "exist": ["quality", "song_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["song"]] }, "key$": "stream", "name__orig": "stream", "Name": "Stream", "name_": "stream", "name-": "stream", "NAME": "STREAM", "index$": 6 }, { "active": true, "entity": "stream", "key$": "BasicStreamFlow", "kind": "basic", "name": "BasicStreamFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "stream_ref01", "srcdatavar": "stream_ref01_data", "suffix": "_dt0" }, "match": { "id": "stream01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-stream_ref01" } }], "index$": 0 }] }, 'Stream');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let stream_ref01_data = Object.values(setup.data.existing.stream)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const stream_ref01_ent = client.Stream();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/stream/StreamTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ListenfreeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['stream01', 'stream02', 'stream03', 'song01', 'song02', 'song03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LISTENFREE_TEST_STREAM_ENTID': idmap,
        'LISTENFREE_TEST_LIVE': 'FALSE',
        'LISTENFREE_TEST_EXPLAIN': 'FALSE',
        'LISTENFREE_APIKEY': '',
    });
    idmap = env['LISTENFREE_TEST_STREAM_ENTID'];
    const live = 'TRUE' === env.LISTENFREE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LISTENFREE_TEST_STREAM_ENTID'];
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
//# sourceMappingURL=StreamEntity.test.js.map