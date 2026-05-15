# Listenfree SDK utility: make_context
require_relative '../core/context'
module ListenfreeUtilities
  MakeContext = ->(ctxmap, basectx) {
    ListenfreeContext.new(ctxmap, basectx)
  }
end
