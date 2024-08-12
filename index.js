import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-45fa9-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leadsDB");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function (snapshot) {
  const snapshotDoseExist = snapshot.exists();
  if (snapshotDoseExist) {
    const snapshotValue = snapshot.val();
    const leads = Object.values(snapshotValue);
    render(leads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});
