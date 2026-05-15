# Listenfree SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ListenfreeFeatures
  def self.make_feature(name)
    case name
    when "base"
      ListenfreeBaseFeature.new
    when "test"
      ListenfreeTestFeature.new
    else
      ListenfreeBaseFeature.new
    end
  end
end
