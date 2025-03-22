/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { User as ClerkUser } from "@clerk/nextjs/server";


const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Recipes", "Users", "UserProgress"],
  endpoints: (build) => ({
    /* 
===============
USER CLERK
=============== 
*/
    updateUser: build.mutation<ClerkUser, Partial<ClerkUser> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    /* 
===============
RECIPES
=============== 
*/
    getRecipes: build.query<Recipe[], { category?: string }>({
      query: ({ category }) => ({
        url: "recipes", // localhost:8001/recipes
        params: { category },
      }),
      providesTags: ["Recipes"],
    }),
    getRecipe: build.query<Recipe, string>({
      query: (id) => `recipes/${id}`,
      // cache the specific recipe by its id, for invalidation
      providesTags: (result, error, id) => [{ type: "Recipes", id }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useUpdateUserMutation,
  useGetRecipeQuery
} = api;
