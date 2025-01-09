import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), 
  ...prefix("pokemons", [
    index("routes/pokemons/home.tsx"),
    route(":id", "routes/pokemons/id.tsx")
  ])
] satisfies RouteConfig;
