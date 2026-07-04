package entity

import (
	"github.com/voxgig-sdk/listenfree-sdk/go/core"

	vs "github.com/voxgig-sdk/listenfree-sdk/go/utility/struct"
)

type PlaylistEntity struct {
	name    string
	client  *core.ListenfreeSDK
	utility *core.Utility
	entopts map[string]any
	data    map[string]any
	match   map[string]any
	entctx  *core.Context
}

func NewPlaylistEntity(client *core.ListenfreeSDK, entopts map[string]any) *PlaylistEntity {
	if entopts == nil {
		entopts = map[string]any{}
	}
	if _, ok := entopts["active"]; !ok {
		entopts["active"] = true
	} else if entopts["active"] == false {
		// keep false
	} else {
		entopts["active"] = true
	}

	e := &PlaylistEntity{
		name:    "playlist",
		client:  client,
		utility: client.GetUtility(),
		entopts: entopts,
		data:    map[string]any{},
		match:   map[string]any{},
	}

	e.entctx = e.utility.MakeContext(map[string]any{
		"entity":  e,
		"entopts": entopts,
	}, client.GetRootCtx())

	e.utility.FeatureHook(e.entctx, "PostConstructEntity")

	return e
}

func (e *PlaylistEntity) GetName() string { return e.name }

func (e *PlaylistEntity) Make() core.Entity {
	opts := map[string]any{}
	for k, v := range e.entopts {
		opts[k] = v
	}
	return NewPlaylistEntity(e.client, opts)
}

func (e *PlaylistEntity) Data(args ...any) any {
	if len(args) > 0 && args[0] != nil {
		e.data = core.ToMapAny(vs.Clone(args[0]))
		if e.data == nil {
			e.data = map[string]any{}
		}
		e.utility.FeatureHook(e.entctx, "SetData")
	}

	e.utility.FeatureHook(e.entctx, "GetData")
	out := vs.Clone(e.data)
	return out
}

func (e *PlaylistEntity) Match(args ...any) any {
	if len(args) > 0 && args[0] != nil {
		e.match = core.ToMapAny(vs.Clone(args[0]))
		if e.match == nil {
			e.match = map[string]any{}
		}
		e.utility.FeatureHook(e.entctx, "SetMatch")
	}

	e.utility.FeatureHook(e.entctx, "GetMatch")
	out := vs.Clone(e.match)
	return out
}

// DataTyped is the statically-typed accessor for this entity's data. With no
// argument it returns the current data as an Playlist; with an argument it
// sets the data and returns the stored value. It delegates to the untyped Data
// (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) DataTyped(data ...Playlist) Playlist {
	if len(data) > 0 {
		return typedFrom[Playlist](e.Data(asMap(data[0])))
	}
	return typedFrom[Playlist](e.Data())
}

// MatchTyped mirrors DataTyped for the entity's match filter. The match is a
// partial of the entity, so it round-trips through Playlist (all fields
// optional at the wire level).
func (e *PlaylistEntity) MatchTyped(match ...Playlist) Playlist {
	if len(match) > 0 {
		return typedFrom[Playlist](e.Match(asMap(match[0])))
	}
	return typedFrom[Playlist](e.Match())
}


func (e *PlaylistEntity) Load(reqmatch map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":   "load",
		"ctrl":     ctrl,
		"match":    e.match,
		"data":     e.data,
		"reqmatch": reqmatch,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
			if ctx.Result.Resdata != nil {
				e.data = core.ToMapAny(vs.Clone(ctx.Result.Resdata))
				if e.data == nil {
					e.data = map[string]any{}
				}
			}
		}
	})
}

// LoadTyped is the statically-typed variant of Load: it takes an
// PlaylistLoadMatch and returns an Playlist. It delegates to the untyped
// Load (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) LoadTyped(reqmatch PlaylistLoadMatch, ctrl map[string]any) (Playlist, error) {
	res, err := e.Load(asMap(reqmatch), ctrl)
	if err != nil {
		return Playlist{}, err
	}
	return typedFrom[Playlist](res), nil
}




