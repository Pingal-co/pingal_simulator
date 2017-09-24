<template>
    <md-chips v-model="getIndex" @change="change" :md-max="maxCount" class="chips" :md-input-placeholder="placeholder">
        <template scope="chip">            
            <span>{{ chip.value }}</span>
            <small v-if="chip.value === getKeyPhrase">(favorite)</small>
        </template>
    </md-chips>

    <!--

    -->
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
	export default {
		// props: ['terms'],
        // mix the getters into computed with object spread operator
        computed: {
            ...mapGetters([
                'getKeyPhrase',
                'getIndex'
            ]),
            placeholder() {
                if (this.getIndex.length >= this.maxCount) {
                    return this.maxCount + '/' + this.maxCount
                } else {
                    console.log(this.getIndex)
                    return 'Add Interest... ' + this.getIndex.length + '/' + this.maxCount
                }
            },
            maxCount() {
                return 100
            }         
        },
        methods: {
            change() {
                this.$store.commit('UPDATE_CURRENT_SLIDE_BRAIN_INDEX', this.getIndex)
            }
        }
    }


/*
            ,
            first_key(){
                return Object.keys(this.terms[0])[0]
            },
            keywords() {
                    let obj = this.terms ? this.terms[0] : {}
                    let key = obj && Object.keys(obj)[0]
                    return [key].concat(obj[key])

                // getter
                get: () => { 
                    console.log(this.terms)
                    let obj = this.terms ? this.terms[0] : {}
                    console.log(obj)
                    let key = obj && Object.keys(obj)[0]
                    console.log(key)
                    return [key].concat(obj[key])
                }
                // setter
                
                set: (updatedTerms) => {
                    let key = this.first_key
                    this.terms = [{ key : updatedTerms }]
                }
                */
	
</script>

<style lang="scss">
    .md-list-item .chips .md-button:not(.md-button-ghost):not(.md-list-item-container) {
        position: absolute !important;
    }
</style>

