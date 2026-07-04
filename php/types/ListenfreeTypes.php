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
    public ?string $created_at = null;
    public ?array $current_song = null;
    public ?string $description = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?bool $is_public = null;
    public ?int $max_participant = null;
    public ?string $name = null;
    public ?array $participant = null;
    public ?array $queue = null;
}

/** Request payload for ListeningRoom#load. */
class ListeningRoomLoadMatch
{
    public string $id;
}

/** Match filter for ListeningRoom#list (any subset of ListeningRoom fields). */
class ListeningRoomListMatch
{
    public ?string $created_at = null;
    public ?array $current_song = null;
    public ?string $description = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?bool $is_public = null;
    public ?int $max_participant = null;
    public ?string $name = null;
    public ?array $participant = null;
    public ?array $queue = null;
}

/** Request payload for ListeningRoom#create. */
class ListeningRoomCreateData
{
    public string $id;
}

/** Music entity data model. */
class Music
{
    public ?string $downloaded_at = null;
    public ?string $expires_at = null;
    public ?string $id = null;
    public ?int $progress = null;
    public ?array $song = null;
    public ?string $status = null;
}

/** Match filter for Music#list (any subset of Music fields). */
class MusicListMatch
{
    public ?string $downloaded_at = null;
    public ?string $expires_at = null;
    public ?string $id = null;
    public ?int $progress = null;
    public ?array $song = null;
    public ?string $status = null;
}

/** OfflineDownload entity data model. */
class OfflineDownload
{
    public string $song_id;
}

/** Match filter for OfflineDownload#create (any subset of OfflineDownload fields). */
class OfflineDownloadCreateData
{
    public ?string $song_id = null;
}

/** Playlist entity data model. */
class Playlist
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?bool $is_public = null;
    public ?bool $is_smart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smart_criterion = null;
    public ?array $song = null;
    public ?int $song_count = null;
    public string $song_id;
    public ?string $updated_at = null;
}

/** Request payload for Playlist#load. */
class PlaylistLoadMatch
{
    public string $id;
}

/** Match filter for Playlist#list (any subset of Playlist fields). */
class PlaylistListMatch
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?bool $is_public = null;
    public ?bool $is_smart = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $smart_criterion = null;
    public ?array $song = null;
    public ?int $song_count = null;
    public ?string $song_id = null;
    public ?string $updated_at = null;
}

/** Request payload for Playlist#create. */
class PlaylistCreateData
{
    public string $id;
}

/** Request payload for Playlist#update. */
class PlaylistUpdateData
{
    public string $id;
}

/** Request payload for Playlist#remove. */
class PlaylistRemoveMatch
{
    public string $id;
}

/** Search entity data model. */
class Search
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?array $result = null;
    public ?int $total = null;
}

/** Match filter for Search#load (any subset of Search fields). */
class SearchLoadMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?array $result = null;
    public ?int $total = null;
}

/** Song entity data model. */
class Song
{
    public ?string $album = null;
    public ?string $artist = null;
    public ?string $cover_art = null;
    public ?int $duration = null;
    public ?array $genre = null;
    public ?bool $has_video = null;
    public ?string $id = null;
    public ?string $release_date = null;
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
    public ?string $expires_at = null;
    public ?string $quality = null;
    public ?string $stream_url = null;
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
    public ?string $thumbnail_url = null;
    public ?string $video_url = null;
}

/** Request payload for Video#load. */
class VideoLoadMatch
{
    public string $song_id;
}

