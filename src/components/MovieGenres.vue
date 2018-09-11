<template v-if="genres">
 	<div class="MovieGenres">
  	 	<h2><font-awesome-icon icon="grin" /> Genres</h2>
		<section v-if="genre_error">
		    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
	  	</section>

	  	<section v-else>
			<div class="MovieGenres__list">
				<div v-if="genre_loading" class="MovieGenre__error"></div>
				<div v-else class="MovieGenres__item checkbox" v-for="(genre, index) in genres.data.genres" :key="index" >
		  			<label><input type="checkbox" :id="genre.id" :value="genre.id" v-model="checked_genres" @change="onInput"/>{{genre.name}}</label>

		  		</div>
		  	</div> 
		</section>
 	</div>
</template>

<script>

export default {
  name: 'MovieGenres',
  props:['genres', 'genre_loading', 'genre_error'],
  data () {
    return {
		title: 'Genres',
		checked_genres: []
    }
  },
  methods:{
  	onInput(event){
  		//console.log(this.checked_genres);
  		this.$emit("changeGenre",this.checked_genres);
  	}
  }
  
  
}

</script>

<!-- I would usually do this in BEM in SASS with a suitable framework perhaps, but for quick prototyping this seems fine. -->

<style lang="scss" scoped>

.MovieGenres {
	display:inline-block;
}

.MovieGenres__list {
	list-style-type: none;
	text-align: left;
}
</style>