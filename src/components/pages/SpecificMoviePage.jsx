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
                <MovieItem title={element.title} />; //tt-id
            });
        }
    }

    return <div>SpecificMoviePage</div>;
}

export default SpecificMoviePage;
