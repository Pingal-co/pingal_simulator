<template>
    <div class="room-list">
    	<router-link :to="'/c/' + slide.id" class="room-slide" v-for="slide in slides" :key="slide.id">
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
	$primary-color-l5: rgb(255, 250, 247);

	.room-list {
		// padding-top: 12px;
	    overflow-y: scroll;
	    flex: 1;
	    width: 100%;
	    display: block !important;

	    .room-slide {
			display: flex;
			align-items: center;
			width: 100%;
			height: 54px;
			cursor: pointer;
			text-decoration: none !important;
			color: inherit;
			border-bottom: 1px solid rgb(225, 225, 225);


			.avatar {
				min-width: 80px;
				max-width: 80px;
			}

			.name {
				min-width: 60px;
				max-width: 60px;
			}

			.text {
				padding-left: 20px;
				padding-right: 15px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.room-slide:hover {
			background-color: $primary-color-l5;
			color: inherit;
		}
	}
</style>
