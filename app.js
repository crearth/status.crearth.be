// API key is public, contains no sensitive data
API_KEY="ur768589-bb44be9022e2101d29af7f16"
API_URL="https://api.uptimerobot.com/v2/getMonitors"

const getStatus = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: `api_key=${API_KEY}&format=json&logs=1&monitors=784878581-784878575-783134381-783134380`,
      headers:
      {'content-type': 'application/x-www-form-urlencoded'},
    });
    const statusInfo = await response.json(); //extract JSON from the http response
    console.log(statusInfo);
    
    //CREARTH
    getInfo(statusInfo, 0, "crearth", "crearthStat", "crearthLastDown")

    //KCM
    getInfo(statusInfo, 1, "KCM", "kcmStat", "kcmLastDown")

    //DHM
    getInfo(statusInfo, 3, "DHM", "dhmStat", "dhmLastDown")

    //HASSIO
    getInfo(statusInfo, 2, "HASSIO", "hassioStat", "hassioLastDown")
  };

function getInfo(statusInfo, monitorNr, monitorName, statSpanId, timeSpanId) {
    let status = statusInfo.monitors[monitorNr].status;
    let lastDown = unixTimeConverter(statusInfo.monitors[monitorNr].logs.slice(-1)[0].datetime)
    if(status === 2) {
        document.getElementById(statSpanId).innerHTML = `${monitorName} is bereikbaar.`
    } else if (status === 9) {
        document.getElementById(statSpanId).innerHTML = `${monitorName} is onbereikbaar.`
    } else {
        document.getElementById(statSpanId).innerHTML = "Kan niet controleren."
    };
    document.getElementById(timeSpanId).innerHTML = `${lastDown}`
}

function unixTimeConverter(unixTime) {
    let date = new Date(unixTime * 1000);
    return date.toLocaleString("nl-BE", {day: "numeric", month: "long", year: "numeric"}) + " om " + date.toLocaleString("nl-BE", {hour: "2-digit", minute: "2-digit", second: "2-digit"});
    /*return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " om " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();*/
}

window.addEventListener('load', getStatus());
