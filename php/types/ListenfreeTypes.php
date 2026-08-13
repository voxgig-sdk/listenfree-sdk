<?php
declare(strict_types=1);

// Typed models for the Listenfree SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ListeningRoom entity data model. */
class ListeningRoom
{
    public ?string $createdAt = null;
    public ?array $currentSong = null;
    public ?string $description = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?int $maxParticipants = null;
    public ?string $name = null;
    public ?array $participants = null;
    public ?array $queue = null;
}

/** Request payload for ListeningRoom#load. */
class ListeningRoomLoadMatch
{
    public string $id;
}

/** Request payload for ListeningRoom#list. */
class ListeningRoomListMatch
{
    public ?string $createdAt = null;
    public ?array $currentSong = null;
    public ?string $description = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?int $maxParticipants = null;
    public ?string $name = null;
    public ?array $participants = null;
    public ?array $queue = null;
}

/** Request payload for ListeningRoom#create. */
class ListeningRoomCreateData
{
    public ?string $createdAt = null;
    public ?array $currentSong = null;
    public ?string $description = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?int $maxParticipants = null;
    public ?string $name = null;
    public ?array $participants = null;
    public ?array $queue = null;
}

/** Music entity data model. */
class Music
{
    public ?string $downloadedAt = null;
    public ?string $expiresAt = null;
    public ?string $id = null;
    public ?int $progress = null;
    public ?array $song = null;
    public ?string $status = null;
}

/** Request payload for Music#list. */
class MusicListMatch
{
    public ?string $downloadedAt = null;
    public ?string $expiresAt = null;
    public ?string $id = null;
    public ?int $progress = null;
    public ?array $song = null;
    public ?string $status = null;
}

/** OfflineDownload entity data model. */
class OfflineDownload
{
    public string $songId;
}

/** Request payload for OfflineDownload#create. */
class OfflineDownloadCreateData
{
    public string $songId;
}

/** Playlist entity data model. */
class Playlist
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?bool $isSmart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smartCriteria = null;
    public ?int $songCount = null;
    public string $songId;
    public ?array $songs = null;
    public ?string $updatedAt = null;
}

/** Request payload for Playlist#load. */
class PlaylistLoadMatch
{
    public string $id;
}

/** Request payload for Playlist#list. */
class PlaylistListMatch
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?bool $isSmart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smartCriteria = null;
    public ?int $songCount = null;
    public ?string $songId = null;
    public ?array $songs = null;
    public ?string $updatedAt = null;
}

/** Request payload for Playlist#create. */
class PlaylistCreateData
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?bool $isPublic = null;
    public ?bool $isSmart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smartCriteria = null;
    public ?int $songCount = null;
    public string $songId;
    public ?array $songs = null;
    public ?string $updatedAt = null;
}

/** Request payload for Playlist#update. */
class PlaylistUpdateData
{
    public string $id;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?bool $isPublic = null;
    public ?bool $isSmart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smartCriteria = null;
    public ?int $songCount = null;
    public ?string $songId = null;
    public ?array $songs = null;
    public ?string $updatedAt = null;
}

/** Request payload for Playlist#remove. */
class PlaylistRemoveMatch
{
    public string $id;
}

/** Search entity data model. */
class Search
{
    public ?array $albums = null;
    public ?array $artists = null;
    public ?array $playlists = null;
    public ?array $songs = null;
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public ?array $albums = null;
    public ?array $artists = null;
    public ?array $playlists = null;
    public ?array $songs = null;
}

/** Song entity data model. */
class Song
{
    public ?string $album = null;
    public ?string $artist = null;
    public ?string $coverArt = null;
    public ?int $duration = null;
    public ?array $genres = null;
    public ?bool $hasVideo = null;
    public ?string $id = null;
    public ?string $releaseDate = null;
    public ?string $title = null;
}

/** Request payload for Song#load. */
class SongLoadMatch
{
    public string $id;
}

/** Stream entity data model. */
class Stream
{
    public ?int $bitrate = null;
    public ?string $expiresAt = null;
    public ?string $quality = null;
    public ?string $streamUrl = null;
}

/** Request payload for Stream#load. */
class StreamLoadMatch
{
    public string $song_id;
}

/** Video entity data model. */
class Video
{
    public ?int $duration = null;
    public ?string $thumbnailUrl = null;
    public ?string $videoUrl = null;
}

/** Request payload for Video#load. */
class VideoLoadMatch
{
    public string $song_id;
}

