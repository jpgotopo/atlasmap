var markers = [];
var infoWindow;
var locationSelect;
function initMap() {
    var venezuela = { lat: 12.06338, lng: -76.358080 };
    map = new google.maps.Map(document.getElementById("map"), {
      center: venezuela,
      zoom: 5,
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#ebe3cd",
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#523735",
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f1e6",
            },
          ],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#c9b2a6",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#dcd2be",
            },
          ],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#334e87",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#a5b076",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#4d68a1",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#9fd6c0",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#255763",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#b0d5ce",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#283d6a",
            },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#3a4762",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#b9d3c2",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#4e6d70",
            },
          ],
        },
      ],

      mapTypeId: "terrain",
    });
    infoWindow = new google.maps.InfoWindow();
    searchCountry();
    //showStoresMarkers();   
    //setOnClickListener();    
}

function searchCountry(){
    var foundCountry = [];
    var pais = document.getElementById('zip-code-input').value;
    if(pais){
        for (var [index, currency] of currencies.entries()) {
            
            var namecountry = currencies[index]["countryName"];
            console.log(namecountry);
            if (namecountry == pais) {
                foundCountry.push(currency);
            }   
        }
    } else {
        foundCountry = currencies;
    }
    clearLocations();
    displayStores(foundCountry);
    showStoresMarkers(foundCountry);
    setOnClickListener();
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;

    
}

function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function(elem, index){
        elem.addEventListener('click', function () {
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
    
}

/* function createMarker(latlng, name, address, openStatusText, phoneNumber, index) {
    var latlng = {
        lat: 34.0420886,
        lng: -118.2916830
    };
    var index =1;
    var name = "Tri-R Telecommunications Inc";
    var address = "110 E 9th St, Los Angeles, CA 90079";
    var openStatusText = "Abierto";
    var phoneNumber = "+1 213-239-841"
    var html = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                </div>
                ${address}
            </div>
            <div class="store-info-phone">
                <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                </div>
                ${phoneNumber}
            </div>
        </div>
    `;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
} */
function displayStores(currencies){   
    var map;
    var currencyHtml ='';
    for(var [index, currency] of currencies.entries()){
        //var value_usd = "https://api.cambio.today/v1/full/EUR/json?key=4262|6L9hLWi5Lu7nJJWAoa^byd2Ok_4uz_1D";
        //var requestURL = 'https://api.cambio.today/v1/quotes/' + currency['currencyCode'] +'/USD/json?quantity=1&key=4262|6L9hLWi5Lu7nJJWAoa^byd2Ok_4uz_1D';
        //var res = await axios.get(requestURL);
        //data = res.data;
        //capital = data['result']['value'];
        capital = index;
        //var address = store['addressLines'];
        var name = currency['countryName'];
        var moneda = currency['currencyCode'];
        var continent = currency["continentName"];
        //var phone = store['phoneNumber'];      

        currencyHtml += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${name}</span>
                            <span class="minus">Currency: ${moneda}</span>
                        </div>
                        <div class="store-phone-number">
                            <i class="fas fa-globe" aria-hidden="true"></i>
                            <div class="number">${continent}</div>
                        
                        </div>

                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                        ${index + 1}
                        </div>
                    </div>
                
                </div>
                    
              
              
           
            </div>  
        `
        document.querySelector('.stores-list').innerHTML = currencyHtml;
    }
};

function showStoresMarkers(currencies) {
    var bounds = new google.maps.LatLngBounds();
    for (var [index, currency] of currencies.entries()){

        var latlng = new google.maps.LatLng(
            currency["latitud"],
            currency["longitud"]);
        var area = currency['areaInSqKm'];
        var name = currency["countryName"];
        var flag = currency["flag"];
        var population = currency["population"];
        //var monedapais = currency['countryName'];
        //var requestURL = 'https://api.cambio.today/v1/quotes/' + currency['currencyCode'] + '/USD/json?quantity=1&key=4262|6L9hLWi5Lu7nJJWAoa^byd2Ok_4uz_1D';
        //var res = await axios.get(requestURL);
        //data = res.data;
        //capital = data['result']['value'];
        capital = currency["capital"];
        // var phoneNumber = store["phoneNumber"];
        bounds.extend(latlng);
        createMarker(latlng, name, area, flag, capital, population, index+1);
    }
    //map.fitBounds(bounds); //TODO revisar si es este lo que me permite el ancho para mostrar los marcadores
    
}

function createMarker(latlng, name, area, flag, capital, population, index) {
    var html = `
        <div class="store-info-window">
            <div class="info-country">
                <div class="flag">
                    <img src="${flag}" alt="flag">
                </div>
                <div class="store-info-name">
                    ${name}
                </div>
            </div>
            
            <div class="store-info-status">
                Capital: ${capital}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-draw-polygon"></i>
                </div>
                
                <span>Surface: ${area} Km<sup>2</sup></span>
            </div>
            <div class="store-info-phone">
                <div class="circle">
                    <i class="fas fa-users"></i>
                </div>
                
                <span>Population: ${population}</span>
            </div>
            <div class="link"><a href="https://www.google.com/maps/place/' + ${name} + '" target="_blank">View on Google Maps</a></div>

        </div>
    
   
    `;
    
    // '<div style="display:flex;"><div><i class="fas fa-map-marker-alt"></i></div><b style ="color:blue">' + name + '<b/></div> <br/>' + '<div><i>'+address + '</i></div><br/> <a href="https://www.google.com/maps/place/' + address + '" target="_blank">View on Google Maps</a> <style>.fa-map-marker-alt{color:red; font-size:14px; padding-right:8px}</style>';
    var image = "img/icon-flag.png"
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        // label: index.toString(),
        label: {
            text: index.toString(),
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Tahoma',
            color: 'white',
            
        },
        icon: image,
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);

}