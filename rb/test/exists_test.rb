# Listenfree SDK exists test

require "minitest/autorun"
require_relative "../Listenfree_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ListenfreeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
