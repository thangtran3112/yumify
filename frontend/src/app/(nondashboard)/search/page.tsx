"use client";

import Loading from "@/components/Loading";
import { useGetRecipesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RecipeCardSearch from "@/components/RecipeCardSearch";
import SelectedRecipe from "./SelectedRecipe";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: recipes, isLoading, isError } = useGetRecipesQuery({});
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (recipes) {
      if (id) {
        const recipe = recipes.find((c) => c.recipeId === id);
        setSelectedRecipe(recipe || recipes[0]);
      } else {
        setSelectedRecipe(recipes[0]);
      }
    }
  }, [recipes, id]);

  if (isLoading) return <Loading />;
  if (isError || !recipes) return <div>Failed to fetch recipes</div>;

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    router.push(`/search?id=${recipe.recipeId}`, {
      scroll: false,
    });
  };

  const handleEnrollNow = (recipeId: string) => {
    router.push(`/checkout?step=1&id=${recipeId}&showSignUp=false`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available recipes</h1>
      <h2 className="search__subtitle">{recipes.length} recipes avaiable</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__recipes-grid"
        >
          {recipes.map((recipe) => (
            <RecipeCardSearch
              key={recipe.recipeId}
              recipe={recipe}
              isSelected={selectedRecipe?.recipeId === recipe.recipeId}
              onClick={() => handleRecipeSelect(recipe)}
            />
          ))}
        </motion.div>

        {selectedRecipe && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-recipe"
          >
            <SelectedRecipe
              recipe={selectedRecipe}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;
