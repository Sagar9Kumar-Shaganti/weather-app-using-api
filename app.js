const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const qq=req.body.cityName;
    const appkey="53e46fa93f9a963528229d48f9c1742f";
    const u="metric";

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${qq}&appid=${appkey}&units=${u}`;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            console.log(temp);
            const weatherDiscription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            // res.write(`<h2>the weather in ${qq} is ${weatherDiscription}</h2>`);
            // res.write(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`);
            // res.write(`<h1>${temp}°C</h1>`)
            // res.send();  
            res.render("index.ejs",{temp:temp,icon:icon,weatherDiscription:weatherDiscription,qq:qq});
        });
    })
    console.log(" post request recived");
})

app.listen(3000,()=>{
    console.log("server is started");
});

    