import React, { useState, useEffect } from "react";
import HSPService from '../services/apiRTT';
import { Line } from 'react-chartjs-2';

import "./rtt.css"

import LocationDetailed from "../componants/RTTComp/locationDetailed";
import ServiceUID from "./RTTComp/serviceuid";
import CountServices from "./RTTComp/countServices";

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
// interface locationcontainer {
//     locationDetail: string;
//     serviceUid: string;
//     runDate: string;
//     trainIdentitydetailed: string;
//     runningIdentity: string;
//     atocCode: string;
//     atocName: string;
//     serviceType: string;
//     isPassanger: boolean;
//     plannedCancel: boolean;
//     origin: any;
//     destination: any;
//     countdownMinutes: number;
// }

// interface location {
//     realtimeActivated: boolean;
//     tiploc: string;
//     crs: string;
//     description: string;
//     wttBookedArrival: string;
//     wttBookedDeparture: string;
//     wttBookedPass: string;
//     gbttBookedArrival: string;
//     gbttBookedDeparture: string;
//     origin: string;
//     destination: string;
//     isCall: boolean;
//     isCallPublic: boolean;
//     realtimeArrival: string;
//     realtimeArrivalNoReport: string;
//     realtimeWttArrivalLateness: number;
//     realtimeGbttArrivalLateness: number;
//     realtimeDeparture: string;
//     realtimeDepartureActual: string;
//     realtimeDepartureNoReport: string;
//     realtimeWttDepartureLateness: number;
//     realtimeGbttDepartureLateness: number;
//     realtimePass : string;
//     realtimePassNoReport: string;
//     realtimeWttPassLateness: number;
//     platform: string;
//     platformConfirmed: boolean;
//     platformChanged: boolean;
//     line : string;
//     lineConfirmed: boolean;
//     path : string;
//     pathConfirmed: boolean;
//     cancelReasonCode: string;
//     cancelReasonShortText: string;
//     cancelReasonLongText: string;
//     displayAs: string;
//     serviceLocation: string;
// }

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
};

let RTTCall = (props) => {

    let [data, setData] = useState('');
    let [loading, setLoading] = useState(true);
    let [count, setCount] = useState({});
    let [dataset, setDataset] = useState({});

    let station_start = props?.start ? props.start : "WAT" ;
    let station_end = props?.end ? props.end : "EGH";


    let getData = async () => {
        let response = await HSPService.getRTTData(station_start, station_end);
        setData(response);
        
    };

    let getCount = async () => {
        setCount(await CountServices(await HSPService.getRTTData(station_start, station_end)));
        return 1
    }

    useEffect(() => {
        const fetchData = async () => {
            await getData();
            const fetchedCount = await getCount();
    
            if (fetchedCount) {
                const labels = Object.keys(count);
    
                const countDataset = {
                    labels,
                    datasets: [{
                        label: 'Train Concurrent Data',
                        data: labels.map((key) => count[key].length),
                        borderColor: 'rgb(52, 52, 52)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)'
                    },
                    {
                        label: 'Train CC Data AVG 3',
                        data: labels.map((key, index) => (count[key].length 
                            + (count[labels[index + 1]] ? count[labels[index + 1]].length : count[key].length) 
                            + (count[labels[index - 1]] ? count[labels[index - 1]].length : count[key].length)) 
                            / 3),
                        borderColor: 'rgb(200, 52, 52)',
                        backgroundColor: 'rgba(200, 162, 235, 0.5)'
                    },
                    {
                        label: 'Train CC Data AVG 5',
                        data: labels.map((key, index) => (count[key].length 
                            + (count[labels[index + 1]] ? count[labels[index + 1]].length : count[key].length) 
                            + (count[labels[index + 2]] ? count[labels[index + 2]].length : count[key].length)
                            + (count[labels[index - 1]] ? count[labels[index - 1]].length : count[key].length) 
                            + (count[labels[index - 2]] ? count[labels[index - 2]].length : count[key].length))
                            / 5),
                        borderColor: 'rgb(230, 102, 52)',
                        backgroundColor: 'rgba(230, 212, 235, 0.5)'
                    },
                    ]
                };
                
                console.log(countDataset)

                setDataset(countDataset);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [loading]);

    if (loading) {
        return (
            <div className="App">
            <h1>Train Route Concurrent RealTimeTrains</h1>
            <p>Loading...</p>
            </div>
        );
    }

    return (
    <div className="App">
        Starting Station: {JSON.stringify(data.location.name)}
        <br/>
        Destination: {JSON.stringify(data?.filter.destination.name)}
        <br/>
        <button onClick={() => {
                        setLoading(true);
                        getCount();
                        getData();
                    }
                    }>Refresh RTT Call</button>
        <br/>
        {/* <p>{JSON.stringify(count)}</p> */}
        <div className="graph">
            <Line
                data = {dataset}
                options={options}
            />
        </div>
        
        {/* {data.services.map((service) => {
            return (
                <>

                    <div key={JSON.stringify(service?.serviceUid)}>
                        <h2>{JSON.stringify(service?.serviceUid)}</h2>


                        < LocationDetailed data={service?.locationDetail} />


                        <p>{JSON.stringify(service?.runDate)}</p>

                        <h2>SUID Call Data</h2>
                        <p> SUID : {JSON.stringify(service?.serviceUid)}</p>

                        <ServiceUID  uid={service?.serviceUid} date={service?.runDate} />

                        <p>{JSON.stringify(service?.runningIdentity)}</p>
                        <p>{JSON.stringify(service?.atocCode)}</p>
                        <p>{JSON.stringify(service?.atocName)}</p>
                        <p>{JSON.stringify(service?.serviceType)}</p>
                        <p>{JSON.stringify(service?.isPassenger)}</p>
                        <p>{JSON.stringify(service?.plannedCancel)}</p>
                        <p>{JSON.stringify(service?.origin)}</p>
                        <p>{JSON.stringify(service?.destination)}</p>
                        <p>{JSON.stringify(service?.countdownMinutes)}</p>
                    </div>
                </>
            )}
        )} */}

    </div>
    );
}

export default RTTCall;