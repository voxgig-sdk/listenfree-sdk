# Typed models for the Listenfree SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ListeningRoom(TypedDict, total=False):
    created_at: str
    current_song: dict
    description: str
    host: str
    id: str
    is_public: bool
    max_participant: int
    name: str
    participant: list
    queue: list


class ListeningRoomLoadMatch(TypedDict):
    id: str


class ListeningRoomListMatch(TypedDict, total=False):
    created_at: str
    current_song: dict
    description: str
    host: str
    id: str
    is_public: bool
    max_participant: int
    name: str
    participant: list
    queue: list


class ListeningRoomCreateData(TypedDict):
    id: str


class Music(TypedDict, total=False):
    downloaded_at: str
    expires_at: str
    id: str
    progress: int
    song: dict
    status: str


class MusicListMatch(TypedDict, total=False):
    downloaded_at: str
    expires_at: str
    id: str
    progress: int
    song: dict
    status: str


class OfflineDownload(TypedDict):
    song_id: str


class OfflineDownloadCreateData(TypedDict):
    song_id: str


class PlaylistRequired(TypedDict):
    song_id: str


class Playlist(PlaylistRequired, total=False):
    created_at: str
    description: str
    id: str
    is_public: bool
    is_smart: bool
    name: str
    owner: str
    smart_criterion: dict
    song: list
    song_count: int
    updated_at: str


class PlaylistLoadMatch(TypedDict):
    id: str


class PlaylistListMatch(TypedDict, total=False):
    created_at: str
    description: str
    id: str
    is_public: bool
    is_smart: bool
    name: str
    owner: str
    smart_criterion: dict
    song: list
    song_count: int
    song_id: str
    updated_at: str


class PlaylistCreateData(TypedDict):
    id: str


class PlaylistUpdateData(TypedDict):
    id: str


class PlaylistRemoveMatch(TypedDict):
    id: str


class Search(TypedDict, total=False):
    limit: int
    offset: int
    result: dict
    total: int


class SearchLoadMatch(TypedDict, total=False):
    limit: int
    offset: int
    result: dict
    total: int


class Song(TypedDict, total=False):
    album: str
    artist: str
    cover_art: str
    duration: int
    genre: list
    has_video: bool
    id: str
    release_date: str
    title: str


class SongLoadMatch(TypedDict):
    id: str


class Stream(TypedDict, total=False):
    bitrate: int
    expires_at: str
    quality: str
    stream_url: str


class StreamLoadMatch(TypedDict):
    song_id: str


class Video(TypedDict, total=False):
    duration: int
    thumbnail_url: str
    video_url: str


class VideoLoadMatch(TypedDict):
    song_id: str
