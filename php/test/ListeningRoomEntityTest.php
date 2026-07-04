<?php
declare(strict_types=1);

// ListeningRoom entity test

require_once __DIR__ . '/../listenfree_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ListeningRoomEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ListenfreeSDK::test(null, null);
        $ent = $testsdk->ListeningRoom(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = listening_room_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "listening_room." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_LISTENING_ROOM_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $listening_room_ref01_ent = $client->ListeningRoom(null);
        $listening_room_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.listening_room"), "listening_room_ref01"));

        $listening_room_ref01_data_result = $listening_room_ref01_ent->create($listening_room_ref01_data, null);
        $listening_room_ref01_data = Helpers::to_map($listening_room_ref01_data_result);
        $this->assertNotNull($listening_room_ref01_data);
        $this->assertNotNull($listening_room_ref01_data["id"]);

        // LIST
        $listening_room_ref01_match = [];

        $listening_room_ref01_list_result = $listening_room_ref01_ent->list($listening_room_ref01_match, null);
        $this->assertIsArray($listening_room_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($listening_room_ref01_list_result),
            ["id" => $listening_room_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $listening_room_ref01_match_dt0 = [
            "id" => $listening_room_ref01_data["id"],
        ];
        $listening_room_ref01_data_dt0_loaded = $listening_room_ref01_ent->load($listening_room_ref01_match_dt0, null);
        $listening_room_ref01_data_dt0_load_result = Helpers::to_map($listening_room_ref01_data_dt0_loaded);
        $this->assertNotNull($listening_room_ref01_data_dt0_load_result);
        $this->assertEquals($listening_room_ref01_data_dt0_load_result["id"], $listening_room_ref01_data["id"]);

    }
}

function listening_room_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/listening_room/ListeningRoomTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ListenfreeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["listening_room01", "listening_room02", "listening_room03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LISTENFREE_TEST_LISTENING_ROOM_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LISTENFREE_TEST_LISTENING_ROOM_ENTID" => $idmap,
        "LISTENFREE_TEST_LIVE" => "FALSE",
        "LISTENFREE_TEST_EXPLAIN" => "FALSE",
        "LISTENFREE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LISTENFREE_TEST_LISTENING_ROOM_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LISTENFREE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LISTENFREE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ListenfreeSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LISTENFREE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LISTENFREE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
