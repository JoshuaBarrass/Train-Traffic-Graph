
import React, { useState, useEffect } from 'react';
import HSPService from "../../services/apiRTT";
import LocationDetailed from "./locationDetailed";

// serviceUid	-	Contains the service identifier for this service, paired with the run date this will always be a unique identifier. Service UIDs use the following regex pattern [A-Z][0-9]{5}.
// runDate	-	Contains the running date of this service, based on its departure time from the first origin. In format YYYY-MM-DD.
// serviceType	-	Contains the type of service this is, bus, ship or train.
// isPassenger	-	boolean output determining whether the service is a passenger service or not
// trainIdentity detailed	-	The train identity that this service was planned to run to. FOC operated services will always show as FRGT.
// powerType detailed	-	The power type of the service. This is as described in the Network Rail CIF documentation.
// trainClass	null	The classes that this service conveys. This is as described in the Network Rail CIF documentation. If the field is blank and is a passenger train, the train conveys first and standard class accommodation only.
// sleeper	null	The types of sleeper that this service conveys. This is as described in the Network Rail CIF documentation.
// atocCode	ZZ	The two character identifier, as used by ATOC, to identify the service operator, example: SW
// atocName	Unknown	Service operator, example: South West Trains
// performanceMonitored	-	boolean output detailing whether the service is subject to PPM (Public Performance Measurement) monitoring.
// origin	-	Array of Pair objects forming the overall origins of the service, detailed further down.
// destination	-	Array of Pair objects forming the overall destination of the service, detailed further down.
// locations	-	Array of Location objects forming the locations that the service calls at (and, in detailed, passes).
// realtimeActivated	false	Details whether this service has been activated for realtime information
// runningIdentity	-	This field appears if realtimeActivated is set as true. It identifies the current running identity of the service.


let ServiceUID = (uid, date) => {

    let [Loading, setLoading] = useState(true);

    let [data, setData] = useState('');

    let getData = async () => {

        console.log("ServiceUID: " + JSON.stringify(uid));
        console.log("Run date: " + JSON.stringify(uid.date));

        let response = await HSPService.getRTTDataSUID(uid.uid, uid.date);
        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    if (Loading) {
        return (
            <>
                <h1>ServiceUID</h1>
                <p>Loading...</p>
            </>
        );
    }

    return (
        <>
            <h1>ServiceUID</h1>
            <p>Service UID : {JSON.stringify(data.ServiceUID)}</p>
            <p>Run Date : {JSON.stringify(data.runDate)}</p>
            <p>Service Type : {JSON.stringify(data.serviceType)}</p>
            <p>Is Passenger : {JSON.stringify(data.isPassenger)}</p>
            <p>Train Identity : {JSON.stringify(data.trainIdentity)}</p>
            <p>Power Type : {JSON.stringify(data.powerType)}</p>
            <p>Train Class : {JSON.stringify(data.trainClass)}</p>
            <p>Sleeper : {JSON.stringify(data.sleeper)}</p>
            <p>ATOC Code : {JSON.stringify(data.atocCode)}</p>
            <p>ATOC Name : {JSON.stringify(data.atocName)}</p>
            <p>Performance Monitored : {JSON.stringify(data.performanceMonitored)}</p>
            <p>Origin : {JSON.stringify(data.origin)}</p>
            <p>Destination : {JSON.stringify(data.destination)}</p>

            <table>
                <tr>
                    <th>tiploc</th>
                    <th>crs</th>
                    <th>description</th>
                    <th>gbttBookedArrival</th>
                    <th>gbttBookedDeparture</th>
                    <th>wttBookedArrival</th>
                    <th>isCall</th>
                    <th>isCallPublic</th>
                    <th>realtimeArrival</th>
                    <th>realtimeDeparture</th>
                    <th>realtimeDepartureActual</th>
                    <th>lineConfirmed</th>
                    <th>pathConfirmed</th>
                    <th>displayAs</th>
                    <th>serviceLocation</th>
                </tr>

                {data.locations.map((location) => {
                    return (
                        <tr key={JSON.stringify(location?.tiploc)}>
                            <td>{JSON.stringify(location?.tiploc)}</td>
                            <td>{JSON.stringify(location?.crs)}</td>
                            <td>{JSON.stringify(location?.description)}</td>
                            <td>{JSON.stringify(location?.gbttBookedArrival)}</td>
                            <td>{JSON.stringify(location?.gbttBookedDeparture)}</td>
                            <td>{JSON.stringify(location?.wttBookedArrival)}</td>
                            <td>{JSON.stringify(location?.isCall)}</td>
                            <td>{JSON.stringify(location?.isCallPublic)}</td>
                            <td>{JSON.stringify(location?.realtimeArrival)}</td>
                            <td>{JSON.stringify(location?.realtimeDeparture)}</td>
                            <td>{JSON.stringify(location?.realtimeDepartureActual)}</td>
                            <td>{JSON.stringify(location?.lineConfirmed)}</td>

                            <td>{JSON.stringify(location?.pathConfirmed)}</td>
                            <td>{JSON.stringify(location?.displayAs)}</td>
                            <td>{JSON.stringify(location?.serviceLocation)}</td>
                        </tr>
                    );
                })}
            </table>


            <p>Realtime Activated : {JSON.stringify(data.realtimeActivated)}</p>
            <p>Running Identity : {JSON.stringify(data.runningIdentity)}</p>
        </>
    );


}

export default ServiceUID;