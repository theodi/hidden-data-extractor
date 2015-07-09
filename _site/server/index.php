<?php

$url = $_GET["url"];

?>
<html>
<head>
<script>
var requested_url = "<?php echo $url; ?>";
</script>
<style>
table {
	table-layout: fixed;
	width: 100%;
	border: 1px solid grey;
}
td {
	word-wrap: break-word;
	padding: 8px;
	border-top: 1px solid grey;
	border-left: 1px solid grey;
}
</style>
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/jquery.ogp.js"></script>
<script src="js/control.js"></script>
</head>
<body>
<table style="width: 100%;" id="data">
<th width="10%">dispose?</th><th width="10%">Variable name</th><th width="80%">Data</th>
</table>
</table>
<iframe style="display: none;" src="proxy.php?site=<?php echo $url; ?>" id="iframe" onLoad="getData(myFrame);"></iframe>
</body>
</html>
