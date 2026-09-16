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
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LISTENFREE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ListenfreeSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "albums", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "artists", "req": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "playlists", "req": false, "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "songs", "req": false, "type": "`$ARRAY`", "index$": 3 }], "name": "search", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "imagine dragons", "kind": "query", "name": "q", "orig": "q", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "all", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /search", "json": "{\"operationId\":\"searchMusic\",\"parameters\":[{\"description\":\"Search query string\",\"example\":\"imagine dragons\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"minLength\":1,\"type\":\"string\"}},{\"description\":\"Type of content to search for\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"default\":\"all\",\"enum\":[\"song\",\"artist\",\"album\",\"playlist\",\"all\"],\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"limit\":{\"description\":\"Results per page\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset\",\"type\":\"integer\"},\"results\":{\"properties\":{\"albums\":{\"items\":{\"properties\":{\"artist\":{\"type\":\"string\"},\"coverArt\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"artists\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"image\":{\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"playlists\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"total\":{\"description\":\"Total number of results\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful search results\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/search", "segments": [{ "lit": "search" }], "select": { "exist": ["limit", "offset", "q", "type"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 4 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "search_ref01", "srcdatavar": "search_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-search_ref01" } }], "index$": 0 }] }, 'Search');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LOAD
        const search_ref01_ent = client.Search();
        const search_ref01_match_dt0 = {};
        const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != search_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ListenfreeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LISTENFREE_TEST_SEARCH_ENTID': idmap,
        'LISTENFREE_TEST_LIVE': 'FALSE',
        'LISTENFREE_TEST_EXPLAIN': 'FALSE',
        'LISTENFREE_APIKEY': '',
    });
    idmap = env['LISTENFREE_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.LISTENFREE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LISTENFREE_TEST_SEARCH_ENTID'];
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
//# sourceMappingURL=SearchEntity.test.js.map