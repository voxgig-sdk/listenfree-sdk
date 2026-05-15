package = "voxgig-sdk-listenfree"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/listenfree-sdk.git"
}
description = {
  summary = "Listenfree SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["listenfree_sdk"] = "listenfree_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
