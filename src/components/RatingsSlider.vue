<template>
	<div class="RatingsSlider">
		<input v-on:change="$emit('current_rating')" type="range" min="0" max="10" v-model:value="current_rating" step="0.5" class="RatingsSlider_slider" id="myRange" @input="onInput">
		
		<input type="text" v-model:value="current_rating" class="RatingsSlider_value" > 
		

	</div>
</template>

<script>

export default {
  name: 'RatingsSlider',
  props:[],
  data () {
    return {
		title: 'Adjust Ratings',
		current_rating: 5
    }
  },

  methods:{
  	onInput(event){
  		this.$emit('changeRating', event.target.value)
  	}
  }
  
  
}
</script>


<style lang="scss" scoped>

$red : red;

.RatingsSlider_slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;


	&:hover {
	    opacity: 1; /* Fully shown on mouse-over */
	}

	&::-webkit-slider-thumb {
	    -webkit-appearance: none; /* Override default look */
	    appearance: none;
	    width: 25px; /* Set a specific slider handle width */
	    height: 25px; /* Slider handle height */
	    background: $red; /* Green background */
	    cursor: pointer; /* Cursor on hover */
	}

	&::-moz-range-thumb {
	    width: 25px; /* Set a specific slider handle width */
	    height: 25px; /* Slider handle height */
	    background: #4CAF50; /* Green background */
	    cursor: pointer; /* Cursor on hover */
	}





}

</style>
