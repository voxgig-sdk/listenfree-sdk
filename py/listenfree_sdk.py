# Listenfree SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import ListenfreeUtility
from core.spec import ListenfreeSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import ListenfreeBaseFeature
from features import _make_feature


class ListenfreeSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ListenfreeUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ListenfreeUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ListenfreeSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def listening_room(self):
        """Idiomatic facade: client.listening_room.list() / client.listening_room.load({"id": ...})."""
        from entity.listening_room_entity import ListeningRoomEntity
        cached = getattr(self, "_listening_room", None)
        if cached is None:
            cached = ListeningRoomEntity(self, None)
            self._listening_room = cached
        return cached

    def ListeningRoom(self, data=None):
        # Deprecated: use client.listening_room instead.
        from entity.listening_room_entity import ListeningRoomEntity
        return ListeningRoomEntity(self, data)


    @property
    def music(self):
        """Idiomatic facade: client.music.list() / client.music.load({"id": ...})."""
        from entity.music_entity import MusicEntity
        cached = getattr(self, "_music", None)
        if cached is None:
            cached = MusicEntity(self, None)
            self._music = cached
        return cached

    def Music(self, data=None):
        # Deprecated: use client.music instead.
        from entity.music_entity import MusicEntity
        return MusicEntity(self, data)


    @property
    def offline_download(self):
        """Idiomatic facade: client.offline_download.list() / client.offline_download.load({"id": ...})."""
        from entity.offline_download_entity import OfflineDownloadEntity
        cached = getattr(self, "_offline_download", None)
        if cached is None:
            cached = OfflineDownloadEntity(self, None)
            self._offline_download = cached
        return cached

    def OfflineDownload(self, data=None):
        # Deprecated: use client.offline_download instead.
        from entity.offline_download_entity import OfflineDownloadEntity
        return OfflineDownloadEntity(self, data)


    @property
    def playlist(self):
        """Idiomatic facade: client.playlist.list() / client.playlist.load({"id": ...})."""
        from entity.playlist_entity import PlaylistEntity
        cached = getattr(self, "_playlist", None)
        if cached is None:
            cached = PlaylistEntity(self, None)
            self._playlist = cached
        return cached

    def Playlist(self, data=None):
        # Deprecated: use client.playlist instead.
        from entity.playlist_entity import PlaylistEntity
        return PlaylistEntity(self, data)


    @property
    def search(self):
        """Idiomatic facade: client.search.list() / client.search.load({"id": ...})."""
        from entity.search_entity import SearchEntity
        cached = getattr(self, "_search", None)
        if cached is None:
            cached = SearchEntity(self, None)
            self._search = cached
        return cached

    def Search(self, data=None):
        # Deprecated: use client.search instead.
        from entity.search_entity import SearchEntity
        return SearchEntity(self, data)


    @property
    def song(self):
        """Idiomatic facade: client.song.list() / client.song.load({"id": ...})."""
        from entity.song_entity import SongEntity
        cached = getattr(self, "_song", None)
        if cached is None:
            cached = SongEntity(self, None)
            self._song = cached
        return cached

    def Song(self, data=None):
        # Deprecated: use client.song instead.
        from entity.song_entity import SongEntity
        return SongEntity(self, data)


    @property
    def stream(self):
        """Idiomatic facade: client.stream.list() / client.stream.load({"id": ...})."""
        from entity.stream_entity import StreamEntity
        cached = getattr(self, "_stream", None)
        if cached is None:
            cached = StreamEntity(self, None)
            self._stream = cached
        return cached

    def Stream(self, data=None):
        # Deprecated: use client.stream instead.
        from entity.stream_entity import StreamEntity
        return StreamEntity(self, data)


    @property
    def video(self):
        """Idiomatic facade: client.video.list() / client.video.load({"id": ...})."""
        from entity.video_entity import VideoEntity
        cached = getattr(self, "_video", None)
        if cached is None:
            cached = VideoEntity(self, None)
            self._video = cached
        return cached

    def Video(self, data=None):
        # Deprecated: use client.video instead.
        from entity.video_entity import VideoEntity
        return VideoEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
