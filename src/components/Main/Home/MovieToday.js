import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/Main/Home/movieToday.css';
import { SliderContainer } from '../../../styles/Main/Home/SliderContainer';
import MovieSlider from '../Recommend/MovieSlider';

const MovieToday = () => {
    const url = process.env.REACT_APP_API_URL;
    return (
        <SliderContainer>
            <div className='today-main'>
                <div className='today-main-sub'>
                    <MovieSlider 
                        title="범죄 & 스릴러"
                        endpoint={`${url}/movie/genresList`}
                        param={[{ name: '범죄'}, {name: '스릴러'}]} 
                        linkTo={'/recomend/genre'}
                    />
                    <MovieSlider 
                        title="로맨스 영화"
                        endpoint={`${url}/movie/genresList`}
                        param={[{ name: '로맨스' }]} 
                        linkTo={'/recomend/genre'}
                    />
                    <MovieSlider 
                        title="가족 & 코미디"
                        endpoint={`${url}/movie/genresList`}
                        param={[{ name: '코미디' },{name: '가족'}]} 
                        linkTo={`/recomend/genre`}
                    />
                    <MovieSlider 
                        title="SF & 판타지"
                        endpoint={`${url}/movie/genresList`}
                        param={[{ name: 'SF' },{name: '판타지'}]} 
                        linkTo={`/recomend/genre`}
                    />
                </div>
            </div>
        </SliderContainer>
    );
};

export default MovieToday;