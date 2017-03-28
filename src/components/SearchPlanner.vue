<template>
    <md-chips v-model="getIndex" :md-max="60">
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
            ])
            
                
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
    .md-list-item .md-button:not(.md-button-ghost):not(.md-list-item-container) {
        position: absolute !important;
    }
</style>

