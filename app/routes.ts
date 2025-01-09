import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), 
  route("pokemons", "routes/pokemons.tsx")
] satisfies RouteConfig;
