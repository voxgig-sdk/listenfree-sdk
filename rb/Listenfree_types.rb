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
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] current_song
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
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] max_participant
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] participant
#   @return [Array, nil]
#
# @!attribute [rw] queue
#   @return [Array, nil]
ListeningRoom = Struct.new(
  :created_at,
  :current_song,
  :description,
  :host,
  :id,
  :is_public,
  :max_participant,
  :name,
  :participant,
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
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] current_song
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
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] max_participant
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] participant
#   @return [Array, nil]
#
# @!attribute [rw] queue
#   @return [Array, nil]
ListeningRoomListMatch = Struct.new(
  :created_at,
  :current_song,
  :description,
  :host,
  :id,
  :is_public,
  :max_participant,
  :name,
  :participant,
  :queue,
  keyword_init: true
)

# Request payload for ListeningRoom#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] current_song
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
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] max_participant
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] participant
#   @return [Array, nil]
#
# @!attribute [rw] queue
#   @return [Array, nil]
ListeningRoomCreateData = Struct.new(
  :created_at,
  :current_song,
  :description,
  :host,
  :id,
  :is_public,
  :max_participant,
  :name,
  :participant,
  :queue,
  keyword_init: true
)

# Music entity data model.
#
# @!attribute [rw] downloaded_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
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
  :downloaded_at,
  :expires_at,
  :id,
  :progress,
  :song,
  :status,
  keyword_init: true
)

# Request payload for Music#list.
#
# @!attribute [rw] downloaded_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
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
  :downloaded_at,
  :expires_at,
  :id,
  :progress,
  :song,
  :status,
  keyword_init: true
)

# OfflineDownload entity data model.
#
# @!attribute [rw] song_id
#   @return [String]
OfflineDownload = Struct.new(
  :song_id,
  keyword_init: true
)

# Request payload for OfflineDownload#create.
#
# @!attribute [rw] song_id
#   @return [String]
OfflineDownloadCreateData = Struct.new(
  :song_id,
  keyword_init: true
)

# Playlist entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] is_smart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smart_criterion
#   @return [Hash, nil]
#
# @!attribute [rw] song
#   @return [Array, nil]
#
# @!attribute [rw] song_count
#   @return [Integer, nil]
#
# @!attribute [rw] song_id
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Playlist = Struct.new(
  :created_at,
  :description,
  :id,
  :is_public,
  :is_smart,
  :name,
  :owner,
  :smart_criterion,
  :song,
  :song_count,
  :song_id,
  :updated_at,
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
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] is_smart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smart_criterion
#   @return [Hash, nil]
#
# @!attribute [rw] song
#   @return [Array, nil]
#
# @!attribute [rw] song_count
#   @return [Integer, nil]
#
# @!attribute [rw] song_id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
PlaylistListMatch = Struct.new(
  :created_at,
  :description,
  :id,
  :is_public,
  :is_smart,
  :name,
  :owner,
  :smart_criterion,
  :song,
  :song_count,
  :song_id,
  :updated_at,
  keyword_init: true
)

# Request payload for Playlist#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_public
#   @return [Boolean, nil]
#
# @!attribute [rw] is_smart
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] smart_criterion
#   @return [Hash, nil]
#
# @!attribute [rw] song
#   @return [Array, nil]
#
# @!attribute [rw] song_count
#   @return [Integer, nil]
#
# @!attribute [rw] song_id
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
PlaylistCreateData = Struct.new(
  :created_at,
  :description,
  :id,
  :is_public,
  :is_smart,
  :name,
  :owner,
  :smart_criterion,
  :song,
  :song_count,
  :song_id,
  :updated_at,
  keyword_init: true
)

# Request payload for Playlist#update.
#
# @!attribute [rw] id
#   @return [String]
PlaylistUpdateData = Struct.new(
  :id,
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
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
Search = Struct.new(
  :limit,
  :offset,
  :result,
  :total,
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
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
SearchLoadMatch = Struct.new(
  :limit,
  :offset,
  :result,
  :total,
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
# @!attribute [rw] cover_art
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] has_video
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Song = Struct.new(
  :album,
  :artist,
  :cover_art,
  :duration,
  :genre,
  :has_video,
  :id,
  :release_date,
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
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [String, nil]
#
# @!attribute [rw] stream_url
#   @return [String, nil]
Stream = Struct.new(
  :bitrate,
  :expires_at,
  :quality,
  :stream_url,
  keyword_init: true
)

# Request payload for Stream#load.
#
# @!attribute [rw] song_id
#   @return [String]
StreamLoadMatch = Struct.new(
  :song_id,
  keyword_init: true
)

# Video entity data model.
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] thumbnail_url
#   @return [String, nil]
#
# @!attribute [rw] video_url
#   @return [String, nil]
Video = Struct.new(
  :duration,
  :thumbnail_url,
  :video_url,
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

