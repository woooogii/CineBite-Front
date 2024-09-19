import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowButton } from '../../../utils/ArrowButton';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

const MovieSlider = ({ title, endpoint, param, linkTo }) => {
    const [dataList, setDataList] = useState([]);
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;
    const getDataList = async () => {
        try {
            const response = await axios.post(endpoint, param);
            console.log('키워드별 데이터 출력:', response.data);
            setDataList(response.data);
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    };

    useEffect(() => {
        getDataList();
    }, [JSON.stringify(param)]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        nextArrow: <ArrowButton direction="next"/>,
        prevArrow: <ArrowButton direction="prev"/>,
    };

    return (
        <div>
        <div className='today-title'>
            <Link to={`${linkTo}`} className='title-link'>
                <h2>{title}</h2>
                <span className='view-all-link'>모두 보기</span>
                <div className='view-all-link-chevron'><FaChevronRight /></div>
            </Link>
        </div>
        <div className='today-recomend'>
            {dataList.length > 0 ? (
                <Slider {...settings}>
                    {dataList.slice(0,12).map((item, index) => (
                        <Link to={`/movie/${item.id}`} key={index}>
                            <div className='today-image'>
                                <img src={`${ImageUrl}${item.poster_path}`} alt={item.title} />
                                <div className="today-rating">{item.rating}%</div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            ) : (
                <p>데이터 없음</p>
            )}
        </div>
    </div>
);
};

export default MovieSlider;