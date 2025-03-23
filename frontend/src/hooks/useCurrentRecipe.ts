import { useGetRecipeQuery } from "@/state/api";
import { useSearchParams } from "next/navigation";

export const useCurrentRecipe = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id") ?? "";
  const { data: recipe, ...rest } = useGetRecipeQuery(recipeId);

  return { recipe, recipeId, ...rest };
};
