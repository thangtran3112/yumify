import express from "express";
import { getRecipe, listRecipes } from "../controllers/recipeController";

const router = express.Router();

router.get("/", listRecipes);
router.get("/:recipeId", getRecipe);

export default router;
