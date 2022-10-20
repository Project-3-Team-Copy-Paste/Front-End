import React, { useEffect, useState } from "react";
import MovieItem from "../shared/MovieItem";
import fetchData from "../../functions/fetch";

function LibraryPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData().then((res) => {
            setData([...res]);
        });
    }, []);

    function renderData() {
        if ((data.length === 0)) {
            return <p>Loading...</p>;
        } else {
            return data.map((movie) => {
                return <MovieItem key={movie.tt_id} movie={movie} />;
            });
        }
    }

    return <div>{renderData()}</div>;
}

export default LibraryPage;
