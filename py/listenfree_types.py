# Typed models for the Listenfree SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ListeningRoom:
    created_at: Optional[str] = None
    current_song: Optional[dict] = None
    description: Optional[str] = None
    host: Optional[str] = None
    id: Optional[str] = None
    is_public: Optional[bool] = None
    max_participant: Optional[int] = None
    name: Optional[str] = None
    participant: Optional[list] = None
    queue: Optional[list] = None


@dataclass
class ListeningRoomLoadMatch:
    id: str


@dataclass
class ListeningRoomListMatch:
    created_at: Optional[str] = None
    current_song: Optional[dict] = None
    description: Optional[str] = None
    host: Optional[str] = None
    id: Optional[str] = None
    is_public: Optional[bool] = None
    max_participant: Optional[int] = None
    name: Optional[str] = None
    participant: Optional[list] = None
    queue: Optional[list] = None


@dataclass
class ListeningRoomCreateData:
    id: str


@dataclass
class Music:
    downloaded_at: Optional[str] = None
    expires_at: Optional[str] = None
    id: Optional[str] = None
    progress: Optional[int] = None
    song: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class MusicListMatch:
    downloaded_at: Optional[str] = None
    expires_at: Optional[str] = None
    id: Optional[str] = None
    progress: Optional[int] = None
    song: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class OfflineDownload:
    song_id: str


@dataclass
class OfflineDownloadCreateData:
    song_id: Optional[str] = None


@dataclass
class Playlist:
    song_id: str
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    is_public: Optional[bool] = None
    is_smart: Optional[bool] = None
    name: Optional[str] = None
    owner: Optional[str] = None
    smart_criterion: Optional[dict] = None
    song: Optional[list] = None
    song_count: Optional[int] = None
    updated_at: Optional[str] = None


@dataclass
class PlaylistLoadMatch:
    id: str


@dataclass
class PlaylistListMatch:
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    is_public: Optional[bool] = None
    is_smart: Optional[bool] = None
    name: Optional[str] = None
    owner: Optional[str] = None
    smart_criterion: Optional[dict] = None
    song: Optional[list] = None
    song_count: Optional[int] = None
    song_id: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class PlaylistCreateData:
    id: str


@dataclass
class PlaylistUpdateData:
    id: str


@dataclass
class PlaylistRemoveMatch:
    id: str


@dataclass
class Search:
    limit: Optional[int] = None
    offset: Optional[int] = None
    result: Optional[dict] = None
    total: Optional[int] = None


@dataclass
class SearchLoadMatch:
    limit: Optional[int] = None
    offset: Optional[int] = None
    result: Optional[dict] = None
    total: Optional[int] = None


@dataclass
class Song:
    album: Optional[str] = None
    artist: Optional[str] = None
    cover_art: Optional[str] = None
    duration: Optional[int] = None
    genre: Optional[list] = None
    has_video: Optional[bool] = None
    id: Optional[str] = None
    release_date: Optional[str] = None
    title: Optional[str] = None


@dataclass
class SongLoadMatch:
    id: str


@dataclass
class Stream:
    bitrate: Optional[int] = None
    expires_at: Optional[str] = None
    quality: Optional[str] = None
    stream_url: Optional[str] = None


@dataclass
class StreamLoadMatch:
    song_id: str


@dataclass
class Video:
    duration: Optional[int] = None
    thumbnail_url: Optional[str] = None
    video_url: Optional[str] = None


@dataclass
class VideoLoadMatch:
    song_id: str

