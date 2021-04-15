// BOOKMARK SAVES CURRENT SEARCH INTO ARRAY
const charities= {
    name: [],
    website: [],
    address: []
};


var charityData;

function queryApiData() {
    var url = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=eb1e6be4-5b13-4feb-b28e-388bf7c26f93";
    fetch(url)
    .then(data=>{return data.json()})
    .then((res)=>{
        console.log(res);
        charityData = res.result.records;
    });
}

function filterApiData(stateFilter, causeFilter) {
    if (!charityData)
        return null;
    
    function arrayFilter(charity) {
        return (charity[stateFilter] === "Y" && charity[causeFilter] === "Y");
    }
    return charityData.filter(arrayFilter);
}


function generateAddress(charity) {

    var address = "";

    if (charity.Address_Line_1 !== "") {
        address = address + charity.Address_Line_1;
    }
    if (charity.Address_Line_2 !== "") {
        address = address+ ", " +charity.Address_Line_2;
    }
    if (charity.Address_Line_3 !== "") {
        address = address+ ", " +charity.Address_Line_3;
    }
    if (charity.Town_City !== "") {
        address = address+ ", " +charity.Town_City;
    }
    if (charity.State !== "") {
        address = address+ ", " +charity.State;
    }
    if (charity.Postcode !== "") {
        address = address+ ", " +charity.Postcode;
    }
    return address;
}


function resultBoxGenerator(filteredData) {

    var searchResults = document.getElementById("searchResults");
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }

    filteredData.forEach(charity => {
        //Create container for charity data
        var containerDiv = document.createElement('div');
        containerDiv.id = "charity"+charity._id;
        containerDiv.setAttribute("class", "charity-container");

        // Bookmark
        var bookmarkIcon = document.createElement("i");
        bookmarkIcon.id= "bookmarkIcon"+charity._id;
        bookmarkIcon.setAttribute("class","fas fa-bookmark bookmark-icon");

        containerDiv.appendChild(bookmarkIcon);
 

        //Charity name
        var nameHeader = document.createElement('h3');
        var nameText = document.createTextNode(charity.Charity_Legal_Name);
        nameHeader.id = "charityName"+charity._id;
        nameHeader.appendChild(nameText);

        containerDiv.appendChild(nameHeader);

        //Charity website
        var websiteAnchor = document.createElement('a');
        var website = "";
        if (!charity.Charity_Website.includes("http://") && !charity.Charity_Website.includes("https://")) {
            website = website +"https://";
        }
        website = website + charity.Charity_Website;
        websiteAnchor.setAttribute("target", "_blank");
        websiteAnchor.setAttribute("href", website);
        websiteAnchor.id = "charityWebsite"+charity._id;
        var webText = document.createTextNode(charity.Charity_Website);

        websiteAnchor.appendChild(webText);
        containerDiv.appendChild(websiteAnchor);
        
        //Charity address
        var addressAnchor = document.createElement('p');
        var appendedAddress = generateAddress(charity);
        addressAnchor.id = "charityAddress"+charity._id;
        var addressText = document.createTextNode(appendedAddress);

        addressAnchor.appendChild(addressText);

        //Creates link for map
        var mapData = getMapData(appendedAddress);
        containerDiv.appendChild(addressAnchor);

        if (mapData !== null){
            var mapButton = document.createElement("a");
            var buttonText = document.createTextNode("Open in Maps");
            mapButton.setAttribute("class", "open-maps");
            mapButton.appendChild(buttonText);
            mapButton.target = "_blank";
            mapButton.href = getMapData(appendedAddress);
            containerDiv.appendChild(mapButton);
        }
        
        // Alternate Bookmark Button

            var bookmarkButton = document.createElement("button");
            var bookmarkText = document.createTextNode("Bookmark");
            bookmarkButton.id = "bookmarkButton"+charity._id;
            bookmarkButton.setAttribute("class", "bookmark-button");
            bookmarkButton.setAttribute("type","button");
            containerDiv.appendChild(bookmarkButton);
            bookmarkButton.appendChild(bookmarkText);          

            // BOOKMARKING FIRST INSTANCE TO ARRAY
            bookmarkButton.addEventListener("click", function(){
               
                var cName = charity.Charity_Legal_Name;
                var cWebsite = charity.Charity_Website;
                var cAddress = appendedAddress;

                charities.name.push(cName);
                charities.website.push(cWebsite);
                charities.address.push(cAddress);

                console.log(charities);


            });
    

    

      
        // Attach charity to body
        searchResults.appendChild(containerDiv);

       

    });
}

queryApiData();

function getMapData(address){
    var addressURL = encodeURIComponent(address)
    var newUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + addressURL + '.json?access_token=pk.eyJ1IjoiZHJoZWFsIiwiYSI6ImNrbmZtdDhrMzFybTAydm9vYjh0ZHdmd2UifQ.xMSHVvkXrHSV-sO58EoFzg';
    var lat = '';
    var lon = '';

    if (!address){
        return null;
    }
    else if (address === undefined){
        return null;
    }
    else{
        $.ajax({
            async: false,
            url: newUrl,
            
            }).done(function(data) {
            results = data
            lat = data.features[0].geometry.coordinates[1]
            lon = data.features[0].geometry.coordinates[0]

            });
    var addressNew = 'https://www.google.com/maps/place/' + lat + ',' + lon
    return(addressNew)
    }
}

document.getElementById("searchBtn").addEventListener("click", function() {

    console.log(filterApiData(document.getElementById("stateDropdown").value, document.getElementById("causeDropdown").value));

    resultBoxGenerator(filterApiData(document.getElementById("stateDropdown").value, document.getElementById("causeDropdown").value));

});

