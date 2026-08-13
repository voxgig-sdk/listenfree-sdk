// Typed models for the Listenfree SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ListeningRoom {
  createdAt?: string
  currentSong?: Record<string, any>
  description?: string
  host?: string
  id?: string
  isPublic?: boolean
  maxParticipants?: number
  name?: string
  participants?: any[]
  queue?: any[]
}

export interface ListeningRoomLoadMatch {
  id: string
}

export interface ListeningRoomListMatch {
  createdAt?: string
  currentSong?: Record<string, any>
  description?: string
  host?: string
  id?: string
  isPublic?: boolean
  maxParticipants?: number
  name?: string
  participants?: any[]
  queue?: any[]
}

export interface ListeningRoomCreateData {
  createdAt?: string
  currentSong?: Record<string, any>
  description?: string
  host?: string
  id?: string
  isPublic?: boolean
  maxParticipants?: number
  name?: string
  participants?: any[]
  queue?: any[]

  // Selects a custom action instead of the plain create:
  //   'join'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Music {
  downloadedAt?: string
  expiresAt?: string
  id?: string
  progress?: number
  song?: Record<string, any>
  status?: string
}

export interface MusicListMatch {
  downloadedAt?: string
  expiresAt?: string
  id?: string
  progress?: number
  song?: Record<string, any>
  status?: string
}

export interface OfflineDownload {
  songId: string
}

export interface OfflineDownloadCreateData {
  songId: string
}

export interface Playlist {
  createdAt?: string
  description?: string
  id?: string
  isPublic?: boolean
  isSmart?: boolean
  name?: string
  owner?: string
  smartCriteria?: Record<string, any>
  songCount?: number
  songId: string
  songs?: any[]
  updatedAt?: string
}

export interface PlaylistLoadMatch {
  id: string
}

export interface PlaylistListMatch {
  createdAt?: string
  description?: string
  id?: string
  isPublic?: boolean
  isSmart?: boolean
  name?: string
  owner?: string
  smartCriteria?: Record<string, any>
  songCount?: number
  songId?: string
  songs?: any[]
  updatedAt?: string
}

export interface PlaylistCreateData {
  createdAt?: string
  description?: string
  id?: string
  isPublic?: boolean
  isSmart?: boolean
  name?: string
  owner?: string
  smartCriteria?: Record<string, any>
  songCount?: number
  songId: string
  songs?: any[]
  updatedAt?: string

  // Selects a custom action instead of the plain create:
  //   'song'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PlaylistUpdateData {
  id: string
  createdAt?: string
  description?: string
  isPublic?: boolean
  isSmart?: boolean
  name?: string
  owner?: string
  smartCriteria?: Record<string, any>
  songCount?: number
  songId?: string
  songs?: any[]
  updatedAt?: string
}

export interface PlaylistRemoveMatch {
  id: string
}

export interface Search {
  albums?: any[]
  artists?: any[]
  playlists?: any[]
  songs?: any[]
}

export interface SearchLoadMatch {
  albums?: any[]
  artists?: any[]
  playlists?: any[]
  songs?: any[]
}

export interface Song {
  album?: string
  artist?: string
  coverArt?: string
  duration?: number
  genres?: any[]
  hasVideo?: boolean
  id?: string
  releaseDate?: string
  title?: string
}

export interface SongLoadMatch {
  id: string
}

export interface Stream {
  bitrate?: number
  expiresAt?: string
  quality?: string
  streamUrl?: string
}

export interface StreamLoadMatch {
  song_id: string
}

export interface Video {
  duration?: number
  thumbnailUrl?: string
  videoUrl?: string
}

export interface VideoLoadMatch {
  song_id: string
}

