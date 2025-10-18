const APIkey = "VXTBQA86TGRRZXBSS4TL7843U"
const weatherLocation = "Orange, New Jersey"    
const unitGroup = 'us'
const APIurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(weatherLocation)}?unitGroup=${unitGroup}&key=${APIkey}&contentType=json`

const CACHE_DUR = 10 * 60 * 1000

function weatherUpdate() {
    const now = Date.now()
    const cached = JSON.parse(localStorage.getItem("weather"))

    if(cached && (now - cached.timestamp < CACHE_DUR)) {
        console.log("Using cached data...")
        weatherRender(cached.data)
        return
    }

    console.log("Fetching data...")


    fetch(APIurl) 
    .then(response => {
        if(!response.ok) throw new Error("Weather couldn't be loaded!")
        return response.json()
    })
    .then(data => {
        const cachedEntry = {
            data, 
            timestamp: now
        }
        localStorage.setItem("weather", JSON.stringify(cachedEntry))
        weatherRender(data)
        
    })
    .catch(err => {
        console.error(err)
        document.getElementById("temperature").textContent = "Failed to load content"
    })
}

function weatherRender(data) {
    const today = data.days[0]
    if(!today) throw new Error("Day could not be found!")

    document.getElementById("location").textContent = 
            `Location : ${data.resolvedAddress}`
        document.getElementById("temperature").textContent = 
            `Temperature : ${today.temp} °`
        document.getElementById("tempmax").textContent = 
            `Temperature max: ${today.tempmax} °`
        document.getElementById("tempmin").textContent = 
            `Temperature min: ${today.tempmin} °`
        document.getElementById("precipitation").textContent = 
            `Precipitation : ${today.precip}`
        document.getElementById("humidity").textContent =
            `Humidity : ${today.humidity}`

   
    
}

document.getElementById("refreshbutton")
    .addEventListener("click", weatherUpdate)
    

weatherUpdate()
