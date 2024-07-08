import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./card.css";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className="cards">
                        <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.original_title} />
                        <h3 className="card__title">{movie.title}</h3>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
