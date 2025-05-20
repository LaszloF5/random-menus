import React from "react";

  interface Recipe {
    title: string;
    image_url: string;
    source_url: string;
  }

interface CategoriesProps {
  items: string[];
  recipe: Recipe[];
  handleClick: (name: string) => void;
}


const categories: React.FC<CategoriesProps> = ({ items, recipe, handleClick }) => {
  return (
    <>
      <h2>Categories</h2>
      <ul className="grid-list">
        {items.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      {recipe.length > 0 && (
        <>
          {recipe.map((item, index) => (
            <div key={index} className="recipe-card">
              <a href={item.source_url} target="_blank" rel="noopener noreferrer">
                <img src={item.image_url} alt={item.title} className="recipe-image" />
                <p>{item.title}</p>
              </a>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default categories;