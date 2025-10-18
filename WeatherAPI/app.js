const express = require("express")
const fs = require("fs")
const path = require("path")
const FILE = './data.json'

const app = express()
const port = 3000

let location, APIurl
let fileData = {}
let areaMap = new Map()

/*
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self'",
      "img-src 'self'",
      "connect-src 'self' https://weather.visualcrossing.com"
    ].join("; "))
    next()
});
*/

function readFile(FILE) {
    if(fs.existsSync(FILE)) {
        const fileSync = fs.readFileSync(FILE, 'utf8')
        fileData = JSON.parse(fileSync)
        for(const [key, data] of fileData)
        {
            areaMap.set(key, data)
        }
    }
}

function saveFile(areaMap) {
    fs.writeFileSync(FILE, JSON.stringify([...areaMap], null, 2))
}

async function areaData(APIurl) {

}


app.use(express.static(path.join(__dirname, "public")))



/* 
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})
app.get("/weather", async (req, res) => {
    location = req.query.location || "New Jersey" 
    APIurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${APIkey}&contentType=json`
    try {
        const response = await fetch(APIurl)
        const data = await response.json()
        
        const today = data.days[0]

        readFile(FILE)


        areaMap.set("address", data.resolvedAddress)
        areaMap.set("timezone", data.timezone)
        areaMap.set("date", today.datetime)
        areaMap.set("temperature", today.temp)
        areaMap.set("humidity", today.humidty)

        saveFile(areaMap)
        
        
        res.json({
            resolvedAddress: data.resolvedAddress,
            timezone: data.timezone,
            date: today.datetime,
            temperature: today.temp,
            humidity: today.humidity,
            precipitation: today.precip

        })
            
    } catch (err) {
        console.error(err) 
        res.status(500).json({error: 'Failed to catch weather data.'})
    }
    }
) 

*/


app.listen(port, () => {
    console.log("Weather loading...")
})


