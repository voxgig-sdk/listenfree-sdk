<?php
declare(strict_types=1);

// Listenfree SDK utility: result_headers

class ListenfreeResultHeaders
{
    public static function call(ListenfreeContext $ctx): ?ListenfreeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
