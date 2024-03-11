
import "../RTTComp/locationDetailed.css";

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

let LocationDetailed = (locationDetailed) => {

    // console.log("Location Detailed: " + JSON.stringify(locationDetailed));

    let data = locationDetailed.data;

    return (
        <>
            <h1>Location Detialed outlook</h1>
            <div className="locationdetailed">
                <p>realtimeActivated : {JSON.stringify(data.realtimeActivated)}</p>
                <p>tiploc : {JSON.stringify(data.tiploc)}</p>
                <p>crs : {JSON.stringify(data.crs)}</p>
                <p>description : {JSON.stringify(data.description)}</p>
                <p>wttBookedArrival : {JSON.stringify(data.wttBookedArrival)}</p>
                <p>wttBookedDeparture : {JSON.stringify(data.wttBookedDeparture)}</p>
                <p>wttBookedPass : {JSON.stringify(data.wttBookedPass)}</p>
                <p>gbttBookedArrival : {JSON.stringify(data.gbttBookedArrival)}</p>
                <p>gbttBookedDeparture : {JSON.stringify(data.gbttBookedDeparture)}</p>
                <p>origin : {JSON.stringify(data.origin)}</p>
                <p>destination : {JSON.stringify(data.destination)}</p>
                <p>isCall : {JSON.stringify(data.isCall)}</p>
                <p>isCallPublic : {JSON.stringify(data.isCallPublic)}</p>
                <p>realtimeArrival : {JSON.stringify(data.realtimeArrival)}</p>
                <p>realtimeArrivalNoReport : {JSON.stringify(data.realtimeArrivalNoReport)}</p>
                <p>realtimeWttArrivalLateness : {JSON.stringify(data.realtimeWttArrivalLateness)}</p>
                <p>realtimeGbttArrivalLateness : {JSON.stringify(data.realtimeGbttArrivalLateness)}</p>
                <p>realtimeDeparture : {JSON.stringify(data.realtimeDeparture)}</p>
                <p>realtimeDepartureActual : {JSON.stringify(data.realtimeDepartureActual)}</p>
                <p>realtimeDepartureNoReport : {JSON.stringify(data.realtimeDepartureNoReport)}</p>
                <p>realtimeWttDepartureLateness : {JSON.stringify(data.realtimeWttDepartureLateness)}</p>
                <p>realtimeGbttDepartureLateness : {JSON.stringify(data.realtimeGbttDepartureLateness)}</p>
                <p>realtimePass : {JSON.stringify(data.realtimePass)}</p>
                <p>realtimePassNoReport : {JSON.stringify(data.realtimePassNoReport)}</p>
                <p>realtimeWttPassLateness : {JSON.stringify(data.realtimeWttPassLateness)}</p>
                <p>platform : {JSON.stringify(data.platform)}</p>
                <p>platformConfirmed : {JSON.stringify(data.platformConfirmed)}</p>
                <p>platformChanged : {JSON.stringify(data.platformChanged)}</p>
                <p>line : {JSON.stringify(data.line)}</p>
                <p>lineConfirmed : {JSON.stringify(data.lineConfirmed)}</p>
                <p>path : {JSON.stringify(data.path)}</p>
                <p>pathConfirmed : {JSON.stringify(data.pathConfirmed)}</p>
                <p>cancelReasonCode : {JSON.stringify(data.cancelReasonCode)}</p>
                <p>cancelReasonShortText : {JSON.stringify(data.cancelReasonShortText)}</p>
                <p>cancelReasonLongText : {JSON.stringify(data.cancelReasonLongText)}</p>
                <p>displayAs : {JSON.stringify(data.displayAs)}</p>
                <p>serviceLocation : {JSON.stringify(data.serviceLocation)}</p>


            </div>
        </>
    );

};

export default LocationDetailed;