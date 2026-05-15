package voxgiglistenfreesdk

import (
	"github.com/voxgig-sdk/listenfree-sdk/core"
	"github.com/voxgig-sdk/listenfree-sdk/entity"
	"github.com/voxgig-sdk/listenfree-sdk/feature"
	_ "github.com/voxgig-sdk/listenfree-sdk/utility"
)

// Type aliases preserve external API.
type ListenfreeSDK = core.ListenfreeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ListenfreeEntity = core.ListenfreeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ListenfreeError = core.ListenfreeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewListeningRoomEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewListeningRoomEntity(client, entopts)
	}
	core.NewMusicEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewMusicEntity(client, entopts)
	}
	core.NewOfflineDownloadEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewOfflineDownloadEntity(client, entopts)
	}
	core.NewPlaylistEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewPlaylistEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewSongEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewSongEntity(client, entopts)
	}
	core.NewStreamEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewStreamEntity(client, entopts)
	}
	core.NewVideoEntityFunc = func(client *core.ListenfreeSDK, entopts map[string]any) core.ListenfreeEntity {
		return entity.NewVideoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewListenfreeSDK = core.NewListenfreeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
