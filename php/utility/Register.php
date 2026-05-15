<?php
declare(strict_types=1);

// Listenfree SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ListenfreeUtility::setRegistrar(function (ListenfreeUtility $u): void {
    $u->clean = [ListenfreeClean::class, 'call'];
    $u->done = [ListenfreeDone::class, 'call'];
    $u->make_error = [ListenfreeMakeError::class, 'call'];
    $u->feature_add = [ListenfreeFeatureAdd::class, 'call'];
    $u->feature_hook = [ListenfreeFeatureHook::class, 'call'];
    $u->feature_init = [ListenfreeFeatureInit::class, 'call'];
    $u->fetcher = [ListenfreeFetcher::class, 'call'];
    $u->make_fetch_def = [ListenfreeMakeFetchDef::class, 'call'];
    $u->make_context = [ListenfreeMakeContext::class, 'call'];
    $u->make_options = [ListenfreeMakeOptions::class, 'call'];
    $u->make_request = [ListenfreeMakeRequest::class, 'call'];
    $u->make_response = [ListenfreeMakeResponse::class, 'call'];
    $u->make_result = [ListenfreeMakeResult::class, 'call'];
    $u->make_point = [ListenfreeMakePoint::class, 'call'];
    $u->make_spec = [ListenfreeMakeSpec::class, 'call'];
    $u->make_url = [ListenfreeMakeUrl::class, 'call'];
    $u->param = [ListenfreeParam::class, 'call'];
    $u->prepare_auth = [ListenfreePrepareAuth::class, 'call'];
    $u->prepare_body = [ListenfreePrepareBody::class, 'call'];
    $u->prepare_headers = [ListenfreePrepareHeaders::class, 'call'];
    $u->prepare_method = [ListenfreePrepareMethod::class, 'call'];
    $u->prepare_params = [ListenfreePrepareParams::class, 'call'];
    $u->prepare_path = [ListenfreePreparePath::class, 'call'];
    $u->prepare_query = [ListenfreePrepareQuery::class, 'call'];
    $u->result_basic = [ListenfreeResultBasic::class, 'call'];
    $u->result_body = [ListenfreeResultBody::class, 'call'];
    $u->result_headers = [ListenfreeResultHeaders::class, 'call'];
    $u->transform_request = [ListenfreeTransformRequest::class, 'call'];
    $u->transform_response = [ListenfreeTransformResponse::class, 'call'];
});
