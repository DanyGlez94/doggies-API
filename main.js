const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=3";
const API_URL_FAV =
  "https://api.thedogapi.com/v1/favourites";
const API_URL_UPLOAD =
  "https://api.thedogapi.com/v1/images/upload";
const API_URL_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}`;
const spanError = document.getElementById("error");
const images = document.getElementsByTagName("img");
const titles = document.getElementsByClassName("card__title");
const weights = document.getElementsByClassName("weight");
const heights = document.getElementsByClassName("height");
const lifeSpan = document.getElementsByClassName("life-span");
const moreDogs = document.getElementById("moreDogs");
const favButton = document.getElementsByClassName("fav__button");
const favButtonDelete = document.getElementsByClassName("fav__buttonDelete");

// Con promesas
function getDogs() {
  fetch(API_URL_RANDOM)
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
async function getRandomDogs() {
  try {
    const res = await fetch(API_URL_RANDOM);
    if (res.status !== 200)
      throw new Error(`Error de peticiónHTTP en Random: $(status)`);
    const data = await res.json();
    console.log(data);
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
    for (let j = 0; j < favButton.length; j++) {
      favButton[j].onclick = () => saveFavDog(data[j].id);
    }
  } catch (error) {
    console.log(error.message);
    spanError.innerText = `Error: $(error.message)`;
  }
}

async function getFavDogs() {
  try {
    const res = await fetch(API_URL_FAV, {
      method: 'GET',
      headers: {
        'X-API-KEY': '9f1d3cfc-36f4-4461-9275-a27626d6fdec',
      }
    });
    const data = await res.json();
    // console.log("Fav Dogs");
    console.log(data);
    if (res.status !== 200) {
      throw new Error(
        `Error de petición HTTP en Favoritos: ${res.status} ${data.message}`
      );
    } else {
      const section = document.getElementById("favDogs");
      section.innerHTML = "";
      data.forEach((dog, i) => {
        const article = document.createElement("article");
        article.classList.add("favCard");
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("card__img--container");
        const img = document.createElement("img");
        img.classList.add("card__img");
        const btn = document.createElement("button");
        btn.classList.add("fav__buttonDelete");
        const icon = document.createElement("i");
        icon.classList.add("fa-heart");
        icon.classList.add("fa-solid");
        img.src = dog.image.url;
        article.appendChild(imgContainer);
        imgContainer.appendChild(img);
        imgContainer.appendChild(btn);
        btn.appendChild(icon);
        section.appendChild(article);
        favButtonDelete[i].onclick = () => deleteFavDog(dog.id);
      });
    }
  } catch (error) {
    console.log(error.message);
    spanError.innerText = `${error.message}`;
  }
}

async function saveFavDog(id) {
  try {
    const res = await fetch(API_URL_FAV, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-API-KEY': '9f1d3cfc-36f4-4461-9275-a27626d6fdec',
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status !== 200) {
      throw new Error(
        `Error de petición HTTP en Favoritos: ${res.status} ${data.message}`
      );
    } else {
      console.log("Perrito guardado en favoritos");
      getFavDogs();
    }
  } catch (error) {
    spanError.innerText = `${error.message}`;
  }
}

async function deleteFavDog(id) {
  try {
    const res = await fetch(API_URL_DELETE(id), {
      method: "DELETE",
      headers: {
        'X-API-KEY': '9f1d3cfc-36f4-4461-9275-a27626d6fdec',
      }
    });
    const data = await res.json();
    console.log(res);
    if (res.status !== 200) {
      throw new Error(
        `Error de petición HTTP en Favoritos: ${res.status} ${data.message}`
      );
    } else {
      console.log("Perrito borrado de favoritos");
      getFavDogs();
    }
  } catch (error) {
    spanError.innerText = `${error.message}`;
  }
}

const uploadDogPhoto = async () => {
  try {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));
  
    const res = await fetch(API_URL_UPLOAD, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': '9f1d3cfc-36f4-4461-9275-a27626d6fdec',
      },
      body: formData,
    });
    const data = await res.json();
    if (res.status !== 201) {
      throw new Error(
        `Error de petición HTTP en Favoritos: ${res.status} ${data.message}`
      );
    } else {
      console.log('Foto subida con éxito! :)');
      console.log({data});
      console.log(data.url);
      saveFavDog(data.id);
    }
  } catch (error) {
    console.log(error.message);
    spanError.innerText = `${error.message}`;
  }
}

const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
}

moreDogs.onclick = getRandomDogs;

getRandomDogs();
getFavDogs();