import './App.css';
import { useState, useEffect } from 'react';
import MovieDisplay from './components/MovieDisplay';
import Form from './components/Form';
import axios from 'axios';

function App() {
  //movieData State
  const [movieData, setMovieData] = useState(null);

  async function search(searchTerm) {
    try {
      if (searchTerm === '') {
        var minm = 1000000;
        var maxm = 6999999;

        let randomNumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

        let res = await axios.get(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_Key
          }&i=tt${randomNumber}`
        );
        setMovieData(res.data);
      } else {
        let res = await axios.get(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_Key
          }&t=${searchTerm}`
        );
        setMovieData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    search('');
  }, []);

  // console.log(import.meta.env.VITE_API_Key);

  return (
    <>
      <h1>My Movie App</h1>
      <Form getMovie={search} />
      <MovieDisplay movie={movieData} />
    </>
  );
}

export default App;
