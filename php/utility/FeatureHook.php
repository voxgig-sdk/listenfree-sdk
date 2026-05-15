<?php
declare(strict_types=1);

// Listenfree SDK utility: feature_hook

class ListenfreeFeatureHook
{
    public static function call(ListenfreeContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
