const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const activityInput = document.getElementById("activity");
const submit = document.getElementById("submitBtn");
const cardContainer = document.getElementById("cards-container");
const mealsDetails = document.getElementById("details");
const ingredientSection = document.getElementById("ingredients");
const stepsSection = document.getElementById("steps");
const equipmentSection = document.getElementById("equipment");
const recipeSection = document.getElementById("recipe-section");

const getCalorie = () => {
  let heightval = heightInput.value;
  let weightval = weightInput.value;
  let ageval = ageInput.value;
  let genderval = genderInput.value;
  let actval = activityInput.value;
  let bmr;

  if (
    heightval === "" ||
    heightval <= 0 ||
    weightval === "" ||
    weightval <= 0 ||
    ageval === "" ||
    ageval <= 0
  ) {
    alert(
      "All input field should not be empty and should not have negetive value"
    );
    return;
  }

  if (genderval === "female") {
    bmr = 655.1 + 9.563 * weightval + 1.85 * heightval - 4.676 * ageval;
  } else if (genderval === "male") {
    bmr = 66.47 + 13.75 * weightval + 5.003 * heightval - 6.755 * ageval;
  }

  // Daily Calorie Requirement
  if (actval === "light") {
    bmr *= 1.375;
  } else if (actval === "moderate") {
    bmr *= 1.55;
  } else if (actval === "active") {
    bmr *= 1.725;
  }

  getMeals(bmr);
};

const getMeals = async (bmr) => {
  document.getElementById("loader").style.display = "block";
  const url = `https://api.spoonacular.com//mealplanner/generate?timeFrame=day&targetCalories=2000&apiKey=836dc3426b2441d4a1478db02c298865&includeNutrition=true`;

  let datas;
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      datas = data;
    });
  generateMealsCard(datas);
  document.getElementById("loader").style.display = "none";
};

const generateMealsCard = (datas) => {
  let cards = ``;
  mealsDetails.innerHTML = `
  <h1>Nutrients</h1>
  <div class="caloriesInfo">
      <p class="para">Calories : ${datas?.nutrients?.calories}</p>
      <p class="para">Carbohydrates : ${datas.nutrients?.carbohydrates}</p>
      <p class="para">Fat : ${datas.nutrients?.fat}</p>
      <p class="para">Protein : ${datas.nutrients?.protein}</p>
  </div>
  `;
  datas.meals.map(async (data) => {
    const url = `https://api.spoonacular.com/recipes/${data.id}/information?apiKey=836dc3426b2441d4a1478db02c298865&includeNutrition=false`;
    let imgURL;
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        imgURL = data.image;
      });
    cards += `
        <div>
            <div class="card baseBlock" style="width: 18rem;">
                <img src=${imgURL} class="card-img-top"
                    alt="meal 1">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p>Preparation Time - ${data.readyInMinutes}</p>
                    <button class="card-btn" onClick="btnRecipe(${data.id})" >Get Recipe</button>
                </div>
            </div>
        </div>
        `;
    cardContainer.innerHTML = cards;
  });
};

const btnRecipe = async (data) => {
  recipeSection.innerHTML = "";
  ingredientSection.innerHTML = "";
  stepsSection.innerHTML = "";
  equipmentSection.innerHTML = "";
  const url = `https://api.spoonacular.com/recipes/644882/information?apiKey=836dc3426b2441d4a1478db02c298865&includeNutrition=false`;
  let information;

  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      information = data;
    });

  recipeSection.textContent = `${information.title} Recipe`;

  //   Ingridents
  let htmlData = ``;
  let inCardDiv = document.createElement("div");
  inCardDiv.classList.add("carddesign", "card", "h-100");
  let inCardBody = document.createElement("div");
  inCardBody.classList.add("card-body");
  let inOverlay = document.createElement("div");
  inOverlay.classList.add("overlay");
  let ul = document.createElement("ul");
  information.extendedIngredients.map((ingre) => {
    htmlData += `
        <li>${ingre.original}</li>
        `;
  });
  ul.innerHTML = htmlData;
  let ingreH1 = document.createElement("h3");
  ingreH1.textContent = "INGREDIENTS";
  inCardBody.appendChild(inOverlay);
  inCardBody.appendChild(ingreH1);
  inCardBody.appendChild(ul);
  inCardDiv.appendChild(inCardBody);
  ingredientSection.appendChild(inCardDiv);

  //   Steps
  let stepsHtml = ``;
  let stCardDiv = document.createElement("div");
  stCardDiv.classList.add("carddesign", "card", "h-100");
  let stCardBody = document.createElement("div");
  stCardBody.classList.add("card-body");
  let stOverlay = document.createElement("div");
  stOverlay.classList.add("overlay");
  let stepsOl = document.createElement("ol");
  information.analyzedInstructions[0].steps.map((step) => {
    stepsHtml += `
        <li>${step.step}</li>
        `;
  });
  stepsOl.innerHTML = stepsHtml;
  let stepsH1 = document.createElement("h3");
  stepsH1.textContent = "STEPS";
  stCardBody.appendChild(stOverlay);
  stCardBody.appendChild(stepsH1);
  stCardBody.appendChild(stepsOl);
  stCardDiv.appendChild(stCardBody);
  stepsSection.appendChild(stCardDiv);

  // equipmentSection
  const urlEquip = `https://api.spoonacular.com/recipes/1003464/equipmentWidget.json?apiKey=836dc3426b2441d4a1478db02c298865`;
  let equip;

  await fetch(urlEquip)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      equip = data;
    });

  let equipData = ``;
  let eqCardDiv = document.createElement("div");
  eqCardDiv.classList.add("carddesign", "card", "h-100");
  let eqCardBody = document.createElement("div");
  eqCardBody.classList.add("card-body");
  let eqOverlay = document.createElement("div");
  eqOverlay.classList.add("overlay");
  let equipUl = document.createElement("ul");
  equip.equipment.map((equip) => {
    equipData += `
            <li>${equip.name}</li>
            `;
  });
  equipUl.innerHTML = equipData;
  let equipH1 = document.createElement("h3");
  equipH1.textContent = "EQUIPMENT";
  eqCardBody.appendChild(eqOverlay);
  eqCardBody.appendChild(equipH1);
  eqCardBody.appendChild(equipUl);
  eqCardDiv.appendChild(eqCardBody);
  equipmentSection.appendChild(eqCardDiv);
};

submit.addEventListener("click", getCalorie);
