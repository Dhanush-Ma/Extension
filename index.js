let myTitle = []
let myURL = []

const titleEl = document.getElementById("title-el")
const urlEl = document.getElementById("input-el")
const inputBtn = document.getElementById("save-input")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")
const ulEl = document.getElementById("ul-el")

//to display the stored info while refreshing
let TitlefromLocalStorage = JSON.parse(localStorage.getItem("Title"))
let URLfromLocalStorage = JSON.parse(localStorage.getItem("Url"))

if(TitlefromLocalStorage && URLfromLocalStorage)
{
    myTitle = TitlefromLocalStorage
    myURL = URLfromLocalStorage
    renderURL(myTitle,myURL)
}

function renderURL(title,url){
let listItems = ""
for(let i=0; i<title.length; i++)
{
     listItems += `<li> <span>${title[i]} </span>: 
                        <a href="${url[i]}" target="_blank" >${url[i]}</a>
                    </li>`
}
ulEl.innerHTML = listItems
}

//save input buuton
inputBtn.addEventListener("click", function()
{
        if(titleEl.value && urlEl.value)
        {
            myTitle.push(titleEl.value)
            myURL.push(urlEl.value)
            renderURL(myTitle,myURL)
            titleEl.value = ""
            urlEl.value = ""

            localStorage.setItem("Title", JSON.stringify(myTitle));
            localStorage.setItem("Url", JSON.stringify(myURL))
        }
        
})

//save tab button
tabBtn.addEventListener("click",function(){
       chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(titleEl.value){
        myURL.push(tabs[0].url)
        myTitle.push(titleEl.value)
        localStorage.setItem("Title", JSON.stringify(myTitle));
        localStorage.setItem("Url", JSON.stringify(myURL))
        titleEl.value = ""
        renderURL(myTitle,myURL)
        }
    })   
    
})

//delete buuton
delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myTitle = []
    myURL = []
    renderURL(myTitle,myURL)
})