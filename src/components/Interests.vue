<template>
	<div>
		<md-chips v-model="visibleInterests" @change="change" :md-max="maxCount" :md-input-placeholder="placeholder">
		  <template scope="chip">
		    <span>{{ chip.value }}</span>
		  </template>
		</md-chips>
		<div v-if="interests.length > pageSize" @click="toggleMore" class="toggleMore">{{toggleMoreText}}</div>
	</div>
</template>

<script>
	export default {
		props: ['interests', 'maxCount', 'pageSize'],
		data() {
			return {
				allVisibile: false,
				toggleMoreText: 'View Hidden Interests'
			}
		},
		computed: {
			placeholder() {
				if (this.interests.length >= this.maxCount) {
					return this.maxCount + '/' + this.maxCount
				} else {
					return 'Add Interest... ' + this.interests.length + '/' + this.maxCount
				}
			},
			visibleInterests() {
				if (this.allVisibile) {
					return this.interests
				} else {
					return this.interests.slice(0, this.pageSize)
				}	
			}
		},
		methods: {
			change() {
				if (this.visibleInterests.length <= this.pageSize) {
					var newInterests = this.visibleInterests + ',' + this.interests.slice(this.pageSize)
				} else {
					if (this.allVisibile) {
						var newInterests = this.visibleInterests.join(',')
					} else {
						var newInterests = this.interests[0] + ',' + this.visibleInterests.slice(this.pageSize) + ',' + this.interests.slice(1)
					}		
				}	
				this.$store.dispatch('updateInterests', {
					interests: newInterests,
					roomChannel: this.$store.state.currentRoomChannel,
				})
			},
			toggleMore() {
				this.allVisibile = !this.allVisibile
				if (this.allVisibile) {
					this.toggleMoreText = 'Hide Interests'
				} else {
					this.toggleMoreText = 'View Hidden Interests'
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.toggleMore {
		margin-top: -15px;
		margin-bottom: 20px;
		text-align: center;
		color: rgba(0, 0, 0, 0.54);
    	font-size: 14px;


	}
</style>