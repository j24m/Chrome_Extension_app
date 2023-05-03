const input = document.querySelector("#input-el");
const btnSave = document.querySelector("#btn-save");
const btnSaveTab = document.querySelector(".btn-save-tab");
const btnDelete = document.querySelector("#btn-delete");
const leadsContainer = document.querySelector("#leadsContainer");
let myLeads = [];

btnSave.addEventListener("click", saveLeadsList);

function saveLeadsList() {
  myLeads.push(input.value);
  console.log(myLeads);
  input.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

function render(leads) {
  let listOfLeads = "";
  for (lead of leads) {
    listOfLeads += `
    <li class ="list-items">
    <a class="link" href='${lead}' target="_blank">
    ${lead}
    </a>
    </li>
    `;
  }
  leadsContainer.innerHTML = listOfLeads;
}

//persisting data on the DOM after page reload through localStorage
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

btnDelete.addEventListener("dblclick", deleteLeadsList);

function deleteLeadsList() {
  console.log("double clicked");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
}

btnSaveTab.addEventListener("click", saveTab);

function saveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
}

// chrome://extensions/
