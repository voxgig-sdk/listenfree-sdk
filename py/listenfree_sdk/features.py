# Listenfree SDK feature factory

from listenfree_sdk.feature.base_feature import ListenfreeBaseFeature
from listenfree_sdk.feature.ratelimit_feature import ListenfreeRatelimitFeature
from listenfree_sdk.feature.retry_feature import ListenfreeRetryFeature
from listenfree_sdk.feature.test_feature import ListenfreeTestFeature
from listenfree_sdk.feature.timeout_feature import ListenfreeTimeoutFeature


_FEATURES = {
    "base": lambda: ListenfreeBaseFeature(),
    "ratelimit": lambda: ListenfreeRatelimitFeature(),
    "retry": lambda: ListenfreeRetryFeature(),
    "test": lambda: ListenfreeTestFeature(),
    "timeout": lambda: ListenfreeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
