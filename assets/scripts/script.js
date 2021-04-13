// INITIAL ELEMENTS
var charitiesName= $('.charities-name');
var charitiesWebsite = $('.charities-website');
var charitiesAddress = $('.charities-address');
var charitiesBookmark = $('.bookmark-button');
var charitiesDelete = $('.delete-button');

// DATA ARRAYS
var charities = JSON.parse(localStorage.getItem("Charities")) || [];

// SAVING INPUT

charitiesName.attr("data-name", "Volunteer Fire Brigades Victoria Inc");
charitiesWebsite.attr("data-website", "www.vfbv.com.au");
charitiesAddress.attr("data-address", "e 9 24 Lakeside Dr, Burwood East VIC 3151");

// EVENT LISTENER
$('.bookmark-button').click(function bookmark(event){

    event.preventDefault();

    // $.each( charities, function(index,){
    //     console.log(index);
    // })

    var charityName= charitiesName.attr("data-name");
    var charityWebsite= charitiesWebsite.attr("data-website");
    var charityAddress= charitiesAddress.attr("data-address");

    let charity = {
        name: charityName,
        website: charityWebsite,
        address: charityAddress
    }

    charities.unshift(charity);
    localStorage.setItem('Charities', JSON.stringify(charities));

});
