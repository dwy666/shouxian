<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>

<style>
html,
body {
	margin: 0;
	padding: 0;
	height: 100%;
}
#app {
	height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.el-container {
	height: 100%;
}
.clearfix::after {
	height: 0;
	display: block;
	content: "";
	clear: both;
	visibility: hidden;
	overflow: hidden;
}
.el-message--success .el-message__content {
	color: white;
}
.el-message--success {
	height: 40px;
	padding: 0 16px;
	background: #000000;
	opacity: 0.5;
	min-width: auto;
	line-height: 40px;
}
.el-input__inner:hover,
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
	border-color: #f2a02d;
}
.el-dialog {
	width: 640px;
	margin: 0 auto;
}
.el-dialog__header {
	width: 100%;
	line-height: 48px;
	float: left;
	padding: 0;
	text-align: left;
	padding-left: 24px;
	border-bottom: 1px solid #00000009;
}
.el-dialog__footer {
	height: 60px;
	position: absolute;
	bottom: -60px;
	background: white;
	width: 100%;
	 border-top: 1px solid #00000015;
}
.dialog-footer {
	float: right;
}
.el-dialog__body {
	padding: 30px 0 0 20px;
}
.dialog-footer .el-button--primary:focus,
.el-button--primary:hover,
.dialog-footer .el-button--primary {
	background: #f29716;
	width: 64px;
	height: 32px;
	line-height: 32px;
	padding: 0;
	border-color: #f29716;
}
.dialog-footer .el-button {
	width: 64px;
	height: 32px;
	line-height: 32px;
	padding: 0;
}
</style>
