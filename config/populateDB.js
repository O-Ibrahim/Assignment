const { dataSource } = require(".");
const csv = require("csvtojson");
const _ = require("lodash");

const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Movie = require("../models/Movie");

extractActors = line => {
  const res = [];
  const actor1 = {};
  const actor2 = {};
  const actor3 = {};

  actor1.name = line.actor_1_name;
  actor1.facebook_likes = line.actor_1_facebook_likes;
  actor1.age = 0;
  actor1.facebook_page_link = "";

  actor2.name = line.actor_2_name;
  actor2.facebook_likes = line.actor_2_facebook_likes;
  actor2.age = 0;
  actor2.facebook_page_link = "";

  actor3.name = line.actor_3_name;
  actor3.facebook_likes = line.actor_3_facebook_likes;
  actor3.age = 0;
  actor3.facebook_page_link = "";

  res.push(actor1);
  res.push(actor2);
  res.push(actor3);
  return res;
};

extractDirector = line => {
  let director = {};
  if (!line.director_name) {
    return director;
  }
  director.name = line.director_name;
  director.facebook_likes = line.director_facebook_likes;
  director.age = 0;
  director.username = line.director_name;
  director.password = "P@ssw0rd";

  return director;
};

extractMovie = line => {
  let movie = {};
  movie.title = line.movie_title;
  movie.duration = line.duration;
  movie.gross = line.gross;
  movie.genre = line.genres.split("|");
  movie.num_voted_users = line.num_voted_users;
  movie.cast_total_facebook_likes = line.cast_total_facebook_likes;
  movie.plot_keywords = line.plot_keywords.split("|");
  movie.imdb_link = line.movie_imdb_link;
  movie.num_user_for_reviews = line.num_user_for_reviews;
  movie.language = line.language;
  movie.country = line.country;
  movie.content_rating = line.content_rating;
  movie.budget = line.budget;
  movie.title_year = line.title_year;
  movie.imdb_score = line.imdb_score;
  movie.aspect_ratio = line.aspect_ratio;
  movie.movie_facebook_likes = line.movie_facebook_likes;
  movie.actors = [line.actor_1_name, line.actor_2_name, line.actor_3_name];
  if (line.director_name) movie.director = line.director_name;
  movie.color = line.color;
  return movie;
};

const addMovies = async movies => {
  try {
    return await Movie.collection.insertMany(movies);
  } catch (err) {
    console.log("Error adding movies: ", err);
  }
};

const insertActors = async actors => {
  try {
    actors = await _.uniqBy(actors, actor => actor.name);
    await Actor.collection.insertMany(actors);
  } catch (err) {
    console.log("Error Adding Actors: ", err);
  }
  return actors;
};

const insertDirectors = async directors => {
  directors = _.uniqBy(directors, director => director.name);
  await Director.collection.insertMany(directors);
  return directors;
};

const populateDB = async () => {
  Movie.countDocuments(async (err, count) => {
    if (err) {
      console.log(err);
      return;
    }
    if (count === 0) {
      //Read CSV
      const jsonArray = await csv().fromFile(dataSource);
      let actors = [];
      let directors = [];
      let movies = [];

      //parse CSV line by line and push results in their respected arrays
      jsonArray.forEach(line => {
        actors.push(...extractActors(line));
        directors.push(extractDirector(line));
        movies.push(extractMovie(line));
      });

      _.remove(actors, _.isEmpty);
      //Insert Actors
      actors = await insertActors(actors);

      //Insert Directors
      _.remove(directors, _.isEmpty);
      directors = await insertDirectors(directors);

      //Swapping actor and director names with IDs
      movies.forEach(movie => {
        for (let i = 0; i < movie.actors.length; i++) {
          movie.actors[i] = actors.find(a => a.name == movie.actors[i])._id;
        }
        if (movie.director != null && movie.director != "") {
          movie.director = directors.find(d => d.name == movie.director)._id;
        }
      });

      //Insert movies
      await addMovies(movies);

      //Done
      console.log("Done Seeding DB");
    }
  });
};
module.exports = populateDB;
