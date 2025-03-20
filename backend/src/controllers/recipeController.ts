import { Request, Response } from "express";
import Recipe from "../models/recipeModel";

export const listRecipes = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { category } = req.query;
    try {
        const recipes =
            category && category !== "all"
                ? await Recipe.scan("category").eq(category).exec()
                : await Recipe.scan().exec();
        res.json({ message: "Recipes retrieved successfully", data: recipes });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving recipes", error });
    }
};

export const getRecipe = async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.params;
    try {
        const recipe = await Recipe.get(recipeId);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }

        res.json({ message: "Recipe retrieved successfully", data: recipe });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving recipe", error });
    }
};