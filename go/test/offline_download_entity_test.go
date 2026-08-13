package sdktest

import (
	"encoding/json"
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

func TestOfflineDownloadEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OfflineDownload(nil)
		if ent == nil {
			t.Fatal("expected non-nil OfflineDownloadEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := offline_downloadBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "offline_download." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		offlineDownloadRef01Ent := client.OfflineDownload(nil)
		offlineDownloadRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "offline_download"}, setup.data), "offline_download_ref01"))

		offlineDownloadRef01DataResult, err := offlineDownloadRef01Ent.Create(offlineDownloadRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		offlineDownloadRef01Data = core.ToMapAny(entityData(offlineDownloadRef01DataResult))
		if offlineDownloadRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func offline_downloadBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "offline_download", "OfflineDownloadTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read offline_download test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse offline_download test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"offline_download01", "offline_download02", "offline_download03"},
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
	entidEnvRaw := os.Getenv("LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID": idmap,
		"LISTENFREE_TEST_LIVE":      "FALSE",
		"LISTENFREE_TEST_EXPLAIN":   "FALSE",
		"LISTENFREE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID"])
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
