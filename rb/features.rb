# Listenfree SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ListenfreeFeatures
  def self.make_feature(name)
    case name
    when "base"
      ListenfreeBaseFeature.new
    when "ratelimit"
      ListenfreeRatelimitFeature.new
    when "retry"
      ListenfreeRetryFeature.new
    when "test"
      ListenfreeTestFeature.new
    when "timeout"
      ListenfreeTimeoutFeature.new
    else
      ListenfreeBaseFeature.new
    end
  end
end
