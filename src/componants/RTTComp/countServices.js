import HSPService from "../../services/apiRTT"

let callHSPService = async (crsStart, crsEnd) => {
    // This function will call the HSPService.getRTTData(crsStart, crsEnd) function
    // It will then return the data from the call

    let response = await HSPService.getRTTData(crsStart, crsEnd);
    return response;
}

let callHSPServiceDated = async (csrStart, crsEnd, date) => {

    let response = await HSPService.getRTTDated(csrStart, crsEnd, date)
    return response
}

let callHSPServiceSUID = async (suid, date) => {
    // This function will call the HSPService.getRTTDataSUID(suid, date) function

    let response = await HSPService.getRTTDataSUID(suid, date);
    return response;
}

let callHSPServiceStationDated = async (src, date) => {
    // This function will call the HSPService.getRTTDataSUID(suid, date) function

    let response = await HSPService.getRRTstationDated(src, date);
    return response;
}

let getLastMonday = async () => {
    let current = new Date();

    if (current.getDay() === 1) {
        return `${current.getFullYear()}-${(current.getMonth() + 1) < 10 ? `0${current.getMonth() + 1}` : (current.getMonth() + 1)}-${current.getDate()}`
    }

    if (current.getDay() > 1) {
        let date = new Date(current.getFullYear(), current.getMonth(), current.getDate() - (current.getDay() - 1))
        return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)}-${date.getDate()}`
    }

}

let getStationsFromSuidData = (suidData) => {

    let stations = []

    let locations = suidData.locations

    locations.map((Location) => {

        stations.push(Location.crs)

    })
    return stations
}

async function getNextMatch(arrayOne, arrayTwo) {

    for (let i = 0; i < arrayOne.length; i++) {
        const II = arrayOne[i];

        for (let J = 0; J < arrayTwo.length; J++) {
            const JJ = arrayTwo[J];

            if (II === JJ) {
                return II;
            }
        }

    }

    return null
}

async function getLongestArray(arrayOfarrays) {
    let longIndex = 0;
    let longest = 0;

    arrayOfarrays.map((array, index) => {
        if (array.length > longest) {
            longest = array.length;
            longIndex = index;
        }
    })

    return arrayOfarrays[longIndex];

}

async function getStationsOrdered(services, startCrs, endCrs) {

    // get crs codes in order from services by getting location data arrays using callHSPServiceSUID

    let allCRSLocations = [];

    for (let index = 0; index < services.length; index++) {
        const service = services[index];

        let data = await sliceService(service, startCrs, endCrs);

        allCRSLocations.push(data)

    }

    // The N number of arrays from this data need to be compressed down into a single array that's 100% in the correct order
    // In this case, Take 2 arrays: 1 - [WAT, CLJ], 2 - [WAT, VXH, QRB, CLJ]
    // Obviously in this case the correct new ordering is [WAT, VXH, QRB, CLJ]

    // Next Case : 1 - [CLJ, RMD, TWI, FEL, SNS, EGH], 2 - [CLJ, WNT, FEL, AFS, SNS, EGH]
    // In sorting, how do you know if it goes [CLJ , RMD , WNT] OR [CLJ, WNT, RMD]

    let OrderedPasses = []

    for (let i = 0; i < allCRSLocations.length - 1; i++) {

        let current = allCRSLocations[i];
        let next = allCRSLocations[i + 1]

        let currentPass = [];

        //console.log(`Comparing : \n ${current} \n ${next} \n Pass : ${i}`)

        if (current === next) {
            OrderedPasses.push(current)
        }

        while (true) {

            if (current[0] === next[0]) {
                currentPass.push(current[0]);
                current = current.slice(1);
                next = next.slice(1);
            }

            let nextMatch = await getNextMatch(current, next);

            if (nextMatch === null) {
                break;
            }

            if (current.indexOf(nextMatch) > next.indexOf(nextMatch)) {
                //console.log(current)
                if (!(current[0] in currentPass)) {
                    currentPass.push(current[0]);
                }
                current = current.slice(1);
            }
            else {
                //console.log(next)
                if (!(next[0] in currentPass)) {
                    currentPass.push(next[0]);
                }
                next = next.slice(1);
            }

            //console.log(`CurrentPass : ${currentPass}\nNext Match : ${nextMatch}\nCurrent : ${current}\nNext : ${next}`)

        }

        currentPass = currentPass.filter((item, index) => currentPass.indexOf(item) === index);

        OrderedPasses.push(currentPass)

    }

    return await getLongestArray(OrderedPasses);
}

async function sliceService(service, startCrs, endCrs) {
    // Takes Service
    // Slices between start and end stations 
    // returns sliced data as to ignore 'out of scope' stations

    let suidData = await callHSPServiceSUID(service.serviceUid, service.runDate);

    let stations = getStationsFromSuidData(suidData);

    // splice between start and end locations 
    let slicedData = stations.slice(stations.indexOf(startCrs), stations.indexOf(endCrs) + 1);

    //console.info(`${startCrs} - ${endCrs} : ${slicedData}`);

    return (slicedData);

}

async function getTrainsPerStationPerHour(allStationsOrdered, date) {

    // for each station to another station, find and map all the trains by trainIdentification
    // based on the date
    // using the HSPService

    // let mappedTrains = {
    //     'Time' : 'Trains[]',
    //     '1310': ['Y10101', 'Y10102']
    //     'Time' : 'Trains[]',
    //     '1310': ['Y10101', 'Y10102']
    // }

    let mappedTrains = {}

    const start_crs = allStationsOrdered[0]
    const end_crs = allStationsOrdered[allStationsOrdered.length - 1]

    allStationsOrdered.forEach(async crs => {
        let trainData = await callHSPServiceStationDated(crs, date);

        let perHour = false;

        for (let j = 0; j < trainData.services.length; j++) {
            let service = trainData.services[j];
            let serviceUID = service.serviceUid;

            let rttTime = service.locationDetail.realtimeArrival ? service.locationDetail.realtimeArrival : service.locationDetail.gbttBookedArrival;

            if (rttTime) {
                rttTime = parseInt(perHour ? rttTime.substring(0, 2) : rttTime.substring(0, 3));

                if (mappedTrains[rttTime] == null) {
                    mappedTrains[rttTime] = [serviceUID];
                } else {
                    mappedTrains[rttTime] = [...mappedTrains[rttTime], serviceUID];
                }
            }
        }
    })
    while (mappedTrains['computed'] === false) {
        console.log("await")
    }

    console.log(mappedTrains)

    return mappedTrains
}

let CountServices = async (props) => {
    // In the ServicesUID data, we get a list of stations and times for some given trains
    // We want to count the number of trains between two stations at any given time
    // For Example,
    // If we want to know the number of Trains Between London Waterloo and Clapham Junction at 10:00
    // We use the CRS code of the stations and the wtt OR gtbb times on the timetable to count the number of trains

    // props will hold a list of services which the data can be extracted from

    // We need to get the data from the services

    let services = props.services;

    let start_crs = props.location.crs;

    let end_crs = props.filter.destination.crs;

    let allStationsOrdered = await getStationsOrdered(services, start_crs, end_crs);

    //console.log(allStationsOrdered)
    // should store a dict Key - Station Name, Value - [] of Number of Trains per hour (array is 24 numbers long)
    // Needs to be within the last week to use the 'free' version

    return await getTrainsPerStationPerHour(allStationsOrdered, await getLastMonday());

}

export default CountServices;