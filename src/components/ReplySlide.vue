<template>
	<md-card class="reply-card">
		<md-card-area md-inset>
		  <div class="user-name">
		    {{slide.author_name}}
		    <span class="datetime">{{datetime}}</span>
		  </div>
		  <md-card-content>
		    <avatar :name="slide.author_name" />
		    <div class="reply-text">
		        <div class="md-title">{{ slide.text }}</div>                  
		    </div>                 
		  </md-card-content> 
		</md-card-area>
	</md-card>
</template>

<script>
	import moment from 'moment';
	import Avatar from '@/components/Avatar'

	export default {
		props: ['slide'],
		components: {
			Avatar
		},
		computed: {
	      datetime() {
	         return moment(this.slide.inserted_at).calendar(null, {
	                    sameDay: 'h:mm a',
	                    nextDay: '[The Future]',
	                    nextWeek: "[How's your time machine work?]",
	                    lastDay: '[Yesterday at] h:mm a',
	                    lastWeek: 'dddd [at] h:mm a',
	                    sameElse: 'h:mm a [on] MMMM Do[,] YYYY'
	                });
	      }
	    }
	}
</script>

<style lang="scss" scoped>
	.user-name {
      font-size: 12px;
      color: rgb(160, 160, 160);
      margin-left: 58px;
      margin-bottom: -12px;
    }
    .md-card-content {
        padding: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .datetime {
      padding-left: 28px;
      visibility: hidden;
    }
    .reply-text {
        display: flex;
        flex-direction: column;
    }
    .md-title {
        font-size: 16px !important;
        font-weight: 400;
        overflow-wrap: break-word;
    }
    .reply-card:hover .datetime {
		visibility: visible;
	}
</style>