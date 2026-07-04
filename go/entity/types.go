// Typed models for the Listenfree SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// ListeningRoom is the typed data model for the listening_room entity.
type ListeningRoom struct {
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentSong *map[string]any `json:"current_song,omitempty"`
	Description *string `json:"description,omitempty"`
	Host *string `json:"host,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"is_public,omitempty"`
	MaxParticipant *int `json:"max_participant,omitempty"`
	Name *string `json:"name,omitempty"`
	Participant *[]any `json:"participant,omitempty"`
	Queue *[]any `json:"queue,omitempty"`
}

// ListeningRoomLoadMatch is the typed request payload for ListeningRoom.LoadTyped.
type ListeningRoomLoadMatch struct {
	Id string `json:"id"`
}

// ListeningRoomListMatch mirrors the listening_room fields as an all-optional match
// filter (Go analog of Partial<ListeningRoom>).
type ListeningRoomListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	CurrentSong *map[string]any `json:"current_song,omitempty"`
	Description *string `json:"description,omitempty"`
	Host *string `json:"host,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"is_public,omitempty"`
	MaxParticipant *int `json:"max_participant,omitempty"`
	Name *string `json:"name,omitempty"`
	Participant *[]any `json:"participant,omitempty"`
	Queue *[]any `json:"queue,omitempty"`
}

// ListeningRoomCreateData is the typed request payload for ListeningRoom.CreateTyped.
type ListeningRoomCreateData struct {
	Id string `json:"id"`
}

// Music is the typed data model for the music entity.
type Music struct {
	DownloadedAt *string `json:"downloaded_at,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Progress *int `json:"progress,omitempty"`
	Song *map[string]any `json:"song,omitempty"`
	Status *string `json:"status,omitempty"`
}

// MusicListMatch mirrors the music fields as an all-optional match
// filter (Go analog of Partial<Music>).
type MusicListMatch struct {
	DownloadedAt *string `json:"downloaded_at,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Progress *int `json:"progress,omitempty"`
	Song *map[string]any `json:"song,omitempty"`
	Status *string `json:"status,omitempty"`
}

// OfflineDownload is the typed data model for the offline_download entity.
type OfflineDownload struct {
	SongId string `json:"song_id"`
}

// OfflineDownloadCreateData mirrors the offline_download fields as an all-optional match
// filter (Go analog of Partial<OfflineDownload>).
type OfflineDownloadCreateData struct {
	SongId *string `json:"song_id,omitempty"`
}

// Playlist is the typed data model for the playlist entity.
type Playlist struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"is_public,omitempty"`
	IsSmart *bool `json:"is_smart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriterion *map[string]any `json:"smart_criterion,omitempty"`
	Song *[]any `json:"song,omitempty"`
	SongCount *int `json:"song_count,omitempty"`
	SongId string `json:"song_id"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// PlaylistLoadMatch is the typed request payload for Playlist.LoadTyped.
type PlaylistLoadMatch struct {
	Id string `json:"id"`
}

// PlaylistListMatch mirrors the playlist fields as an all-optional match
// filter (Go analog of Partial<Playlist>).
type PlaylistListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	IsPublic *bool `json:"is_public,omitempty"`
	IsSmart *bool `json:"is_smart,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SmartCriterion *map[string]any `json:"smart_criterion,omitempty"`
	Song *[]any `json:"song,omitempty"`
	SongCount *int `json:"song_count,omitempty"`
	SongId *string `json:"song_id,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// PlaylistCreateData is the typed request payload for Playlist.CreateTyped.
type PlaylistCreateData struct {
	Id string `json:"id"`
}

// PlaylistUpdateData is the typed request payload for Playlist.UpdateTyped.
type PlaylistUpdateData struct {
	Id string `json:"id"`
}

// PlaylistRemoveMatch is the typed request payload for Playlist.RemoveTyped.
type PlaylistRemoveMatch struct {
	Id string `json:"id"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Total *int `json:"total,omitempty"`
}

// SearchLoadMatch mirrors the search fields as an all-optional match
// filter (Go analog of Partial<Search>).
type SearchLoadMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Total *int `json:"total,omitempty"`
}

// Song is the typed data model for the song entity.
type Song struct {
	Album *string `json:"album,omitempty"`
	Artist *string `json:"artist,omitempty"`
	CoverArt *string `json:"cover_art,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	HasVideo *bool `json:"has_video,omitempty"`
	Id *string `json:"id,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Title *string `json:"title,omitempty"`
}

// SongLoadMatch is the typed request payload for Song.LoadTyped.
type SongLoadMatch struct {
	Id string `json:"id"`
}

// Stream is the typed data model for the stream entity.
type Stream struct {
	Bitrate *int `json:"bitrate,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Quality *string `json:"quality,omitempty"`
	StreamUrl *string `json:"stream_url,omitempty"`
}

// StreamLoadMatch is the typed request payload for Stream.LoadTyped.
type StreamLoadMatch struct {
	SongId string `json:"song_id"`
}

// Video is the typed data model for the video entity.
type Video struct {
	Duration *int `json:"duration,omitempty"`
	ThumbnailUrl *string `json:"thumbnail_url,omitempty"`
	VideoUrl *string `json:"video_url,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
