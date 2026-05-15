<?php
declare(strict_types=1);

// Listenfree SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ListenfreeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ListenfreeBaseFeature();
            case "test":
                return new ListenfreeTestFeature();
            default:
                return new ListenfreeBaseFeature();
        }
    }
}
