(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            //Kui meil on kellaaeg (tund), mis on 24 tunni kella järgi suurem, kui 13 siis lahutame
            //12 ,et saada 12 tunni kell
            if (h > 12) {
                h -= 12;

                if (h < 10) {
                  h = "0" + h;
                }
        
                if (m < 10) {
                  m = "0" + m;
                }
        
                if (s < 10) {
                  s = "0" + s;
                }
        
                c.innerHTML = h + ":" + m + ":" + s + " PM";
            }

            //Kui ei, siis jätkame nii, nagu ennem oli
            else {
    
                if (h < 10) {
                    h = "0" + h;
                }
    
                if (m < 10) {
                    m = "0" + m;
                }
    
                if (s < 10) {
                    s = "0" + s;
                }
    
                c.innerHTML = h + ":" + m + ":" + s + " AM";
            }
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
      let fname = document.getElementById("fname").value;
      let lname = document.getElementById("lname").value;


      //Splitime eesnime üksikuteks elementideks ning vaatame iga ühe läbi, et tegemist
      //poleks numbriga
      const eesnimi = fname.split("");

      //Kui eesnimi on defineeritud kuid tühi, siis teatame sellest
      if (typeof eesnimi !== 'undefined' && eesnimi.length === 0) {
        alert("Sisestage palun oma eesnimi!");
      } 
      else {
        const numbrid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for(let i=0; i<eesnimi.length; i++){

            //Toome mängu muutuja "kas". Kui oleme leidnud nimest numbri, siis ei hakka
            //teavitus korrutama end, kui nimes on mitu numbrit
            const kas = 0;
            for(let j=0; j<numbrid.length; j++){
                if (eesnimi[i] == numbrid[j]){
                    alert("Eesnimes ei tohi olla numbreid")
                    kas = 1
                    break;      
                }
            }
            if (kas === 1) {
                break;
            }
        }
      }


      //Splitime perekonnanime üksikuteks elementideks ning vaatame iga ühe läbi, et tegemist
      //poleks numbriga
      const perenimi = lname.split("");
      
      //Kui perekonnanimi on defineeritud kui tühi, siis teatame sellest
      if (typeof perenimi !== 'undefined' && perenimi.length === 0) {
        alert("Sisestage palun oma perekonnanimi!");
      } 
      else {
        const numbrid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for(let i=0; i<perenimi.length; i++){

            //Samamoodi teeme kas siin
            const kas = 0;
            for(let j=0; j<numbrid.length; j++){
                if (perenimi[i] == numbrid[j]){
                    alert("Perekonnanimes ei tohi olla numbreid")
                    kas = 1;
                    break;
                }
            }
            if (kas === 1) {
                break;
            }
        }
      }
        
        
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast!");
            
            linn.focus();
            
            return;
            
            
        } else {
            //Defineerime ära, kas tegu on kingi või kontaktivaba tellimusega (või mõlemad)
            let kink = document.getElementById("v1");
            let kontakt = document.getElementById("v2");

            //Defineerime ära, kas soovitakse kiiresti kohaletoomist, või standard
            let kiire = document.getElementById("kiiresti");
            let standard = document.getElementById("standard");

            //Kontrollime, et üks prioriteedivariantidest on valitud
            if (kiire.checked || standard.checked) {
                //Defineerime ära kokku, kuhu liidame lõpliku summa kokku (olenevalt valikutest)
                let kokku = 0;
                if (linn.value === "trt" || linn.value === "nrv") {
                    kokku += 2.5;
                }
                else if (linn.value === "prn") {
                    kokku += 5;
                }
                if (kink.checked) {
                    kokku += 5;
                }
                if (kontakt.checked) {
                    kokku += 1;
                }
                if (kiire.checked) {
                    kokku += 5;
                }
                e.innerHTML = `${kokku} €`;
            }

            //Kui pole prioriteeti valitud, tagastame teate
            else {
                alert("Valige palun prioriteet!")
            }            
        }        
}
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let ylikool = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let uppsala = new Microsoft.Maps.Location(
            59.8586,
            17.6389
        );


    //Leian Tartu Ülikooli ja Uppsala vahelise keskmise punkti, kasutades tuntud valemit
    let keskpunkt_a = (58.38104 + 59.8586)/2;
    let keskpunkt_b = (26.71992 + 17.6389)/2;

    let new_centerpoint = new Microsoft.Maps.Location(keskpunkt_a, keskpunkt_b);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new_centerpoint,
        zoom: 5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(ylikool, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(uppsala, {
        title: 'Uppsala, Rootsi',
    });


    //Defineerime ära infoboxid, pannes neile hetkel nähtavuse falseiks
    let tartu_ylikool = new Microsoft.Maps.Infobox(ylikool, {
        title: "Tartu Ülikool",
        visible: false,
    });

    let uppsala_rootsi = new Microsoft.Maps.Infobox(uppsala, {
        title: "Uppsala, Rootsi",
        visible: false,
    });

    tartu_ylikool.setMap(map);
    uppsala_rootsi.setMap(map);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);


    Microsoft.Maps.Events.addHandler(pushpin1, "click", pushpinClicked);
    //Microsoft.Maps.Events.addHandler(pushpin2, "click", pushpinClicked);


    //Allikas: https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked
    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                title: "Tartu ülikool",
                visible: true
            });
        }
    }
    
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

