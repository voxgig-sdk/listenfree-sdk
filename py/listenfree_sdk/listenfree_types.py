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
    createdAt: str
    currentSong: dict
    description: str
    host: str
    id: str
    isPublic: bool
    maxParticipants: int
    name: str
    participants: list
    queue: list


class ListeningRoomLoadMatch(TypedDict):
    id: str


class ListeningRoomListMatch(TypedDict, total=False):
    createdAt: str
    currentSong: dict
    description: str
    host: str
    id: str
    isPublic: bool
    maxParticipants: int
    name: str
    participants: list
    queue: list


class ListeningRoomCreateData(TypedDict, total=False):
    createdAt: str
    currentSong: dict
    description: str
    host: str
    id: str
    isPublic: bool
    maxParticipants: int
    name: str
    participants: list
    queue: list


class Music(TypedDict, total=False):
    downloadedAt: str
    expiresAt: str
    id: str
    progress: int
    song: dict
    status: str


class MusicListMatch(TypedDict, total=False):
    downloadedAt: str
    expiresAt: str
    id: str
    progress: int
    song: dict
    status: str


class OfflineDownload(TypedDict):
    songId: str


class OfflineDownloadCreateData(TypedDict):
    songId: str


class PlaylistRequired(TypedDict):
    songId: str


class Playlist(PlaylistRequired, total=False):
    createdAt: str
    description: str
    id: str
    isPublic: bool
    isSmart: bool
    name: str
    owner: str
    smartCriteria: dict
    songCount: int
    songs: list
    updatedAt: str


class PlaylistLoadMatch(TypedDict):
    id: str


class PlaylistListMatch(TypedDict, total=False):
    createdAt: str
    description: str
    id: str
    isPublic: bool
    isSmart: bool
    name: str
    owner: str
    smartCriteria: dict
    songCount: int
    songId: str
    songs: list
    updatedAt: str


class PlaylistCreateDataRequired(TypedDict):
    songId: str


class PlaylistCreateData(PlaylistCreateDataRequired, total=False):
    createdAt: str
    description: str
    id: str
    isPublic: bool
    isSmart: bool
    name: str
    owner: str
    smartCriteria: dict
    songCount: int
    songs: list
    updatedAt: str


class PlaylistUpdateDataRequired(TypedDict):
    id: str


class PlaylistUpdateData(PlaylistUpdateDataRequired, total=False):
    createdAt: str
    description: str
    isPublic: bool
    isSmart: bool
    name: str
    owner: str
    smartCriteria: dict
    songCount: int
    songId: str
    songs: list
    updatedAt: str


class PlaylistRemoveMatch(TypedDict):
    id: str


class Search(TypedDict, total=False):
    albums: list
    artists: list
    playlists: list
    songs: list


class SearchLoadMatch(TypedDict, total=False):
    albums: list
    artists: list
    playlists: list
    songs: list


class Song(TypedDict, total=False):
    album: str
    artist: str
    coverArt: str
    duration: int
    genres: list
    hasVideo: bool
    id: str
    releaseDate: str
    title: str


class SongLoadMatch(TypedDict):
    id: str


class Stream(TypedDict, total=False):
    bitrate: int
    expiresAt: str
    quality: str
    streamUrl: str


class StreamLoadMatch(TypedDict):
    song_id: str


class Video(TypedDict, total=False):
    duration: int
    thumbnailUrl: str
    videoUrl: str


class VideoLoadMatch(TypedDict):
    song_id: str