func (e *PlaylistEntity) List(reqmatch map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":   "list",
		"ctrl":     ctrl,
		"match":    e.match,
		"data":     e.data,
		"reqmatch": reqmatch,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
		}
	})
}

// ListTyped is the statically-typed variant of List: it takes an
// PlaylistListMatch and returns []Playlist. It delegates to the untyped
// List (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) ListTyped(reqmatch PlaylistListMatch, ctrl map[string]any) ([]Playlist, error) {
	res, err := e.List(asMap(reqmatch), ctrl)
	if err != nil {
		return nil, err
	}
	return typedSliceFrom[Playlist](res), nil
}




func (e *PlaylistEntity) Create(reqdata map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":  "create",
		"ctrl":    ctrl,
		"match":   e.match,
		"data":    e.data,
		"reqdata": reqdata,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resdata != nil {
				e.data = core.ToMapAny(vs.Clone(ctx.Result.Resdata))
				if e.data == nil {
					e.data = map[string]any{}
				}
			}
		}
	})
}

// CreateTyped is the statically-typed variant of Create: it takes an
// PlaylistCreateData and returns an Playlist. It delegates to the untyped
// Create (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) CreateTyped(reqdata PlaylistCreateData, ctrl map[string]any) (Playlist, error) {
	res, err := e.Create(asMap(reqdata), ctrl)
	if err != nil {
		return Playlist{}, err
	}
	return typedFrom[Playlist](res), nil
}




func (e *PlaylistEntity) Update(reqdata map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":  "update",
		"ctrl":    ctrl,
		"match":   e.match,
		"data":    e.data,
		"reqdata": reqdata,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
			if ctx.Result.Resdata != nil {
				e.data = core.ToMapAny(vs.Clone(ctx.Result.Resdata))
				if e.data == nil {
					e.data = map[string]any{}
				}
			}
		}
	})
}

// UpdateTyped is the statically-typed variant of Update: it takes an
// PlaylistUpdateData and returns an Playlist. It delegates to the untyped
// Update (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) UpdateTyped(reqdata PlaylistUpdateData, ctrl map[string]any) (Playlist, error) {
	res, err := e.Update(asMap(reqdata), ctrl)
	if err != nil {
		return Playlist{}, err
	}
	return typedFrom[Playlist](res), nil
}




func (e *PlaylistEntity) Remove(reqmatch map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":   "remove",
		"ctrl":     ctrl,
		"match":    e.match,
		"data":     e.data,
		"reqmatch": reqmatch,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
			if ctx.Result.Resdata != nil {
				e.data = core.ToMapAny(vs.Clone(ctx.Result.Resdata))
				if e.data == nil {
					e.data = map[string]any{}
				}
			}
		}
	})
}

// RemoveTyped is the statically-typed variant of Remove: it takes an
// PlaylistRemoveMatch and returns an Playlist. It delegates to the untyped
// Remove (identical runtime) and converts at the typed boundary.
func (e *PlaylistEntity) RemoveTyped(reqmatch PlaylistRemoveMatch, ctrl map[string]any) (Playlist, error) {
	res, err := e.Remove(asMap(reqmatch), ctrl)
	if err != nil {
		return Playlist{}, err
	}
	return typedFrom[Playlist](res), nil
}



func (e *PlaylistEntity) runOp(ctx *core.Context, postDone func()) (any, error) {
	utility := e.utility

	utility.FeatureHook(ctx, "PrePoint")
	point, err := utility.MakePoint(ctx)
	ctx.Out["point"] = point
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreSpec")
	spec, err := utility.MakeSpec(ctx)
	ctx.Out["spec"] = spec
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreRequest")
	resp, err := utility.MakeRequest(ctx)
	ctx.Out["request"] = resp
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreResponse")
	resp2, err := utility.MakeResponse(ctx)
	ctx.Out["response"] = resp2
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreResult")
	result, err := utility.MakeResult(ctx)
	ctx.Out["result"] = result
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreDone")
	postDone()

	return utility.Done(ctx)
}
