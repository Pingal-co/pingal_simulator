<template>
    <md-chips v-model="keywords" :md-max="30" md-static>
    <template scope="chip">            
        <span>{{ chip.value }}</span>
        <small v-if="chip.value === first_key">(favorite)</small>
    </template>
    </md-chips>

    <!--

    -->
</template>

<script>
	export default {
		props: ['terms'],
        computed: {
            first_key(){
                return Object.keys(this.terms[0])[0]
            },
            keywords() {
                    let obj = this.terms ? this.terms[0] : {}
                    let key = obj && Object.keys(obj)[0]
                    return [key].concat(obj[key])
                /*
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
                
            }
        }
    }
	
</script>