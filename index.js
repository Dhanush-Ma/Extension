let myTitle = [];
let myURL = [];

const titleEl = document.getElementById("title-el");
const urlEl = document.getElementById("input-el");
const inputBtn = document.getElementById("save-input");
const delBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-tab");
const ulEl = document.getElementById("ul-el");
const copyEls = document.getElementsByClassName("copy");

//to display the stored info while refreshing
let TitlefromLocalStorage = JSON.parse(localStorage.getItem("Title"));
let URLfromLocalStorage = JSON.parse(localStorage.getItem("Url"));

function handleDelete(index) {
  myTitle = myTitle.filter((_, i) => index !== i);
  myURL = myURL.filter((_, i) => index !== i);

  renderURL(myTitle, myURL);

  localStorage.setItem("Title", JSON.stringify(myTitle));
  localStorage.setItem("Url", JSON.stringify(myURL));
}

if (TitlefromLocalStorage && URLfromLocalStorage) {
  myTitle = TitlefromLocalStorage;
  myURL = URLfromLocalStorage;
  renderURL(myTitle, myURL);
}

function renderURL(title, url) {
  let listItems = "";
  for (let i = 0; i < title.length; i++) {
    listItems += `
     <li class="list-item" style="display: flex; justify-content: space-between"> 
      <div>
        <span>${title[i]} </span>: 
        <a href="${url[i]}" target="_blank" >${url[i]}</a>
      </div>
      <div style="display: flex; justify-content: space-between; gap: 5px; cursor: pointer;">
        <i class="fa-regular fa-copy" id="copy-${i}"></i>
        <i class="fa fa-trash" id="delete-${i}" style="color: #ff0000;"></i>
      </div>
    </li>`;
  }

  ulEl.innerHTML = listItems;

  for (let i = 0; i < title.length; i++) {
    document.getElementById(`copy-${i}`).addEventListener("click", () => {
      navigator.clipboard.writeText(url[i]);
    });

    document.getElementById(`delete-${i}`).addEventListener("click", () => {
      handleDelete(i);
    });
  }
}

// copyEls?.forEach((el) => {
//   el.addEventListener("click", (e) => {
//     console.log(e.target);
//   });
// });

//save input button
inputBtn.addEventListener("click", function () {
  if (titleEl.value && urlEl.value) {
    myTitle.push(titleEl.value);
    myURL.push(urlEl.value);
    renderURL(myTitle, myURL);
    titleEl.value = "";
    urlEl.value = "";

    localStorage.setItem("Title", JSON.stringify(myTitle));
    localStorage.setItem("Url", JSON.stringify(myURL));
  }
});

//save tab button
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (titleEl.value) {
      myURL.push(tabs[0].url);
      myTitle.push(titleEl.value);
      localStorage.setItem("Title", JSON.stringify(myTitle));
      localStorage.setItem("Url", JSON.stringify(myURL));
      titleEl.value = "";
      renderURL(myTitle, myURL);

      localStorage.setItem("Title", JSON.stringify(myTitle));
      localStorage.setItem("Url", JSON.stringify(myURL));
    }
  });
});

//delete buuton
delBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myTitle = [];
  myURL = [];
  renderURL(myTitle, myURL);
});
