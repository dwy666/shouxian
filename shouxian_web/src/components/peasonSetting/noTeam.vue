<template>
	<div>
		<div class="box" :style="{top:type='Peasonal'?'50%':'33%'}">
			<img src="" alt="">
		</div>
		<div class="font" :style="{top:type='Peasonal'?'64%':'47%',left:type='Peasonal'?'51.5%':'50.5%'}">
			<span>暂无子账户，请先</span><span style="color:#f29716;margin-left:6px" @click="establishTeam">{{data}}</span>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		data: "",
		type: ""
	},
	methods: {
		establishTeam() {
			this.type == "headist"
				? this.$emit("establishTeam", "A")
				: this.$emit("establishPeasonal", "");
		}
	}
};
</script>
<style scoped>
.box {
	width: 190px;
	height: 120px;
	border-radius: 3px;
	border: 1px solid #b7bbc0;
	position: absolute;
	top: 33%;
	left: 50%;
}
.font {
	font-size: 14px;
	line-height: 1;
	color: #00000045;
	position: absolute;
	top: 47%;
	left: 50.5%;
}
</style>