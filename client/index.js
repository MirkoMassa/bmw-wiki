let parser = new DOMParser;
let seriesbtn = document.querySelector("#seriesButtons");

//button creation
for (let i = 1; i <=8; i++) {

    //I create a string with the html button, then parse it into an html element, and then
    //append it to the div
    let buttonstr = "<button id=S" +i+ " onclick = fetchcar(" + i + ")>Serie "+ i +"</button>";
    let button = parser.parseFromString(buttonstr, 'text/html');

    seriesbtn.appendChild(button.getElementById("S"+i));
    
}

//function happening onclick on every button fetching data from node.js backend
function fetchcar(numserie){
    const carDisplay = document.querySelector("#carDisplay");

    //hiding the buttons div
    if(seriesbtn.style.display!== "none") {
        seriesbtn.style.display = "none";

        //hardcoded refresh button, could have set back the div to "block"
        const returnButton = "<button onclick = 'window.location.reload();'>Torna indietro</button>";
        carDisplay.insertAdjacentHTML("beforeend", returnButton)
    }   

    //numserie is the parameter corresponding to the bmw series, passed on the button.onclick function 
    fetch('http://localhost:5000/' + numserie)

    //promise
    .then(response => response.json())
    .then(data => {

        data.forEach(element => {

            const carDescription = "<h1>" + element.version + "</h1>"+
                                   "<p>Chassis code: "+ element.chassisCode + "<br>"+
                                   "<p>Production years: "+ element.productionYear + "<br>"+
                                   "<p>Fuel: "+ element.fuel + "<br>"+
                                   "<p>Body Type: "+ element.bodyType + "<br>"+
                                   "<p>Engine: "+ element.engineCode + "<br>"+
                                   "<p>Displacement: "+ element.cubicCentimeters + "cc<br>"+
                                   "<p>Horsepower: "+ element.hp + "hp<br>"+
                                   "<p>Curb weight: "+ element.weightKg + "Kg</p><br><br>";

                                   
            carDisplay.insertAdjacentHTML("beforeend", carDescription);
        });

    })
    .catch(err => console.log(err))


}
