# ListeningRoom entity test

require "minitest/autorun"
require "json"
require_relative "../Listenfree_sdk"
require_relative "runner"

class ListeningRoomEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ListenfreeSDK.test(nil, nil)
    ent = testsdk.ListeningRoom(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "listening_room" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ListenfreeSDK.test(seed, nil)
    seen = base.ListeningRoom(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ListenfreeConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ListenfreeSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.ListeningRoom(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = listening_room_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "listening_room." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_LISTENING_ROOM_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    listening_room_ref01_ent = client.ListeningRoom(nil)
    listening_room_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.listening_room"), "listening_room_ref01"))

    listening_room_ref01_data_result = listening_room_ref01_ent.create(listening_room_ref01_data, nil)
    listening_room_ref01_data = Helpers.to_map(listening_room_ref01_data_result.respond_to?(:data_get) ? listening_room_ref01_data_result.data_get : listening_room_ref01_data_result)
    assert !listening_room_ref01_data.nil?
    assert !listening_room_ref01_data["id"].nil?

    # LIST
    listening_room_ref01_match = {}

    listening_room_ref01_list_result = listening_room_ref01_ent.list(listening_room_ref01_match, nil)
    assert listening_room_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(listening_room_ref01_list_result),
      { "id" => listening_room_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    listening_room_ref01_match_dt0 = {
      "id" => listening_room_ref01_data["id"],
    }
    listening_room_ref01_data_dt0_loaded = listening_room_ref01_ent.load(listening_room_ref01_match_dt0, nil)
    listening_room_ref01_data_dt0_load_result = Helpers.to_map(listening_room_ref01_data_dt0_loaded.respond_to?(:data_get) ? listening_room_ref01_data_dt0_loaded.data_get : listening_room_ref01_data_dt0_loaded)
    assert !listening_room_ref01_data_dt0_load_result.nil?
    assert_equal listening_room_ref01_data_dt0_load_result["id"], listening_room_ref01_data["id"]

  end
end

def listening_room_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "listening_room", "ListeningRoomTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ListenfreeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["listening_room01", "listening_room02", "listening_room03"],
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
  entid_env_raw = ENV["LISTENFREE_TEST_LISTENING_ROOM_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LISTENFREE_TEST_LISTENING_ROOM_ENTID" => idmap,
    "LISTENFREE_TEST_LIVE" => "FALSE",
    "LISTENFREE_TEST_EXPLAIN" => "FALSE",
    "LISTENFREE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LISTENFREE_TEST_LISTENING_ROOM_ENTID"])
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
