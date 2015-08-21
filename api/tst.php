<?php
$foo = '';
$foo = ucfirst($foo);             // Hello world!
echo $foo;
$bar = 'HElLO wOrLD!';
$bar = ucfirst($bar);             // HELLO WORLD!
echo $bar;
$bar = ucfirst(strtolower($bar)); // Hello world!
echo $bar;	
?>