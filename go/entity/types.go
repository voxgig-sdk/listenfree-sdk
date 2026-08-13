// Typed models for the Listenfree SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/listenfree-sdk/go/core"
)

// ListeningRoom is the typed data model for the listening_room entity.
type ListeningRoom struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	CurrentSong *map[string]any `json:"currentSong,omitempty"`
	Description *string `json:"description,omitempty"`
	Host *string `json:"host,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	MaxParticipants *int `json:"maxParticipants,omitempty"`
	Name *string `json:"name,omitempty"`
	Participants *[]any `json:"participants,omitempty"`
	Queue *[]any `json:"queue,omitempty"`
}

// ListeningRoomLoadMatch is the typed request payload for ListeningRoom.LoadTyped.
type ListeningRoomLoadMatch struct {
	Id string `json:"id"`
}

// ListeningRoomListMatch is the typed request payload for ListeningRoom.ListTyped.
type ListeningRoomListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	CurrentSong *map[string]any `json:"currentSong,omitempty"`
	Description *string `json:"description,omitempty"`
	Host *string `json:"host,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	MaxParticipants *int `json:"maxParticipants,omitempty"`
	Name *string `json:"name,omitempty"`
	Participants *[]any `json:"participants,omitempty"`
	Queue *[]any `json:"queue,omitempty"`
}

// ListeningRoomCreateData is the typed request payload for ListeningRoom.CreateTyped.
type ListeningRoomCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	CurrentSong *map[string]any `json:"currentSong,omitempty"`
	Description *string `json:"description,omitempty"`
	Host *string `json:"host,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	MaxParticipants *int `json:"maxParticipants,omitempty"`
	Name *string `json:"name,omitempty"`
	Participants *[]any `json:"participants,omitempty"`
	Queue *[]any `json:"queue,omitempty"`
}

// Music is the typed data model for the music entity.
type Music struct {
	DownloadedAt *string `json:"downloadedAt,omitempty"`
	ExpiresAt *string `json:"expiresAt,omitempty"`
	Id *string `json:"id,omitempty"`
	Progress *int `json:"progress,omitempty"`
	Song *map[string]any `json:"song,omitempty"`
	Status *string `json:"status,omitempty"`
}

// MusicListMatch is the typed request payload for Music.ListTyped.
type MusicListMatch struct {
	DownloadedAt *string `json:"downloadedAt,omitempty"`
	ExpiresAt *string `json:"expiresAt,omitempty"`
	Id *string `json:"id,omitempty"`
	Progress *int `json:"progress,omitempty"`
	Song *map[string]any `json:"song,omitempty"`
	Status *string `json:"status,omitempty"`
}

// OfflineDownload is the typed data model for the offline_download entity.
type OfflineDownload struct {
	SongId string `json:"songId"`
}

// OfflineDownloadCreateData is the typed request payload for OfflineDownload.CreateTyped.
type OfflineDownloadCreateData struct {
	SongId string `json:"songId"`
}

// Playlist is the typed data model for the playlist entity.
type Playlist struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	IsSmart *bool `json:"isSmart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriteria *map[string]any `json:"smartCriteria,omitempty"`
	SongCount *int `json:"songCount,omitempty"`
	SongId string `json:"songId"`
	Songs *[]any `json:"songs,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// PlaylistLoadMatch is the typed request payload for Playlist.LoadTyped.
type PlaylistLoadMatch struct {
	Id string `json:"id"`
}

// PlaylistListMatch is the typed request payload for Playlist.ListTyped.
type PlaylistListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	IsSmart *bool `json:"isSmart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriteria *map[string]any `json:"smartCriteria,omitempty"`
	SongCount *int `json:"songCount,omitempty"`
	SongId *string `json:"songId,omitempty"`
	Songs *[]any `json:"songs,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// PlaylistCreateData is the typed request payload for Playlist.CreateTyped.
type PlaylistCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	IsSmart *bool `json:"isSmart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriteria *map[string]any `json:"smartCriteria,omitempty"`
	SongCount *int `json:"songCount,omitempty"`
	SongId string `json:"songId"`
	Songs *[]any `json:"songs,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// PlaylistUpdateData is the typed request payload for Playlist.UpdateTyped.
type PlaylistUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	IsPublic *bool `json:"isPublic,omitempty"`
	IsSmart *bool `json:"isSmart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriteria *map[string]any `json:"smartCriteria,omitempty"`
	SongCount *int `json:"songCount,omitempty"`
	SongId *string `json:"songId,omitempty"`
	Songs *[]any `json:"songs,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// PlaylistRemoveMatch is the typed request payload for Playlist.RemoveTyped.
type PlaylistRemoveMatch struct {
	Id string `json:"id"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Albums *[]any `json:"albums,omitempty"`
	Artists *[]any `json:"artists,omitempty"`
	Playlists *[]any `json:"playlists,omitempty"`
	Songs *[]any `json:"songs,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Albums *[]any `json:"albums,omitempty"`
	Artists *[]any `json:"artists,omitempty"`
	Playlists *[]any `json:"playlists,omitempty"`
	Songs *[]any `json:"songs,omitempty"`
}

// Song is the typed data model for the song entity.
type Song struct {
	Album *string `json:"album,omitempty"`
	Artist *string `json:"artist,omitempty"`
	CoverArt *string `json:"coverArt,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Genres *[]any `json:"genres,omitempty"`
	HasVideo *bool `json:"hasVideo,omitempty"`
	Id *string `json:"id,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Title *string `json:"title,omitempty"`
}

// SongLoadMatch is the typed request payload for Song.LoadTyped.
type SongLoadMatch struct {
	Id string `json:"id"`
}

// Stream is the typed data model for the stream entity.
type Stream struct {
	Bitrate *int `json:"bitrate,omitempty"`
	ExpiresAt *string `json:"expiresAt,omitempty"`
	Quality *string `json:"quality,omitempty"`
	StreamUrl *string `json:"streamUrl,omitempty"`
}

// StreamLoadMatch is the typed request payload for Stream.LoadTyped.
type StreamLoadMatch struct {
	SongId string `json:"song_id"`
}

// Video is the typed data model for the video entity.
type Video struct {
	Duration *int `json:"duration,omitempty"`
	ThumbnailUrl *string `json:"thumbnailUrl,omitempty"`
	VideoUrl *string `json:"videoUrl,omitempty"`
}

// VideoLoadMatch is the typed request payload for Video.LoadTyped.
type VideoLoadMatch struct {
	SongId string `json:"song_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
