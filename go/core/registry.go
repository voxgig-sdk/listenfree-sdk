package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewListeningRoomEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewMusicEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewOfflineDownloadEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewPlaylistEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewSearchEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewSongEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewStreamEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

var NewVideoEntityFunc func(client *ListenfreeSDK, entopts map[string]any) ListenfreeEntity

