<?php
$house_id = $_GET['house_id'];

?>
<html>
<head>
</head>
<body>
<form action="shiningfloor.php/houses/<?php echo $house_id ?>" method="POST">
	<input type="hidden" name="_METHOD" value="PUT">
	<!--<label>Deposit:</label><input name="id" value="<?php echo $house_id ?>">-->
<!--<label>Deposit:</label><input name="house_total_deposit">-->
<label>Rent Amount:</label><input name="house_rent_amount">
<!--<label>rooms:</label><input name="house_no_rooms">
<label>rent:</label><input name="house_rent_amount">-->
<input type="submit">


</form>


</body>
</html>