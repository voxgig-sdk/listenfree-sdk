# OfflineDownload entity test

require "minitest/autorun"
require "json"
require_relative "../Listenfree_sdk"
require_relative "runner"

class OfflineDownloadEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ListenfreeSDK.test(nil, nil)
    ent = testsdk.OfflineDownload(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = offline_download_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "offline_download." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    offline_download_ref01_ent = client.OfflineDownload(nil)
    offline_download_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.offline_download"), "offline_download_ref01"))

    offline_download_ref01_data_result = offline_download_ref01_ent.create(offline_download_ref01_data, nil)
    offline_download_ref01_data = Helpers.to_map(offline_download_ref01_data_result.respond_to?(:data_get) ? offline_download_ref01_data_result.data_get : offline_download_ref01_data_result)
    assert !offline_download_ref01_data.nil?

  end
end

def offline_download_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "offline_download", "OfflineDownloadTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ListenfreeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["offline_download01", "offline_download02", "offline_download03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID" => idmap,
    "LISTENFREE_TEST_LIVE" => "FALSE",
    "LISTENFREE_TEST_EXPLAIN" => "FALSE",
    "LISTENFREE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LISTENFREE_TEST_OFFLINE_DOWNLOAD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LISTENFREE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LISTENFREE_APIKEY"],
      },
      extra || {},
    ])
    client = ListenfreeSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LISTENFREE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LISTENFREE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
