<template>
    <div class="room-list">
    	<router-link :to="'/room/' + slide.id" class="room-slide" v-for="slide in slides">
	    		<div class="avatar">
		        	<avatar :name="slide.author_name"></avatar>
		        </div>
		        <div class="name">
		          {{slide.author_name}}
		        </div>
		        <div class="text">
		        	{{slide.text}}
		        </div>
		</router-link>
    </div>
</template>

<script>
	import Avatar from '@/components/Avatar'

	export default {
		props: ['slides'],
		components: {
			Avatar
		}
	}
</script>

<style lang="scss" scoped>
	.room-list {
		padding-top: 12px;
	    overflow-y: scroll;
	    flex: 1;
	    width: 100%;
	    display: block !important;

	    .room-slide {
			display: flex;
			align-items: center;
			width: 100%;
			height: 60px;
			cursor: pointer;

			.avatar {
				width: 80px;
			}

			.name {

			}

			.text {
				padding-left: 24px;
			}
		}

		.room-slide:hover {
			background-color: grey;
		}
	}
</style>
