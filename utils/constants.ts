export const API_BASE_URL = "http://localhost:3000";

export const ROUTES = {
  recipes: `${API_BASE_URL}/recipes`,
  recipeById: (id: string) => `${API_BASE_URL}/recipes/${id}`,
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
};
