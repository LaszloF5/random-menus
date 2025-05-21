import React from "react";

interface Recipe {
  title: string;
  image_url: string;
  source_url: string;
}

interface CategoriesProps {
  btnText: string;
  items: string[];
  recipe: Recipe[];
  handleClick: (name: string) => void;
}

const categories: React.FC<CategoriesProps> = ({
  btnText,
  items,
  recipe,
  handleClick,
}) => {
  return (
    <>
      <h2>Categories</h2>
      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      {recipe.length > 0 && (
        <div className="recipe-container">
          {recipe.map((item, index) => (
            <div key={index} className="recipe-card">
              <p className="recipe-title">{item.title}</p>
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="recipe-image"
                />
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
              >
              <button className="btn-details">{btnText}</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default categories;
