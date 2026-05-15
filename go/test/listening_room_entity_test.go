package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/listenfree-sdk"
	"github.com/voxgig-sdk/listenfree-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestListeningRoomEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ListeningRoom(nil)
		if ent == nil {
			t.Fatal("expected non-nil ListeningRoomEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := listening_roomBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "listening_room." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_LISTENING_ROOM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		listeningRoomRef01Ent := client.ListeningRoom(nil)
		listeningRoomRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "listening_room"}, setup.data), "listening_room_ref01"))

		listeningRoomRef01DataResult, err := listeningRoomRef01Ent.Create(listeningRoomRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		listeningRoomRef01Data = core.ToMapAny(listeningRoomRef01DataResult)
		if listeningRoomRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if listeningRoomRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		listeningRoomRef01Match := map[string]any{}

		listeningRoomRef01ListResult, err := listeningRoomRef01Ent.List(listeningRoomRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		listeningRoomRef01List, listeningRoomRef01ListOk := listeningRoomRef01ListResult.([]any)
		if !listeningRoomRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", listeningRoomRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(listeningRoomRef01List), map[string]any{"id": listeningRoomRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		listeningRoomRef01MatchDt0 := map[string]any{
			"id": listeningRoomRef01Data["id"],
		}
		listeningRoomRef01DataDt0Loaded, err := listeningRoomRef01Ent.Load(listeningRoomRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		listeningRoomRef01DataDt0LoadResult := core.ToMapAny(listeningRoomRef01DataDt0Loaded)
		if listeningRoomRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if listeningRoomRef01DataDt0LoadResult["id"] != listeningRoomRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func listening_roomBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "listening_room", "ListeningRoomTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read listening_room test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse listening_room test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"listening_room01", "listening_room02", "listening_room03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LISTENFREE_TEST_LISTENING_ROOM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LISTENFREE_TEST_LISTENING_ROOM_ENTID": idmap,
		"LISTENFREE_TEST_LIVE":      "FALSE",
		"LISTENFREE_TEST_EXPLAIN":   "FALSE",
		"LISTENFREE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LISTENFREE_TEST_LISTENING_ROOM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LISTENFREE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LISTENFREE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewListenfreeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LISTENFREE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LISTENFREE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
