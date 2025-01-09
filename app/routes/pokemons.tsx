import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"

const fetchDummyPokemons = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  return res.json();
}

export default function Pokemons() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons'],
    queryFn: fetchDummyPokemons,
  });

  return (
    <div>
      <Typography variant="h3">Pokemons</Typography>
      {isLoading ? <div>loading...</div> : isError ? <div>Error</div> : <pre>{JSON.stringify(data, null, 4)}</pre>}
    </div>
  )
}