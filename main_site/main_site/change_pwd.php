
<html>
<head>
</head>
<body>
<form method="POST" action= <?php echo "'api/slim.php/users/". $_GET["email"] . "?token=".$_GET['token']."'"; ?> >
	<input type="hidden" name="_METHOD" value="PUT">
	<input type="password" name="pwd">
	<input type="submit" value = "change password"> 
	
</form>



</body>
</html>