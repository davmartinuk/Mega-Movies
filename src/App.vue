<template>
  <div id="app"> 
    <div class="container">
      
      <!-- HEADER -->
      <div class="header">
          <div class="jumbotron">
          <h1>{{app_name}} <font-awesome-icon icon="film" /></h1> 
          </div> 
      </div>
      <!--/ HEADER -->
      <div class="ContentContainer">
        <div class="LeftNav">
          <RatingsSlider v-on:changeRating="onChangeRating" />
          <MovieGenres v-on:changeGenre="onChangeGenre"
            :genres="genres"
            :genre_error="genre_error" 
            :genre_loading="genre_loading" 
            :show_genres="show_genres"        
          />
        </div>
        <div class="Main">
        <MovieListing 
            :movies_loading="movies_loading" 
            :movies_error="movies_error" 
            :movies="movies"

            :genres="genres"
            :genres_selected="genres_selected"  
            :genre_error="genre_error" 
            :genre_loading="genre_loading"
              
            :api_key="api_key" 
            :api_loc="api_loc" 
            :api_query="api_query"

            :default_rating="default_rating"
          />
        </div>
      </div>
      <!-- FOOTER -->
      <footer class="Footer footer">
        <div class="container">
          <span class="text-muted">&copy; Copyright {{app_name}} {{ new Date().getFullYear() }}</span>
        </div>
      </footer>
      <!-- /FOOTER -->
    </div><!--/container-->
  </div>


</template>

<script>

import HelloWorld from './components/HelloWorld' // Not used
import MovieListing from './components/MovieListing'
import MovieGenres from './components/MovieGenres'
import RatingsSlider from './components/RatingsSlider'

import axios from 'axios';
import VueLodash from 'vue-lodash'

export default {
  name: 'App',
  components: {
    RatingsSlider,
    MovieListing,
    MovieGenres

  },
  data () {
      return {
        app_name: 'Mega Movies',

        movies: ' ',
        movies_error: false,
        movies_loading: true,
        
        genres: ' ',
        genres_selected: [],
        genre_error: false,
        genre_loading: true,
        
        api_key: '?api_key=09e86d901fa3acb38450fb72cfdd402c',  
        api_loc: 'https://api.themoviedb.org/3',
        api_genres_loc: 'https://api.themoviedb.org/3/genre/movie/list',
        api_query: '/discover/movie',

        default_rating: 5,
      }
  },
  mounted () {
      // Loading the data from both APIs
      axios
        .get(this.api_loc + this.api_query + this.api_key)
        .then(
          response => (this.movies = response)
        )
        .catch(error => {
          console.log('Movies says: '+error)
          this.movies_error = true
        })  
        .finally(() => this.movies_loading = false)
      
      axios
        .get(this.api_genres_loc + this.api_key)
        .then(
          response => (this.genres = response)
        )
        .catch(error => {
          console.log('Genres says: '+error)
          this.genre_error = true
        })
        .finally(() => this.genre_loading = false) 

  },
  methods: {
    onChangeRating(val){
      this.default_rating = val;
    },
    onChangeGenre(val){
      this.genres_selected = val;
    }

  }, 

  computed: {
      // finds all unique ids
      found_genres: function () {
        var all_genres = [];

        this.movies.data.results.forEach(function(val,index){
            val.genre_ids.forEach(function(val){
                all_genres.push(val);
            })
        });

        all_genres = _.uniqBy(all_genres);
        
        return all_genres // returns all genres found in movie list
      },

      show_genres: function(){
         if (!this.genre_loading){
          var the_genres = new Array(), genre_names = new Array();    
          
          the_genres = this.genres.data.genres;

          this.found_genres.forEach(function(val,index) { 
              var genre_id = val;
            
              the_genres.forEach(function(val,index) { 
                //Matched a genre ID
                if(genre_id === the_genres[index].id) {
                  genre_names.push({
                          name: the_genres[index].name,
                          id:  the_genres[index].id
                      });
                }
              });
          });  

          return genre_names;
         }

  

      }

    }


}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;


}

.ContentContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.LeftNav {
  flex: 0 0 230px;
}

.Main {
  flex: 1;
}

.Footer {
  padding:20px 0;
  border-top:1px solid #DDD;
}

</style>
