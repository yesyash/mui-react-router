import { Link as RouterLink } from "react-router";
import type { Route } from "./+types/home";
import { Grid2, Link, Typography } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Grid2 container direction="column" alignItems="flex-start" padding={4} spacing={2}>
      <Grid2 container alignItems="flex-end" spacing={1}>
        <Typography variant="h2">Pokemon App</Typography>
        <Typography variant="h6" className="text-gray-500">Using React router</Typography>
      </Grid2>

      <Link component={RouterLink} to="/pokemons">Go to Pokemons </Link>
    </Grid2>
  )
}
