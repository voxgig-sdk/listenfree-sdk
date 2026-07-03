# Playlist entity test

require "minitest/autorun"
require "json"
require_relative "../Listenfree_sdk"
require_relative "runner"

class PlaylistEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ListenfreeSDK.test(nil, nil)
    ent = testsdk.Playlist(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = playlist_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "playlist." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_PLAYLIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    playlist_ref01_ent = client.Playlist(nil)
    playlist_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.playlist"), "playlist_ref01"))

    playlist_ref01_data_result, err = playlist_ref01_ent.create(playlist_ref01_data, nil)
    assert_nil err
    playlist_ref01_data = Helpers.to_map(playlist_ref01_data_result)
    assert !playlist_ref01_data.nil?
    assert !playlist_ref01_data["id"].nil?

    # LIST
    playlist_ref01_match = {}

    playlist_ref01_list_result, err = playlist_ref01_ent.list(playlist_ref01_match, nil)
    assert_nil err
    assert playlist_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(playlist_ref01_list_result),
      { "id" => playlist_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    playlist_ref01_data_up0_up = {
      "id" => playlist_ref01_data["id"],
    }

    playlist_ref01_markdef_up0_name = "created_at"
    playlist_ref01_markdef_up0_value = "Mark01-playlist_ref01_#{setup[:now]}"
    playlist_ref01_data_up0_up[playlist_ref01_markdef_up0_name] = playlist_ref01_markdef_up0_value

    playlist_ref01_resdata_up0_result, err = playlist_ref01_ent.update(playlist_ref01_data_up0_up, nil)
    assert_nil err
    playlist_ref01_resdata_up0 = Helpers.to_map(playlist_ref01_resdata_up0_result)
    assert !playlist_ref01_resdata_up0.nil?
    assert_equal playlist_ref01_resdata_up0["id"], playlist_ref01_data_up0_up["id"]
    assert_equal playlist_ref01_resdata_up0[playlist_ref01_markdef_up0_name], playlist_ref01_markdef_up0_value

    # LOAD
    playlist_ref01_match_dt0 = {
      "id" => playlist_ref01_data["id"],
    }
    playlist_ref01_data_dt0_loaded, err = playlist_ref01_ent.load(playlist_ref01_match_dt0, nil)
    assert_nil err
    playlist_ref01_data_dt0_load_result = Helpers.to_map(playlist_ref01_data_dt0_loaded)
    assert !playlist_ref01_data_dt0_load_result.nil?
    assert_equal playlist_ref01_data_dt0_load_result["id"], playlist_ref01_data["id"]

    # REMOVE
    playlist_ref01_match_rm0 = {
      "id" => playlist_ref01_data["id"],
    }
    _, err = playlist_ref01_ent.remove(playlist_ref01_match_rm0, nil)
    assert_nil err

    # LIST
    playlist_ref01_match_rt0 = {}

    playlist_ref01_list_rt0_result, err = playlist_ref01_ent.list(playlist_ref01_match_rt0, nil)
    assert_nil err
    assert playlist_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(playlist_ref01_list_rt0_result),
      { "id" => playlist_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def playlist_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "playlist", "PlaylistTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ListenfreeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["playlist01", "playlist02", "playlist03"],
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
  entid_env_raw = ENV["LISTENFREE_TEST_PLAYLIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LISTENFREE_TEST_PLAYLIST_ENTID" => idmap,
    "LISTENFREE_TEST_LIVE" => "FALSE",
    "LISTENFREE_TEST_EXPLAIN" => "FALSE",
    "LISTENFREE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LISTENFREE_TEST_PLAYLIST_ENTID"])
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
