# Listenfree SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ListenfreeUtility.registrar = ->(u) {
  u.clean = ListenfreeUtilities::Clean
  u.done = ListenfreeUtilities::Done
  u.make_error = ListenfreeUtilities::MakeError
  u.feature_add = ListenfreeUtilities::FeatureAdd
  u.feature_hook = ListenfreeUtilities::FeatureHook
  u.feature_init = ListenfreeUtilities::FeatureInit
  u.fetcher = ListenfreeUtilities::Fetcher
  u.make_fetch_def = ListenfreeUtilities::MakeFetchDef
  u.make_context = ListenfreeUtilities::MakeContext
  u.make_options = ListenfreeUtilities::MakeOptions
  u.make_request = ListenfreeUtilities::MakeRequest
  u.make_response = ListenfreeUtilities::MakeResponse
  u.make_result = ListenfreeUtilities::MakeResult
  u.make_point = ListenfreeUtilities::MakePoint
  u.make_spec = ListenfreeUtilities::MakeSpec
  u.make_url = ListenfreeUtilities::MakeUrl
  u.param = ListenfreeUtilities::Param
  u.prepare_auth = ListenfreeUtilities::PrepareAuth
  u.prepare_body = ListenfreeUtilities::PrepareBody
  u.prepare_headers = ListenfreeUtilities::PrepareHeaders
  u.prepare_method = ListenfreeUtilities::PrepareMethod
  u.prepare_params = ListenfreeUtilities::PrepareParams
  u.prepare_path = ListenfreeUtilities::PreparePath
  u.prepare_query = ListenfreeUtilities::PrepareQuery
  u.graphql_body = ListenfreeUtilities::GraphqlBody
  u.graphql_errors = ListenfreeUtilities::GraphqlErrors
  u.result_basic = ListenfreeUtilities::ResultBasic
  u.result_body = ListenfreeUtilities::ResultBody
  u.result_headers = ListenfreeUtilities::ResultHeaders
  u.transform_request = ListenfreeUtilities::TransformRequest
  u.transform_response = ListenfreeUtilities::TransformResponse
}
