import React, { useEffect, useState } from "react";
import MovieItem from "../shared/MovieItem";
import FetchData from "../../functions/fetch";

function LibraryPage() {
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
            <h2>data.name</h2>
            
        </div>
    }

    return <div>renderData()</div>;
}

export default LibraryPage;
