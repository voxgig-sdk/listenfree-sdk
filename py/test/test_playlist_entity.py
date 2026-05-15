# Playlist entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from listenfree_sdk import ListenfreeSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPlaylistEntity:

    def test_should_create_instance(self):
        testsdk = ListenfreeSDK.test(None, None)
        ent = testsdk.Playlist(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _playlist_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "playlist." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LISTENFREE_TEST_PLAYLIST_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        playlist_ref01_ent = client.Playlist(None)
        playlist_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.playlist"), "playlist_ref01"))

        playlist_ref01_data_result, err = playlist_ref01_ent.create(playlist_ref01_data, None)
        assert err is None
        playlist_ref01_data = helpers.to_map(playlist_ref01_data_result)
        assert playlist_ref01_data is not None
        assert playlist_ref01_data["id"] is not None

        # LIST
        playlist_ref01_match = {}

        playlist_ref01_list_result, err = playlist_ref01_ent.list(playlist_ref01_match, None)
        assert err is None
        assert isinstance(playlist_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(playlist_ref01_list_result),
            {"id": playlist_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        playlist_ref01_data_up0_up = {
            "id": playlist_ref01_data["id"],
        }

        playlist_ref01_markdef_up0_name = "created_at"
        playlist_ref01_markdef_up0_value = "Mark01-playlist_ref01_" + str(setup["now"])
        playlist_ref01_data_up0_up[playlist_ref01_markdef_up0_name] = playlist_ref01_markdef_up0_value

        playlist_ref01_resdata_up0_result, err = playlist_ref01_ent.update(playlist_ref01_data_up0_up, None)
        assert err is None
        playlist_ref01_resdata_up0 = helpers.to_map(playlist_ref01_resdata_up0_result)
        assert playlist_ref01_resdata_up0 is not None
        assert playlist_ref01_resdata_up0["id"] == playlist_ref01_data_up0_up["id"]
        assert playlist_ref01_resdata_up0[playlist_ref01_markdef_up0_name] == playlist_ref01_markdef_up0_value

        # LOAD
        playlist_ref01_match_dt0 = {
            "id": playlist_ref01_data["id"],
        }
        playlist_ref01_data_dt0_loaded, err = playlist_ref01_ent.load(playlist_ref01_match_dt0, None)
        assert err is None
        playlist_ref01_data_dt0_load_result = helpers.to_map(playlist_ref01_data_dt0_loaded)
        assert playlist_ref01_data_dt0_load_result is not None
        assert playlist_ref01_data_dt0_load_result["id"] == playlist_ref01_data["id"]

        # REMOVE
        playlist_ref01_match_rm0 = {
            "id": playlist_ref01_data["id"],
        }
        _, err = playlist_ref01_ent.remove(playlist_ref01_match_rm0, None)
        assert err is None

        # LIST
        playlist_ref01_match_rt0 = {}

        playlist_ref01_list_rt0_result, err = playlist_ref01_ent.list(playlist_ref01_match_rt0, None)
        assert err is None
        assert isinstance(playlist_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(playlist_ref01_list_rt0_result),
            {"id": playlist_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _playlist_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/playlist/PlaylistTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ListenfreeSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["playlist01", "playlist02", "playlist03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LISTENFREE_TEST_PLAYLIST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LISTENFREE_TEST_PLAYLIST_ENTID": idmap,
        "LISTENFREE_TEST_LIVE": "FALSE",
        "LISTENFREE_TEST_EXPLAIN": "FALSE",
        "LISTENFREE_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LISTENFREE_TEST_PLAYLIST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LISTENFREE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("LISTENFREE_APIKEY"),
            },
            extra or {},
        ])
        client = ListenfreeSDK(helpers.to_map(merged_opts))

    _live = env.get("LISTENFREE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LISTENFREE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
