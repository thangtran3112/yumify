import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const RecipeCardSearch = ({
  recipe,
  isSelected,
  onClick,
}: SearchRecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`recipe-card-search group ${
        isSelected
          ? "recipe-card-search--selected"
          : "recipe-card-search--unselected"
      }`}
    >
      <div className="recipe-card-search__image-container">
        <Image
          src={recipe.image || "/placeholder.png"}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="recipe-card-search__image"
          priority
        />
      </div>
      <div className="recipe-card-search__content">
        <div>
          <h2 className="recipe-card-search__title">{recipe.title}</h2>
          <p className="recipe-card-search__description">
            {recipe.description}
          </p>
        </div>
        <div className="mt-2">
          <p className="recipe-card-search__teacher">By {recipe.teacherName}</p>
          <div className="recipe-card-search__footer">
            <span className="recipe-card-search__price">
              {formatPrice(recipe.price)}
            </span>
            <span className="recipe-card-search__enrollment">
              {recipe.enrollments?.length} Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSearch;
