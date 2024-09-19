import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActorRecomend = () => {
    const { actorName } = useParams();
    const [actorList, setActorList] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    
    const getActorList=async(actorName)=>{
        try {
            const response = await axios.post(`${url}/movie/actorList`, { "name": actorName });
            console.log('actorName',actorName);
            console.log('서버 응답:', response.data);
            setActorList(response.data);
        } catch (error) {
            console.error('서버 요청 오류:', error);
        }
    }
    useEffect(()=>{
        getActorList();
    },[])
    
    return (
        <>
    <div className='genreList_container'>
        <div className='genre_lst'>
            {actorList && actorList.map((actor, index) => (
                <li key={index}> 
                    <div className='genre_Img'>
                        <img src={`https://image.tmdb.org/t/p/w500${actor.poster_path}`} alt={actor.title}/>
                    </div>
                    <div className='genre_Info'></div>
                </li>
            ))}
        </div>
    </div>
    </>
    );
};
export default ActorRecomend;