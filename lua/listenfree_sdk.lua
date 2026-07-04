-- Listenfree SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ListenfreeSDK = {}
ListenfreeSDK.__index = ListenfreeSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ListenfreeSDK._make_feature = _make_feature


function ListenfreeSDK.new(options)
  local self = setmetatable({}, ListenfreeSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function ListenfreeSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ListenfreeSDK:get_utility()
  return Utility.copy(self._utility)
end


function ListenfreeSDK:get_root_ctx()
  return self._rootctx
end


function ListenfreeSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function ListenfreeSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:listening_room():list() / client:listening_room():load({ id = ... })
function ListenfreeSDK:listening_room(data)
  local EntityMod = require("entity.listening_room_entity")
  if data == nil then
    if self._listening_room == nil then
      self._listening_room = EntityMod.new(self, nil)
    end
    return self._listening_room
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:listening_room() instead.
function ListenfreeSDK:ListeningRoom(data)
  local EntityMod = require("entity.listening_room_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:music():list() / client:music():load({ id = ... })
function ListenfreeSDK:music(data)
  local EntityMod = require("entity.music_entity")
  if data == nil then
    if self._music == nil then
      self._music = EntityMod.new(self, nil)
    end
    return self._music
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:music() instead.
function ListenfreeSDK:Music(data)
  local EntityMod = require("entity.music_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:offline_download():list() / client:offline_download():load({ id = ... })
function ListenfreeSDK:offline_download(data)
  local EntityMod = require("entity.offline_download_entity")
  if data == nil then
    if self._offline_download == nil then
      self._offline_download = EntityMod.new(self, nil)
    end
    return self._offline_download
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:offline_download() instead.
function ListenfreeSDK:OfflineDownload(data)
  local EntityMod = require("entity.offline_download_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:playlist():list() / client:playlist():load({ id = ... })
function ListenfreeSDK:playlist(data)
  local EntityMod = require("entity.playlist_entity")
  if data == nil then
    if self._playlist == nil then
      self._playlist = EntityMod.new(self, nil)
    end
    return self._playlist
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:playlist() instead.
function ListenfreeSDK:Playlist(data)
  local EntityMod = require("entity.playlist_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:search():list() / client:search():load({ id = ... })
function ListenfreeSDK:search(data)
  local EntityMod = require("entity.search_entity")
  if data == nil then
    if self._search == nil then
      self._search = EntityMod.new(self, nil)
    end
    return self._search
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:search() instead.
function ListenfreeSDK:Search(data)
  local EntityMod = require("entity.search_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:song():list() / client:song():load({ id = ... })
function ListenfreeSDK:song(data)
  local EntityMod = require("entity.song_entity")
  if data == nil then
    if self._song == nil then
      self._song = EntityMod.new(self, nil)
    end
    return self._song
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:song() instead.
function ListenfreeSDK:Song(data)
  local EntityMod = require("entity.song_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:stream():list() / client:stream():load({ id = ... })
function ListenfreeSDK:stream(data)
  local EntityMod = require("entity.stream_entity")
  if data == nil then
    if self._stream == nil then
      self._stream = EntityMod.new(self, nil)
    end
    return self._stream
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:stream() instead.
function ListenfreeSDK:Stream(data)
  local EntityMod = require("entity.stream_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:video():list() / client:video():load({ id = ... })
function ListenfreeSDK:video(data)
  local EntityMod = require("entity.video_entity")
  if data == nil then
    if self._video == nil then
      self._video = EntityMod.new(self, nil)
    end
    return self._video
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:video() instead.
function ListenfreeSDK:Video(data)
  local EntityMod = require("entity.video_entity")
  return EntityMod.new(self, data)
end




function ListenfreeSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ListenfreeSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ListenfreeSDK
