import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AccordionSections from "./AccordionSections";

const RecipePreview = ({ recipe }: RecipePreviewProps) => {
  const price = formatPrice(recipe.price);
  return (
    <div className="recipe-preview">
      <div className="recipe-preview__container">
        <div className="recipe-preview__image-wrapper">
          <Image
            src={recipe.image || "/placeholder.png"}
            alt="Recipe Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="recipe-preview__title">{recipe.title}</h2>
          <p className="text-gray-400 text-md mb-4">by {recipe.teacherName}</p>
          <p className="text-sm text-customgreys-dirtyGrey">
            {recipe.description}
          </p>
        </div>

        <div>
          <h4 className="text-white-50/90 font-semibold mb-2">
            Recipe Content
          </h4>
          <AccordionSections sections={recipe.sections} />
        </div>
      </div>

      <div className="recipe-preview__container">
        <h3 className="text-xl mb-4">Price Details (1 item)</h3>
        <div className="flex justify-between mb-4 text-customgreys-dirtyGrey text-base">
          <span className="font-bold">1x {recipe.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="font-bold text-lg">Total Amount</span>
          <span className="font-bold text-lg">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;
