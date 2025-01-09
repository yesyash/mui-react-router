import { Link as RouterLink } from "react-router";
import type { Route } from "./+types/home";
import { Link, Typography } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-6">
      <Typography variant="h2" className="pb-4">Using react router</Typography>
      <Link component={RouterLink} to="/pokemons">Pokemons</Link>
    </div>
  )
}
