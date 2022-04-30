const URL = "https://api.thedogapi.com/v1/images/search";
const img = document.querySelector("img");
const title = document.getElementById("title");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const lifeSpan = document.getElementById("lifeSpan");
const button = document.getElementById("button");

// Con promesas
function getDogs() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      img.src = data[0].url;
      if (data[0].breeds[0]) {
        title.innerText = data[0].breeds[0].name;
        weight.innerText = "Peso: " + data[0].breeds[0].weight.metric + " kg";
        height.innerText = "Altura: " + data[0].breeds[0].height.metric + " cm";
        lifeSpan.innerText =
          "Esperanza de vida: " + data[0].breeds[0].life_span;
      } else {
        title.innerText = "Sin información";
        weight.innerText = "Peso: Sin información";
        height.innerText = "Altura: Sin información";
        lifeSpan.innerText = "Esperanza de vida: Sin información";
      }
    });
}

// Con async/await
async function getDogs2() {
  const res = await fetch(URL);
  const data = await res.json();
  img.src = data[0].url;
  if (data[0].breeds[0]) {
    title.innerText = data[0].breeds[0].name;
    weight.innerText = "Peso: " + data[0].breeds[0].weight.metric + " kg";
    height.innerText = "Altura: " + data[0].breeds[0].height.metric + " cm";
    lifeSpan.innerText = "Esperanza de vida: " + data[0].breeds[0].life_span;
  } else {
    title.innerText = "Sin información";
    weight.innerText = "Peso: Sin información";
    height.innerText = "Altura: Sin información";
    lifeSpan.innerText = "Esperanza de vida: Sin información";
  }
}

button.onclick = getDogs2;

getDogs2();
