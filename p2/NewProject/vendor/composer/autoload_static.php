<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit244a856bbd802646f6ab41685fa9f67d
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Psr\\Log\\' => 8,
        ),
        'M' => 
        array (
            'Monolog\\' => 8,
        ),
        'K' => 
        array (
            'Kh21\\1\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/src',
        ),
        'Monolog\\' => 
        array (
            0 => __DIR__ . '/..' . '/monolog/monolog/src/Monolog',
        ),
        'Kh21\\1\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Test',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit244a856bbd802646f6ab41685fa9f67d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit244a856bbd802646f6ab41685fa9f67d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit244a856bbd802646f6ab41685fa9f67d::$classMap;

        }, null, ClassLoader::class);
    }
}
