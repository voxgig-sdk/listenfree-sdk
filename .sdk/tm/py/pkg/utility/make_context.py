# Listenfree SDK utility: make_context

from projectname_sdk.core.context import ListenfreeContext


def make_context_util(ctxmap, basectx):
    return ListenfreeContext(ctxmap, basectx)
