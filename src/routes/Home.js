import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';


class Home extends React.Component{
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async() => {
    const {
      data:{
        data: {movies}
      }
    } = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_py=rating&limit=15');
    this.setState({ movies: movies, isLoading: false})
  }

  componentDidMount() {
    // 영화 데이터 로딩
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading ....</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
            <Movie 
              key = {movie.id} //에러메시지 방지용
              id = {movie.id}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />
          ))}
        </div>
      )}
    </section>
    );
  }
}
export default Home;