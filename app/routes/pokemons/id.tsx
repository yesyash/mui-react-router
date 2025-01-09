import { Link, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query"

type TPokemonResponse = {
  name: string
  order: number
  sprites: {
    front_default: string
    front_shiny: string
  }
}

const PokemonsList = ({ data }: { data?: TPokemonResponse }) => {
  if (!data) {
    return <Typography variant="h4">No data</Typography>
  }

  return (
    <div>
      <Typography variant="h4" className="pb-4">{data.name}</Typography>

      <div>
        <img src={data.sprites.front_default} alt={data.name} width={200} height={200} />
      </div>
    </div>
  )
}

const getPokemonData = async (id: string): Promise<TPokemonResponse> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
}

export default function PokemonDetails() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    enabled: params.id !== undefined,
    queryKey: ['getPokemonData ', params.id],
    queryFn: () => getPokemonData(params.id ?? ''),
  });

  if (isLoading) {
    return <div className="p-6">loading...</div>
  }

  if (isError) {
    return <div className="p-6">Error</div>
  }

  return (
    <div className="p-6">
      <PokemonsList data={data} />
    </div>
  )
}