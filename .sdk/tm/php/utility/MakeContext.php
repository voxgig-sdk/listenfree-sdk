<?php
declare(strict_types=1);

// Listenfree SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ListenfreeMakeContext
{
    public static function call(array $ctxmap, ?ListenfreeContext $basectx): ListenfreeContext
    {
        return new ListenfreeContext($ctxmap, $basectx);
    }
}
