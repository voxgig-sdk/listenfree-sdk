# Listenfree SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Listenfree_types'


class ListenfreeSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = ListenfreeUtility.new
    @_utility = utility

    config = ListenfreeConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = ListenfreeHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = ListenfreeHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, ListenfreeFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    ListenfreeUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = ListenfreeHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = ListenfreeHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = ListenfreeHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = ListenfreeSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue ListenfreeError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = ListenfreeHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = ListenfreeHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.listening_room.list / client.listening_room.load({ "id" => ... })
  def listening_room
    require_relative 'entity/listening_room_entity'
    @listening_room ||= ListeningRoomEntity.new(self, nil)
  end

  # Deprecated: use client.listening_room instead.
  def ListeningRoom(data = nil)
    require_relative 'entity/listening_room_entity'
    ListeningRoomEntity.new(self, data)
  end


  # Idiomatic facade: client.music.list / client.music.load({ "id" => ... })
  def music
    require_relative 'entity/music_entity'
    @music ||= MusicEntity.new(self, nil)
  end

  # Deprecated: use client.music instead.
  def Music(data = nil)
    require_relative 'entity/music_entity'
    MusicEntity.new(self, data)
  end


  # Idiomatic facade: client.offline_download.list / client.offline_download.load({ "id" => ... })
  def offline_download
    require_relative 'entity/offline_download_entity'
    @offline_download ||= OfflineDownloadEntity.new(self, nil)
  end

  # Deprecated: use client.offline_download instead.
  def OfflineDownload(data = nil)
    require_relative 'entity/offline_download_entity'
    OfflineDownloadEntity.new(self, data)
  end


  # Idiomatic facade: client.playlist.list / client.playlist.load({ "id" => ... })
  def playlist
    require_relative 'entity/playlist_entity'
    @playlist ||= PlaylistEntity.new(self, nil)
  end

  # Deprecated: use client.playlist instead.
  def Playlist(data = nil)
    require_relative 'entity/playlist_entity'
    PlaylistEntity.new(self, data)
  end


  # Idiomatic facade: client.search.list / client.search.load({ "id" => ... })
  def search
    require_relative 'entity/search_entity'
    @search ||= SearchEntity.new(self, nil)
  end

  # Deprecated: use client.search instead.
  def Search(data = nil)
    require_relative 'entity/search_entity'
    SearchEntity.new(self, data)
  end


  # Idiomatic facade: client.song.list / client.song.load({ "id" => ... })
  def song
    require_relative 'entity/song_entity'
    @song ||= SongEntity.new(self, nil)
  end

  # Deprecated: use client.song instead.
  def Song(data = nil)
    require_relative 'entity/song_entity'
    SongEntity.new(self, data)
  end


  # Idiomatic facade: client.stream.list / client.stream.load({ "id" => ... })
  def stream
    require_relative 'entity/stream_entity'
    @stream ||= StreamEntity.new(self, nil)
  end

  # Deprecated: use client.stream instead.
  def Stream(data = nil)
    require_relative 'entity/stream_entity'
    StreamEntity.new(self, data)
  end


  # Idiomatic facade: client.video.list / client.video.load({ "id" => ... })
  def video
    require_relative 'entity/video_entity'
    @video ||= VideoEntity.new(self, nil)
  end

  # Deprecated: use client.video instead.
  def Video(data = nil)
    require_relative 'entity/video_entity'
    VideoEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = ListenfreeSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
