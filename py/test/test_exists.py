# Listenfree SDK exists test

import pytest
from listenfree_sdk import ListenfreeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ListenfreeSDK.test(None, None)
        assert testsdk is not None
