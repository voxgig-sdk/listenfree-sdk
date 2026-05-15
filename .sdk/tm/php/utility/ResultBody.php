<?php
declare(strict_types=1);

// Listenfree SDK utility: result_body

class ListenfreeResultBody
{
    public static function call(ListenfreeContext $ctx): ?ListenfreeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
