<template>
	<md-sidenav v-if="mobile" class="md-left" ref="leftBar">
    <room-nav></room-nav>
  </md-sidenav>
	<div v-else-if="!mobile && showLeft">
	  <room-nav></room-nav>
	</div> 
</template>

<script>
  import RoomNav from '@/components/RoomNav'
  import { mapGetters } from 'vuex'

	export default {
		components: {
			RoomNav
		},
    computed: {
      ...mapGetters([
         'mobile',
         'showLeft'
      ]),
    },
    watch: {
      showLeft: function() {
        if (this.mobile) {
          this.$refs.leftBar.toggle()
        }
      }
    },
	}

</script>

<style lang="scss" scoped>
	
</style>