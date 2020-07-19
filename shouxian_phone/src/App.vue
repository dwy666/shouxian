<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
}

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.clearfix::after {
	height: 0;
	display: block;
	content: "";
	clear: both;
	visibility: hidden;
	overflow: hidden;
}
.van-toast--text{
	width: min-content;
}

</style>
