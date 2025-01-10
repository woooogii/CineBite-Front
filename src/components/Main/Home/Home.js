import React from 'react';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';
function Home() {
  return (
    <div>
      <MovieRanking />
      <MovieReview />
      <MovieToday />
    </div>
  );
}

export default Home;
