import { Box, Grid2, Link, Typography } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
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

const PokemonList = ({ data }: { data?: TPokemonsResponse }) => {
  return (
    <div className="w-full">
      <Typography variant="h6" className="pb-4">Total Pokemons: {data?.count}</Typography>

      <Box sx={{ height: 520, width: '100%' }}>
        <DataGridPro
          rowHeight={38}
          columns={[{ field: 'name', headerName: 'Name', renderCell: (params) => <Link component={RouterLink} to={`/pokemons/${params.id}`}>{params.value}</Link> }]}
          rows={data?.results.map((pokemon, index) => ({ id: index + 1, name: pokemon.name }))}
        />
      </Box>
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

      <Grid2 container direction="column" alignItems="flex-start" spacing={2} width="100%">
        <Typography variant="h3">Pokemons</Typography>

        {isLoading ?
          <div>loading...</div> :
          isError ? <div>Error</div> :
            !data ? <div>no data</div>
              : <PokemonList data={data} />
        }
      </Grid2>
    </Grid2>
  )
}