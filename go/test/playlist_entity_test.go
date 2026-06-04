package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/listenfree-sdk/go"
	"github.com/voxgig-sdk/listenfree-sdk/go/core"

	vs "github.com/voxgig-sdk/listenfree-sdk/go/utility/struct"
)

func TestPlaylistEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Playlist(nil)
		if ent == nil {
			t.Fatal("expected non-nil PlaylistEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := playlistBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "playlist." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_PLAYLIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		playlistRef01Ent := client.Playlist(nil)
		playlistRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "playlist"}, setup.data), "playlist_ref01"))

		playlistRef01DataResult, err := playlistRef01Ent.Create(playlistRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		playlistRef01Data = core.ToMapAny(playlistRef01DataResult)
		if playlistRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if playlistRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		playlistRef01Match := map[string]any{}

		playlistRef01ListResult, err := playlistRef01Ent.List(playlistRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		playlistRef01List, playlistRef01ListOk := playlistRef01ListResult.([]any)
		if !playlistRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", playlistRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(playlistRef01List), map[string]any{"id": playlistRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		playlistRef01DataUp0Up := map[string]any{
			"id": playlistRef01Data["id"],
		}

		playlistRef01MarkdefUp0Name := "created_at"
		playlistRef01MarkdefUp0Value := fmt.Sprintf("Mark01-playlist_ref01_%d", setup.now)
		playlistRef01DataUp0Up[playlistRef01MarkdefUp0Name] = playlistRef01MarkdefUp0Value

		playlistRef01ResdataUp0Result, err := playlistRef01Ent.Update(playlistRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		playlistRef01ResdataUp0 := core.ToMapAny(playlistRef01ResdataUp0Result)
		if playlistRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if playlistRef01ResdataUp0["id"] != playlistRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if playlistRef01ResdataUp0[playlistRef01MarkdefUp0Name] != playlistRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", playlistRef01MarkdefUp0Name, playlistRef01ResdataUp0[playlistRef01MarkdefUp0Name])
		}

		// LOAD
		playlistRef01MatchDt0 := map[string]any{
			"id": playlistRef01Data["id"],
		}
		playlistRef01DataDt0Loaded, err := playlistRef01Ent.Load(playlistRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		playlistRef01DataDt0LoadResult := core.ToMapAny(playlistRef01DataDt0Loaded)
		if playlistRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if playlistRef01DataDt0LoadResult["id"] != playlistRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		playlistRef01MatchRm0 := map[string]any{
			"id": playlistRef01Data["id"],
		}
		_, err = playlistRef01Ent.Remove(playlistRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		playlistRef01MatchRt0 := map[string]any{}

		playlistRef01ListRt0Result, err := playlistRef01Ent.List(playlistRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		playlistRef01ListRt0, playlistRef01ListRt0Ok := playlistRef01ListRt0Result.([]any)
		if !playlistRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", playlistRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(playlistRef01ListRt0), map[string]any{"id": playlistRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func playlistBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "playlist", "PlaylistTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read playlist test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse playlist test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"playlist01", "playlist02", "playlist03"},
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
	entidEnvRaw := os.Getenv("LISTENFREE_TEST_PLAYLIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LISTENFREE_TEST_PLAYLIST_ENTID": idmap,
		"LISTENFREE_TEST_LIVE":      "FALSE",
		"LISTENFREE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["LISTENFREE_TEST_PLAYLIST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LISTENFREE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
