import React, { useState, useEffect } from "react";
import HSPService from '../services/apiRTT';

let NRClass = () => {

    let [data, setData] = useState('');
    let [loading, setLoading] = useState(true);

    let station_start = "WAT";
    let station_end = "EGH";


    let getData = async () => {
        let response = await HSPService.getServiceMetrics(station_start, station_end);
        setData(response);
        setLoading(false);
    };

    useEffect(() => {

        getData();
    }, []);

    if (loading) {
    return (
        <div className="App">
        <h1>Train Route Concurrent National Rail</h1>
        <p>Loading...</p>
        </div>
    );
    }

    return (
    <div className="App">
        <h1>Train Route Concurrent National Rail</h1>
        {JSON.stringify(data)}
        <button onClick={() => {
        setLoading(true);
        getData();
        }
        }>Refresh National Rail Call</button>
    </div>
    );
}

export default NRClass;