import React from "react";
import "./loading.css"; 

const Loading = () => {
    return (
        <div className="loadingScreen">
            <div className="loadingFilm">
                <span className="circleLoading"></span>
                <span className="circleLoading"></span>
                <span className="circleLoading"></span>
            </div>
        </div>
    );
};

export default Loading;
