<template>
	<div>
		<span v-for="(s, i) in linkArray">
			<!-- Text -->
			<span v-if="i % 2 === 0">{{s}}</span>
			<!-- Link -->
			<span v-else>
				<!-- Youtube embed -->
				<span v-if="isYoutube(s)">
					<youtube :video-id="parsedYoutubeId(s)" class="youtube-iframe"></youtube>
				</span>
				<span v-else>
					<a :href="s" target="_blank">{{s}}</a>
				</span>	
			</span>
		</span>
	</div>
</template>

<script>
	export default {
		props: ['text'],
		computed: {
			linkArray() {
				return this.text.split(/(https?:\/\/[^\s]+)/)
			}
		},
		methods: {
			isYoutube(link) {
				return link.match(/https?:\/\/w*\.?youtube.com\/watch\?v=/) || link.match(/https?:\/\/youtu\.be\//) ? true : false
			},
			parsedYoutubeId(link) {
				if (link.match(/https?:\/\/w*\.?youtube.com\/watch\?v=/)) {
					return link.split(/https?:\/\/w*\.?youtube.com\/watch\?v=/)[1]
				} else if (link.match(/https?:\/\/youtu\.be\//)) {
					return link.split(/https?:\/\/youtu\.be\//)[1]
				} else {
					return ''
				}
			}
		}
	}
</script>

<style lang="scss">

	.youtube-iframe-div {
		
	}

	iframe:not(.md-image) {
		min-height: 400px;
	}
</style>

