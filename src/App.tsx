import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //https://forkify-api.herokuapp.com/

  const items: string[] = [
    "carrot",
    "broccoli",
    "asparagus",
    "cauliflower",
    "corn",
    "cucumber",
    "green pepper",
    "lettuce",
    "mushrooms",
    "onion",
    "potato",
    "pumpkin",
    "red pepper",
    "tomato",
    "beetroot",
    "brussel sprouts",
    "peas",
    "zucchini",
    "radish",
    "sweet potato",
    "artichoke",
    "leek",
    "cabbage",
    "celery",
    "chili",
    "garlic",
    "basil",
    "coriander",
    "parsley",
    "dill",
    "rosemary",
    "oregano",
    "cinnamon",
    "saffron",
    "green bean",
    "bean",
    "chickpea",
    "lentil",
    "apple",
    "apricot",
    "avocado",
    "banana",
    "blackberry",
    "blackcurrant",
    "blueberry",
    "boysenberry",
    "cherry",
    "coconut",
    "fig",
    "grape",
    "grapefruit",
    "kiwifruit",
    "lemon",
    "lime",
    "lychee",
    "mandarin",
    "mango",
    "melon",
    "nectarine",
    "orange",
    "papaya",
    "passion fruit",
    "peach",
    "pear",
    "pineapple",
    "plum",
    "pomegranate",
    "quince",
    "raspberry",
    "strawberry",
    "watermelon",
    "salad",
    "pizza",
    "pasta",
    "popcorn",
    "lobster",
    "steak",
    "bbq",
    "pudding",
    "hamburger",
    "pie",
    "cake",
    "sausage",
    "tacos",
    "kebab",
    "poutine",
    "seafood",
    "chips",
    "fries",
    "masala",
    "paella",
    "som tam",
    "chicken",
    "toast",
    "marzipan",
    "tofu",
    "ketchup",
    "hummus",
    "chili",
    "maple syrup",
    "parma ham",
    "fajitas",
    "champ",
    "lasagna",
    "poke",
    "chocolate",
    "croissant",
    "arepas",
    "bunny chow",
    "pierogi",
    "donuts",
    "rendang",
    "sushi",
    "ice cream",
    "duck",
    "curry",
    "beef",
    "goat",
    "lamb",
    "turkey",
    "pork",
    "fish",
    "crab",
    "bacon",
    "ham",
    "pepperoni",
    "salami",
    "ribs",
  ];

  const [isUrl, setUrl] = useState<string>("");
  const [isImage, setImage] = useState<string>("");
  const [isTitle, setTitle] = useState<string>("");

  const getMenu = () => {
    const randomItem = Math.floor(Math.random() * items.length);
    axios
      .get(
        `https://forkify-api.herokuapp.com/api/search?q=${
          items[randomItem]
        }`
      )
      .then(
        (response) => {
          const recipes = response.data.recipes;
          if (recipes.length === 0) {
            console.warn('No recipes found for:', randomItem);
            return;
          }
          const randomIndex = Math.floor(Math.random() * recipes.length);
          const selectedRecipe = response.data.recipes[randomIndex];
          setImage(selectedRecipe.image_url);
          setTitle(selectedRecipe.title);
          setUrl(selectedRecipe.source_url);
        }
      );
    };
    
    const handleClick = (name: string) => {
      axios
      .get(`https://forkify-api.herokuapp.com/api/search?q=${name}`)
      .then(
        (response) => {
          const recipes = response.data.recipes;
          if (recipes.length === 0) {
            console.warn('No recipes found.');
            return;
          }
          const randomIndex = Math.floor(Math.random() * recipes.length);
          const selectedRecipe = response.data.recipes[randomIndex];
          setImage(selectedRecipe.image_url);
          setTitle(selectedRecipe.title);
          setUrl(selectedRecipe.source_url);
        }
      );
  };

  /*
  Egy listát csinálni az összes ételből.
  */

  return (
    <div className="App">
      <header className="App-header"></header>
      <button onClick={getMenu}>Get a random meal</button>
      <p>Itt random menüt kapsz a kiválasztott kategóriából.</p>
      <ul className="grid-list">
  {items.map((item, index) => (
    <li key={index} onClick={() => handleClick(item)}>
      {item}
    </li>
  ))}
</ul>
      {isImage.length === 0 ? '' : <a target="blank" href={`${isUrl}`}><img src={`${isImage}`} alt={`${isTitle}`}/></a>}
    </div>
  );
}

export default App;
