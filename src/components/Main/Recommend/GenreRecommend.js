import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../styles/Main/Recommend/GenreRecommend.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const GenreRecommend = () => {
    const {genre} = useParams();
    const [movieGenreList, setMovieGenreList] = useState([]);
    

    //페이징
    const [page, setPage] = useState(1);
    const postPerPage = 9;
    const indexOfLastPost = page * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const [currentPost, setCurrentPost] = useState([]);
    const currentPosts = movieGenreList.slice(indexOfFirstPost, indexOfLastPost);

    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate(); 
    const handleGenreClick = (genreId) => {
        navigate(`/movie/${genreId}`, { replace: true });
    };

    //장르별 데이터 출력
    const getMovieGenres = async (genre) => {
        try {
            if (genre) {
                const resp = await axios.post(`${url}/movie/genresList`, 
                    genre, 
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setMovieGenreList(resp.data);
            } else {
                console.error('영화의 장르 데이터가 없습니다.');
            }
        } catch (error) {
            console.error('장르 데이터 가져오기 오류:', error);
        }
    };
    useEffect(()=>{
        getMovieGenres(genre);
    },[genre]);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <>
        <div className='genreList_container'>
            <div className='genre_lst'>
                {currentPosts && currentPosts.map((genre, index) => (
                    <li key={index} onClick={() => handleGenreClick(genre.id)}> 
                        <div className='genre_Img'>
                            <img src={`https://image.tmdb.org/t/p/w500${genre.poster_path}`} alt={genre.title}/>
                        </div>
                        <div className='genre_Info'></div>
                    </li>
                ))}
            </div>
            <Pagination
                activePage={page}
                itemsCountPerPage={postPerPage}
                totalItemsCount={movieGenreList.length}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </div>
        </>
    );
};

export default GenreRecommend;