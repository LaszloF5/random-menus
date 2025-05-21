import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Categories from "./Components/categories";

interface Recipe {
  title: string;
  image_url: string;
  source_url: string;
}

function App() {
  //https://forkify-api.herokuapp.com/

  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/categories') {
      document.title = 'Everyday Meals | Categories'
    } else {
      document.title = 'Everyday Meals | Home'
    }
  }, [location.pathname]);

    const btnText:string = 'Details >>>';

    const mainText: string = `Click the button below for a random meal, or explore the 'Categories' menu to find meals by category.`;

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

  const [recipe, setRecipe] = useState<Recipe[]>([]);

  const getMenu = () => {
    const randomItem = Math.floor(Math.random() * items.length);
    axios
      .get(
        `https://forkify-api.herokuapp.com/api/search?q=${items[randomItem]}`
      )
      .then((response) => {
        const recipes = response.data.recipes;
        if (recipes.length === 0) {
          console.warn("No recipes found for:", items[randomItem]);
          return;
        }
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const selectedRecipe = recipes[randomIndex];
        const currRecipe = [
          {
            title: selectedRecipe.title,
            image_url: selectedRecipe.image_url,
            source_url: selectedRecipe.source_url,
          },
        ];
        setRecipe(currRecipe);
      });
  };

  const handleClick = (name: string) => {
    axios
      .get(`https://forkify-api.herokuapp.com/api/search?q=${name}`)
      .then((response) => {
        const recipes = response.data.recipes;
        if (recipes.length === 0) {
          console.warn("No recipes found.");
          return;
        }
        const formattedRecipes = recipes.map((r: any) => ({
          title: r.title,
          image_url: r.image_url,
          source_url: r.source_url,
        }));
        setRecipe(formattedRecipes);
      });
  };

  const resetResult = () => {
    setRecipe([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="App-header-nav">
          <ul className="App-header-nav-ul">
            <li><Link to="/" onClick={resetResult} className="App-header-nav-ul-li_link">Home</Link></li>
            <li><Link to="/categories" onClick={resetResult} className="App-header-nav-ul-li_link">Categories</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/categories" element={
          <Categories items={items} recipe={recipe} handleClick={handleClick} btnText={btnText}/>
        } />
        <Route path="/" element={
          <>
          <div className="home-decoration-1"></div>
          <div className="home-decoration-2"></div>
          <div className="home-decoration-3"></div>
            <p className="instructions">{mainText}
            </p>
            <button onClick={getMenu} className="btn-main">Get a random meal</button>
            {recipe.length > 0 && (
              <>
                {recipe.map((item, index) => (
                  <div key={index} className="recipe-card">
                      <p className="recipe-title">{item.title}</p>
                      <img src={item.image_url} alt={item.title} className="recipe-image" />
                    <a href={item.source_url} target="_blank" rel="noopener noreferrer">
                      <button className="btn-details">{btnText}</button>
                    </a>
                  </div>
                ))}
              </>
            )}
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;