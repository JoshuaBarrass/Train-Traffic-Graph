// HSPService.js

const baseAPIURL = 'http://localhost:3001/';

class HSPService {

  static async getServiceMetrics(begin_station, end_staion) {
    const apiUrl = baseAPIURL + begin_station + '-' + end_staion;

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        return {'Error' : 'Error fetching data from HSP API - Likely timeout'}
      }

      return response.json();
    } catch (error) {
      console.error('Error:', error.message);
      return {'Error' : 'Error fetching data from HSP API'}
    }
  }

  static async getRTTData(begin_station, end_staion) {
      const apiUrl = baseAPIURL + 'rtt/' + begin_station + '-' + end_staion;
  
      const headers = {
          'Content-Type': 'application/json',
      };
  
      try {
          const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          });
  
          if (!response.ok) {
          return {'Error' : 'Error fetching data from HSP API - Likely timeout'}
          }
  
          return response.json();
      } catch (error) {
          console.error('Error:', error.message);
          return {'Error' : 'Error fetching data from HSP API'}
      }
  }

  static async getRTTDataSUID(suid, date) {

    let dateSplit = date.split('-');

    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];


    const apiUrl = baseAPIURL + 'rttsuid/' + suid + '/' + year + '/' + month + '/' + day;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        });

        if (!response.ok) {
        return {'Error' : 'Error fetching data from HSP API - Likely timeout'}
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error.message);
        return {'Error' : 'Error fetching data from HSP API'}
    }
  }

  static async getRTTDated(start, end, date) {

    let dateSplit = date.split('-');

    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];


    const apiUrl = baseAPIURL + 'rttdate/' + start + '-' + end + '/' + year + '/' + month + '/' + day;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        });

        if (!response.ok) {
        return {'Error' : 'Error fetching data from HSP API - Likely timeout'}
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error.message);
        return {'Error' : 'Error fetching data from HSP API'}
    }
  }   

  static async getRRTstationDated(station, date) {
      
    let dateSplit = date.split('-');

    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];

    const apiUrl = baseAPIURL + 'rttfrom/' + station + '/' + year + '/' + month + '/' + day;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        });

        if (!response.ok) {
        return {'Error' : 'Error fetching data from HSP API - Likely timeout'}
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error.message);
        return {'Error' : 'Error fetching data from HSP API'}
    }
    
  }

}

export default HSPService;
  