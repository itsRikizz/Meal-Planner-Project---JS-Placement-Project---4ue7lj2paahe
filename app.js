// Selectors
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const age = document.querySelector("#age");
const genderSelect = document.querySelector("#gender");
const activitySelect = document.querySelector("#activity");
const GenerateMeal = document.querySelector("#formSubmit");

// Female BMR

function calculateFemaleBMR(weight, height, age) {
  if (!weight || !height || !age) {
    return "";
  }
  const bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  return bmr;
}

//Male BMR

function calculateMaleBMR(weight, height, age) {
  if (!weight || !height || !age) {
    return "";
  }
  const bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  return bmr;
}

// calculate BMR

function calculateCalories(BMR, activityValue) {
  const calories = BMR * activityValue;
  console.log("calories" + calories);
}

// on generate meal
GenerateMeal.addEventListener("click", (event) => {
  const Femalebmr = Math.floor(
    calculateFemaleBMR(weight.value, height.value, age.value)
  );
  const Malebmr = Math.floor(
    calculateMaleBMR(weight.value, height.value, age.value)
  );
  const genderValue = genderSelect.options[genderSelect.selectedIndex].value;
  const activityValue =
    activitySelect.options[activitySelect.selectedIndex].value;

  if (genderValue === "male") {
    console.log("male" + Malebmr);
  } else if (genderValue === "female") {
    console.log("female" + Femalebmr);
  }

  if (activityValue === "light") {
    console.log(activityValue);
    //
  } else if (activityValue === "moderate") {
    console.log(activityValue);
  } else if (activityValue === "active") {
    console.log(activityValue);
  }
  let BMR = 0;
  if (genderValue === "male") {
    BMR = Malebmr;
  } else if (genderValue === "female") {
    BMR = Femalebmr;
  }

  if (activityValue === "light") {
    calculateCalories(BMR, 1.375);
  } else if (activityValue === "moderate") {
    calculateCalories(BMR, 1.55);
  } else if (activityValue === "active") {
    calculateCalories(BMR * 1.725);
  }

  event.preventDefault();
});

//................................................//

const card = document.querySelector("#meal-container");
const generateButton = document.querySelector("#formSubmit");
card.classList.add("meal-card");

function generateMealPlan() {
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }
  // Define data for each meal
  const meals = [
    {
      image:
        "https://img.freepik.com/free-photo/traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18717.jpg?w=740&t=st=1672508714~exp=1672509314~hmac=89f318c0f4b23e4b1b78ae5e67edcea1879b9853ac130e733681b2b3e3d826f7",
      name: "Breakfast",
      calories: 400,
      description: "Scrambled eggs with toast and fruit",
      ingredients: ["2 eggs", "2 slices of bread", "1 banana"],
      recipe:
        "Heat a pan over medium heat. Beat the eggs in a small bowl and season with salt and pepper. Add the eggs to the pan and scramble until cooked. Toast the bread and slice the banana. Serve the eggs with the toast and sliced banana.",
    },
    {
      name: "Lunch",
      image:
        "https://img.freepik.com/free-photo/traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18717.jpg?w=740&t=st=1672508714~exp=1672509314~hmac=89f318c0f4b23e4b1b78ae5e67edcea1879b9853ac130e733681b2b3e3d826f7",
      calories: 600,
      description: "Grilled chicken salad",
      ingredients: [
        "4 oz grilled chicken",
        "2 cups mixed greens",
        "1/2 cup cherry tomatoes",
        "1/4 cup crumbled feta cheese",
      ],
      recipe:
        "Preheat the grill to medium-high heat. Season the chicken with your choice of spices and grill for 4-5 minutes per side or until fully cooked. In a large bowl, combine the mixed greens, cherry tomatoes, and crumbled feta cheese. Top the salad with the grilled chicken and serve.",
    },
    {
      name: "Dinner",
      image:
        "https://img.freepik.com/free-photo/traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18717.jpg?w=740&t=st=1672508714~exp=1672509314~hmac=89f318c0f4b23e4b1b78ae5e67edcea1879b9853ac130e733681b2b3e3d826f7",
      calories: 800,
      description: "Beef stir fry",
      ingredients: [
        "1 lb sirloin steak",
        "1 cup broccoli florets",
        "1 cup sliced bell peppers",
        "1/2 cup sliced onions",
        "2 cloves garlic",
      ],
      recipe:
        "Cut the steak into thin slices. Heat a large pan or wok over high heat and add the steak, broccoli, bell peppers, onions, and garlic. Stir fry for 5-7 minutes or until the vegetables are tender and the steak is cooked to your desired level of doneness. Serve over rice or noodles.",
    },
  ];

  // Generate meal cards for each meal
  const mealCards = meals.map((meal) => createMealCard(meal));

  // Append meal cards to the DOM
  const mealContainer = document.getElementById("meal-container");
  mealCards.forEach((card) => mealContainer.appendChild(card));

  generateButton.disabled = true;
  generateButton.textContent = "Meal Plan Generated";
}
function createMealCard(meal) {
  // Create elements for the meal card
  const card = document.createElement("div");
  card.classList.add("meal-cards");
  const image = document.createElement("img");
  const heading = document.createElement("h1");
  // const desc = document.createElement("p");
  const calorieInfo = document.createElement("p");
  // const ingredientList = document.createElement("ul");
  const recipeButton = document.createElement("button");

  // Add content to the elements
  image.src = meal.image;
  heading.textContent = meal.name;
  // desc.textContent = meal.description;
  calorieInfo.textContent = `Calories: ${meal.calories}`;
  // meal.ingredients.forEach((ingredient) => {
  //   const listItem = document.createElement("li");
  //   listItem.textContent = ingredient;
  //   ingredientList.appendChild(listItem);
  // });
  recipeButton.textContent = "View Recipe";
  recipeButton.onclick = () => alert(meal.recipe);

  // Append elements to the card

  card.appendChild(image).classList.add("card-images");
  card.appendChild(heading);
  card.appendChild(calorieInfo);
  card.appendChild(recipeButton).classList.add("btn");

  return card;
}
