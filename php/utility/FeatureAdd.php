<?php
declare(strict_types=1);

// Listenfree SDK utility: feature_add

class ListenfreeFeatureAdd
{
    public static function call(ListenfreeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
