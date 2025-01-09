import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { useQuery } from "@tanstack/react-query"

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
              {pokemon.name} - {pokemon.url}
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
    <div className="p-6">
      <Typography variant="h3" className="pb-6">Pokemons</Typography>

      {isLoading ?
        <div>loading...</div> :
        isError ? <div>Error</div> :
          !data ? <div>no data</div>
            : <PokemonsList data={data} />
      }
    </div>
  )
}