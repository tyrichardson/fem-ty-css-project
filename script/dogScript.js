console.log("dogScript is running");

const BREED_OBJECT = "https://dog.ceo/api/breeds/list/all";

const SPINNER = document.querySelector(".spinner");

const BREED = document.querySelector("#breed-select");

const DOG_IMG = document.querySelector(".dogImg");

getBreedObject();

//Build select options
async function getBreedObject(event) {
  const res = await fetch(BREED_OBJECT);
  const resJson = await res.json();
  let breedArray = Object.keys(resJson.message);
  breedArray.forEach(function (element) {
    const option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    BREED.appendChild(option);
  });
}
//change the photo;
BREED.addEventListener("change", function (event) {
  let breedName = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
  changePhoto(breedName);
  SPINNER.classList.remove("hidden");
  DOG_IMG.classList.add("hidden");
});

function changePhoto(url) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      DOG_IMG.src = data.message;
      DOG_IMG.classList.remove("hidden");
    });
}
document.querySelector(".dogImg").addEventListener("load", function () {
  SPINNER.classList.add("hidden");
});