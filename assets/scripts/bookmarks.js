const charities = JSON.parse(localStorage.getItem("Bookmarks")) || [];
const charName = JSON.parse(localStorage.getItem("charBookmarks")) || [];


function renderBookmarks(){
   
    var bookmarkContainer = document.querySelector("#bookmark-list");
    console.log(charName);

    for (let i = 0; i < charities.length; i++) {
       
        var bookmarkHeading = document.createElement("h2");
        bookmarkHeading.textContent= charities[i].name;
        

        var bookmarkWebsite = document.createElement("p");
        bookmarkWebsite.textContent= charities[i].website;

        var bookmarkAddress = document.createElement("p");
        bookmarkAddress.textContent= charities[i].address;
       

        var deleteBookmark= document.createElement("button");
        deleteBookmark.textContent="X";

        deleteBookmark.addEventListener("click", function removeBookmark(){
        var index = charName.indexOf(charities[i].name);
        console.log(index);
        
        if(index > -1){
        charities.splice(index, 1);
        charName.splice(index, 1);
        }
        
        
        localStorage.setItem("Bookmarks", JSON.stringify(charities));
        localStorage.setItem("charBookmarks", JSON.stringify(charName));
        
        console.log(charities);
        console.log(charName);



        })

        

        
        bookmarkContainer.append(bookmarkHeading, bookmarkWebsite, bookmarkAddress, deleteBookmark);
        
    }

}

renderBookmarks();