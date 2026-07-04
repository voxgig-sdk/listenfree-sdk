<?php
declare(strict_types=1);

// OfflineDownload entity test

require_once __DIR__ . '/../listenfree_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OfflineDownloadEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ListenfreeSDK::test(null, null);
        $ent = $testsdk->OfflineDownload(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = offline_download_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "offline_download." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $offline_download_ref01_ent = $client->OfflineDownload(null);
        $offline_download_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.offline_download"), "offline_download_ref01"));

        $offline_download_ref01_data_result = $offline_download_ref01_ent->create($offline_download_ref01_data, null);
        $offline_download_ref01_data = Helpers::to_map($offline_download_ref01_data_result);
        $this->assertNotNull($offline_download_ref01_data);

    }
}

function offline_download_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/offline_download/OfflineDownloadTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ListenfreeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["offline_download01", "offline_download02", "offline_download03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID" => $idmap,
        "LISTENFREE_TEST_LIVE" => "FALSE",
        "LISTENFREE_TEST_EXPLAIN" => "FALSE",
        "LISTENFREE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID"]);
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
