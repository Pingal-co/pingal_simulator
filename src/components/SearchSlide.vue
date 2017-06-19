<template>
	<div class="search-slide">
		<input type="text" class="search-box" placeholder="Search" />
	</div>
</template>

<script>
	
	export default {

	}
</script>

<style lang="scss" scoped>
	.search-slide {
		display: flex;
		height: 54px;
		justify-content: center;
		align-items: center;
		// margin-bottom: -10px;
	}

	.search-box {
		background-color: rgb(166, 148, 142);
		border-radius: 4px;
		width: 94%;
		// height: 60%;
		border: none;
		outline: none;
		padding: 8px;
	}
</style>