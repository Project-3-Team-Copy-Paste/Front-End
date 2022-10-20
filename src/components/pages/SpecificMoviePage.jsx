import React, { useEffect, useState } from "react";
import FetchData from "../../functions/fetch";

function SpecificMoviePage() {
	const [data, setData] = useState([]);

    useEffect(() => {
        FetchData().then((fetchData) => {
            setData(fetchData);
        });
    }, []);

	function renderData() {
        if ((data.length = 0)) {
            return <p>Loading...</p>;
        } else {
            return data.map((element) => {
                renderPage(element);
            });
        }
    }

    function renderPage(data){
        <div>
            <img src={data.image} alt="Poster" />
            <h2>{data.name}</h2>
            <h4>{data.datePublished}</h4>
            <div>{data.contentRating}</div>
            <div>{data.genre.map((genre)=>{
                return <span>genre</span>
            })}</div>
            <p>{data.description}</p>
        </div>
    }

    return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
