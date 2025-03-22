import AccordionSections from "@/components/AccordionSections";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import React from "react";

const SelectedRecipe = ({ recipe, handleEnrollNow }: SelectedRecipeProps) => {
  return (
    <div className="selected-recipe">
      <div>
        <h3 className="selected-recipe__title">{recipe.title}</h3>
        <p className="selected-recipe__author">
          By {recipe.teacherName} |{" "}
          <span className="selected-recipe__enrollment-count">
            {recipe?.enrollments?.length}
          </span>
        </p>
      </div>

      <div className="selected-recipe__content">
        <p className="selected-recipe__description">{recipe.description}</p>

        <div className="selected-recipe__sections">
          <h4 className="selected-recipe__sections-title">Recipe Overview</h4>
          <AccordionSections sections={recipe.sections} />
        </div>

        <div className="selected-recipe__footer">
          <span className="selected-recipe__price">
            {formatPrice(recipe.price)}
          </span>
          <Button
            onClick={() => handleEnrollNow(recipe.recipeId)}
            className="bg-primary-700 hover:bg-primary-600"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedRecipe;
