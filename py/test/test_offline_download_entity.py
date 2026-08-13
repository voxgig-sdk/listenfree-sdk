# OfflineDownload entity test

import json
import os
import time

import pytest

from listenfree_sdk.utility.voxgig_struct import voxgig_struct as vs
from listenfree_sdk import ListenfreeSDK
from listenfree_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestOfflineDownloadEntity:

    def test_should_create_instance(self):
        testsdk = ListenfreeSDK.test(None, None)
        ent = testsdk.OfflineDownload(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _offline_download_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "offline_download." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        offline_download_ref01_ent = client.OfflineDownload(None)
        offline_download_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.offline_download"), "offline_download_ref01"))

        offline_download_ref01_data = helpers.to_map(runner.entity_data(offline_download_ref01_ent.create(offline_download_ref01_data, None)))
        assert offline_download_ref01_data is not None



def _offline_download_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/offline_download/OfflineDownloadTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ListenfreeSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["offline_download01", "offline_download02", "offline_download03"],
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
        "LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID": idmap,
        "LISTENFREE_TEST_LIVE": "FALSE",
        "LISTENFREE_TEST_EXPLAIN": "FALSE",
        "LISTENFREE_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID"))
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
