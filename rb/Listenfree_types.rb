# frozen_string_literal: true

# Typed models for the Listenfree SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ListeningRoom entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentSong
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] host
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] maxParticipants
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] participants
#   @return [Array, nil]
#
# @!attribute [rw] queue
#   @return [Array, nil]
ListeningRoom = Struct.new(
  :createdAt,
  :currentSong,
  :description,
  :host,
  :id,
  :isPublic,
  :maxParticipants,
  :name,
  :participants,
  :queue,
  keyword_init: true
)

# Request payload for ListeningRoom#load.
#
# @!attribute [rw] id
#   @return [String]
ListeningRoomLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ListeningRoom#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
ListeningRoomListMatch = Struct.new(
  :limit,
  keyword_init: true
)

# Request payload for ListeningRoom#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentSong
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] host
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] maxParticipants
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] participants
#   @return [Array, nil]
#
# @!attribute [rw] queue
#   @return [Array, nil]
ListeningRoomCreateData = Struct.new(
  :createdAt,
  :currentSong,
  :description,
  :host,
  :id,
  :isPublic,
  :maxParticipants,
  :name,
  :participants,
  :queue,
  keyword_init: true
)

# Music entity data model.
#
# @!attribute [rw] downloadedAt
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] progress
#   @return [Integer, nil]
#
# @!attribute [rw] song
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Music = Struct.new(
  :downloadedAt,
  :expiresAt,
  :id,
  :progress,
  :song,
  :status,
  keyword_init: true
)

# Request payload for Music#list.
#
# @!attribute [rw] downloadedAt
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] progress
#   @return [Integer, nil]
#
# @!attribute [rw] song
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
MusicListMatch = Struct.new(
  :downloadedAt,
  :expiresAt,
  :id,
  :progress,
  :song,
  :status,
  keyword_init: true
)

# OfflineDownload entity data model.
#
# @!attribute [rw] songId
#   @return [String]
OfflineDownload = Struct.new(
  :songId,
  keyword_init: true
)

# Request payload for OfflineDownload#create.
#
# @!attribute [rw] songId
#   @return [String]
OfflineDownloadCreateData = Struct.new(
  :songId,
  keyword_init: true
)

# Playlist entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] isSmart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smartCriteria
#   @return [Hash, nil]
#
# @!attribute [rw] songCount
#   @return [Integer, nil]
#
# @!attribute [rw] songId
#   @return [String]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
Playlist = Struct.new(
  :createdAt,
  :description,
  :id,
  :isPublic,
  :isSmart,
  :name,
  :owner,
  :smartCriteria,
  :songCount,
  :songId,
  :songs,
  :updatedAt,
  keyword_init: true
)

# Request payload for Playlist#load.
#
# @!attribute [rw] id
#   @return [String]
PlaylistLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Playlist#list.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] isSmart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smartCriteria
#   @return [Hash, nil]
#
# @!attribute [rw] songCount
#   @return [Integer, nil]
#
# @!attribute [rw] songId
#   @return [String, nil]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
PlaylistListMatch = Struct.new(
  :createdAt,
  :description,
  :id,
  :isPublic,
  :isSmart,
  :name,
  :owner,
  :smartCriteria,
  :songCount,
  :songId,
  :songs,
  :updatedAt,
  keyword_init: true
)

# Request payload for Playlist#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] isSmart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smartCriteria
#   @return [Hash, nil]
#
# @!attribute [rw] songCount
#   @return [Integer, nil]
#
# @!attribute [rw] songId
#   @return [String]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
PlaylistCreateData = Struct.new(
  :createdAt,
  :description,
  :id,
  :isPublic,
  :isSmart,
  :name,
  :owner,
  :smartCriteria,
  :songCount,
  :songId,
  :songs,
  :updatedAt,
  keyword_init: true
)

# Request payload for Playlist#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] isPublic
#   @return [Boolean, nil]
#
# @!attribute [rw] isSmart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smartCriteria
#   @return [Hash, nil]
#
# @!attribute [rw] songCount
#   @return [Integer, nil]
#
# @!attribute [rw] songId
#   @return [String, nil]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
PlaylistUpdateData = Struct.new(
  :id,
  :createdAt,
  :description,
  :isPublic,
  :isSmart,
  :name,
  :owner,
  :smartCriteria,
  :songCount,
  :songId,
  :songs,
  :updatedAt,
  keyword_init: true
)

# Request payload for Playlist#remove.
#
# @!attribute [rw] id
#   @return [String]
PlaylistRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] albums
#   @return [Array, nil]
#
# @!attribute [rw] artists
#   @return [Array, nil]
#
# @!attribute [rw] playlists
#   @return [Array, nil]
#
# @!attribute [rw] songs
#   @return [Array, nil]
Search = Struct.new(
  :albums,
  :artists,
  :playlists,
  :songs,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
SearchLoadMatch = Struct.new(
  :limit,
  :offset,
  :q,
  :type,
  keyword_init: true
)

# Song entity data model.
#
# @!attribute [rw] album
#   @return [String, nil]
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] coverArt
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] hasVideo
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Song = Struct.new(
  :album,
  :artist,
  :coverArt,
  :duration,
  :genres,
  :hasVideo,
  :id,
  :releaseDate,
  :title,
  keyword_init: true
)

# Request payload for Song#load.
#
# @!attribute [rw] id
#   @return [String]
SongLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Stream entity data model.
#
# @!attribute [rw] bitrate
#   @return [Integer, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [String, nil]
#
# @!attribute [rw] streamUrl
#   @return [String, nil]
Stream = Struct.new(
  :bitrate,
  :expiresAt,
  :quality,
  :streamUrl,
  keyword_init: true
)

# Request payload for Stream#load.
#
# @!attribute [rw] song_id
#   @return [String]
#
# @!attribute [rw] quality
#   @return [String, nil]
StreamLoadMatch = Struct.new(
  :song_id,
  :quality,
  keyword_init: true
)

# Video entity data model.
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] thumbnailUrl
#   @return [String, nil]
#
# @!attribute [rw] videoUrl
#   @return [String, nil]
Video = Struct.new(
  :duration,
  :thumbnailUrl,
  :videoUrl,
  keyword_init: true
)

# Request payload for Video#load.
#
# @!attribute [rw] song_id
#   @return [String]
VideoLoadMatch = Struct.new(
  :song_id,
  keyword_init: true
)

