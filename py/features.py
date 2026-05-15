# Listenfree SDK feature factory

from feature.base_feature import ListenfreeBaseFeature
from feature.test_feature import ListenfreeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ListenfreeBaseFeature(),
        "test": lambda: ListenfreeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
