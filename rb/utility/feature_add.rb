# Listenfree SDK utility: feature_add
module ListenfreeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
