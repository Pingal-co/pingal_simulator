<template>
	<md-list-item>
	  <md-avatar>
	    <img :src="room.image" alt="room.name" />
	  </md-avatar>

	  <div class="md-list-text-container">
	    <span>{{room.name}}</span>
	    <p>{{room.subtitle}}</p>
	  </div>

	  <p>{{formattedTime}}</p>

	  <md-divider class="md-inset"></md-divider>
	</md-list-item>
</template>

<script>
	export default {
		props: ['room'],
		computed: {
			formattedTime: function() {
				return formatAMPM(this.room.updated_at)
			}
		}
	}

	function formatAMPM(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}
</script>