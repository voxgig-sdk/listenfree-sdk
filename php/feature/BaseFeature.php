<?php
declare(strict_types=1);

// Listenfree SDK base feature

class ListenfreeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ListenfreeContext $ctx, array $options): void {}
    public function PostConstruct(ListenfreeContext $ctx): void {}
    public function PostConstructEntity(ListenfreeContext $ctx): void {}
    public function SetData(ListenfreeContext $ctx): void {}
    public function GetData(ListenfreeContext $ctx): void {}
    public function GetMatch(ListenfreeContext $ctx): void {}
    public function SetMatch(ListenfreeContext $ctx): void {}
    public function PrePoint(ListenfreeContext $ctx): void {}
    public function PreSpec(ListenfreeContext $ctx): void {}
    public function PreRequest(ListenfreeContext $ctx): void {}
    public function PreResponse(ListenfreeContext $ctx): void {}
    public function PreResult(ListenfreeContext $ctx): void {}
    public function PreDone(ListenfreeContext $ctx): void {}
    public function PreUnexpected(ListenfreeContext $ctx): void {}
}
