let cloudcover
let poem = []


function setup() {
  createCanvas(1000, 600);
  apiRequest()
}

function draw() {
  background(100);
  
  if(cloudcover != undefined){
   for (let i = 0; i < cloudcover.length; i++) {
     let h = map(cloudcover[i], 0, 100, height, 0)
      if (poem[i] !== undefined) {
      textFont('Courier');
      textSize(14);
      fill(255);
      text(poem[i], i * width/cloudcover.length, h)
   }
  }
 }
}


async function apiRequest() {
  
    let cloudRequest = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.6501&longitude=-73.9496&hourly=cloudcover")
    let cloudData = await cloudRequest.json();

    let hourlycloudcover = cloudData.hourly
    cloudcover = hourlycloudcover.cloudcover

    console.log(cloudcover)

    
    let poemRequest = await fetch("https://random-word-api.vercel.app/api?words=168")
    let poemData = await poemRequest.json()
   
    for (let i = 0; i < cloudcover.length; i++) {
      poem.push(poemData[i] || "No Word");
    }
  
    console.log(poem);
}