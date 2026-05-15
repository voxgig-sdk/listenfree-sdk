<?php
declare(strict_types=1);

// Listenfree SDK utility: prepare_body

class ListenfreePrepareBody
{
    public static function call(ListenfreeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
