const API_URL = "https://api.thedogapi.com/v1/images/search?limit=3&api_key=9f1d3cfc-36f4-4461-9275-a27626d6fdec";
const images = document.getElementsByTagName("img");
const titles = document.getElementsByClassName("card__title");
const weights = document.getElementsByClassName("weight");
const heights = document.getElementsByClassName("height");
const lifeSpan = document.getElementsByClassName("life-span");
const button = document.getElementById("moreDogs");

// Con promesas
function getDogs() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        images[i].src = data[i].url;
        if (data[i].breeds[0]) {
          titles[i].innerText = data[i].breeds[0].name;
          weights[i].innerText =
            "Peso: " + data[i].breeds[0].weight.metric + " kg";
          heights[i].innerText =
            "Altura: " + data[i].breeds[0].height.metric + " cm";
          lifeSpan[i].innerText =
            "Esperanza de vida: " + data[i].breeds[0].life_span;
        } else {
          titles[i].innerText = "Sin información";
          weights[i].innerText = "Peso: Sin información";
          heights[i].innerText = "Altura: Sin información";
          lifeSpan[i].innerText = "Esperanza de vida: Sin información";
        }
      }
    });
}

// Con async/await
async function getDogs2() {
  const res = await fetch(API_URL);
  const data = await res.json();
  for (let i = 0; i < data.length; i++) {
    images[i].src = data[i].url;
    if (data[i].breeds[0]) {
      titles[i].innerText = data[i].breeds[0].name;
      weights[i].innerText = "Peso: " + data[i].breeds[0].weight.metric + " kg";
      heights[i].innerText =
        "Altura: " + data[i].breeds[0].height.metric + " cm";
      lifeSpan[i].innerText =
        "Esperanza de vida: " + data[i].breeds[0].life_span;
    } else {
      titles[i].innerText = "Sin información";
      weights[i].innerText = "Peso: Sin información";
      heights[i].innerText = "Altura: Sin información";
      lifeSpan[i].innerText = "Esperanza de vida: Sin información";
    }
  }
}

button.onclick = getDogs2;

getDogs2();
