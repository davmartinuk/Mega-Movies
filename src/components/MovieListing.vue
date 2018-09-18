<template v-if="movies">

	<section v-if="movies_error">
	    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  	</section>
 	<section v-else>
	  <p v-if="movies_loading" class="MovieListing__loading">Movies not loading</p>
	  <ul v-else class="MovieListing">
  		
		  	<li transition name="fade" class="MovieListing_item" v-for="(movie,index) in orderedByPopularity" v-if="movie.vote_average > default_rating && isGenreSelected(movie.genre_ids)">
		    		
		    		<img :src="image_loc + movie.poster_path" class="MovieListing__img img-rounded" />
			    	<h3>{{movie.title}}</h3>
			    		
			    	
					<section v-if="genre_error">
					    <p>Genres not found</p>
			  		</section>
						    	
			    	<p v-if="genre_loading" class="MovieListing__loading">Loading Genres</p>
			    	<p v-else>
		    			<font-awesome-icon icon="grin" /> {{findGenreName(movie.genre_ids) | arrayToString}} {{movie.genre_ids}}
			    	</p>

			    	<p class="MovieListing__vote"><font-awesome-icon icon="star" /> {{movie.vote_average}}</p>
			    	<p class="MovieListing__popularity"><font-awesome-icon icon="fire" /> {{movie.popularity | decimalPlace}}</p>
		    	</span>
		  	</li>

		  	
	  	
	  </ul> 
  	</section>
</template>

<script>

import axios from 'axios';

export default {
  name: 'MovieListing',
  props:[
  	'genres',
  	'genres_selected',
  	'genre_error',
  	'genre_loading',
  	'movies',
  	'movies_loading',
  	'movies_error',
  	'default_rating'],
  data () { 
    return {
      title: 'Movie Listings',
      image_loc: 'http://image.tmdb.org/t/p/w185'
    }
  },
  computed: { 
  	orderedByPopularity: function () {  
	    return _.orderBy(this.movies.data.results, 'popularity | asc') 
	},

  },

  methods:{
  	findGenreName: function(movieGenre){
		var the_genres, genre_names = new Array(); 		
		the_genres = this.genres.data.genres;

		movieGenre.forEach(function(val,index) { 
   			var genre_id = val;
 			
   			the_genres.forEach(function(val,index) { 
   				//Matched a genre ID
   				if(genre_id === the_genres[index].id) {
   					genre_names.push(the_genres[index].name);
   				}
   			});
		});  

		return genre_names;
	},
	isGenreSelected:function(genres){
		//This 
		var found_genre = 0;
		
		if (this.genres_selected.length === 0) {
			// If no genre is selected just output them all and return
			return true;
		}

		this.genres_selected.forEach(function(val, index){
			if(genres.includes(val)){
				found_genre++
			}
		});

		if(found_genre){
			return true;
		}		
	}
  },

  filters: {
	 	arrayToString: function (val) {
	    	if (!val) return ''
	    	val.join(', ++')	
	   		val = val.join(', ').toString()
	    	return val.charAt(0).toUpperCase() + val.slice(1); 
	  	},
	  	decimalPlace: function(val){
	  		var multiplier = Math.pow(10, 1 || 0);
    		return Math.round(val * multiplier) / multiplier;
	  	}

	}
  
}
</script>

<!-- I would usually do this in BEM in SASS with a suitable framework perhaps, but for quick prototyping this seems fine. -->

<style lang="scss" scoped>
.MovieListing {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
}

.MovieListing_item {
	width: 30%;
	opacity: 1;
	margin-bottom:20px;
}

.MovieListing__img {
	margin-bottom:10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (min-width: 0px) and (max-width: 700px) {
	.MovieListing_item {
		width: 100%;
	}
}
</style>
