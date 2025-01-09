import { Grid2, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "components/back-button";
import { Link as RouterLink } from "react-router";

type TPokemonsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>
}

const PokemonsList = ({ data }: { data: TPokemonsResponse }) => {
  return (
    <div>
      <Typography variant="h6" className="pb-4">Total Pokemons: {data.count}</Typography>

      <div>
        {data.results.map((pokemon, index) => (
          <div>
            <Link component={RouterLink} key={pokemon.name} to={`/pokemons/${index + 1}`}>
              {pokemon.name}
            </Link>
          </div>
        ))
        }
      </div>
    </div>
  )
}

const getAllPokemons = async (): Promise<TPokemonsResponse> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  return res.json();
}

export default function Pokemons() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getAllPokemons,
  });

  return (
    <Grid2 container direction="column" alignItems="flex-start" padding={4} spacing={4}>
      <BackButton />

      <Grid2 container direction="column" alignItems="flex-start" spacing={2}>
        <Typography variant="h3">Pokemons</Typography>

        {isLoading ?
          <div>loading...</div> :
          isError ? <div>Error</div> :
            !data ? <div>no data</div>
              : <PokemonsList data={data} />
        }
      </Grid2>
    </Grid2>
  )
}