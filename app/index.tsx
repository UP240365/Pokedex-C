import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        console.log("bad request");
      }
    } catch (error) {
      console.log("ocurrio un error");
    }
  };

  const filterPokemon = results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView>
      <TextInput
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          margin: 10,
          borderRadius: 8,
        }}
      />

      <View>
        {filterPokemon.map((item) => {
          return (
            <PokemonCard key={item.name} name={item.name} url={item.url} />
          );
        })}
      </View>
    </ScrollView>
  );
}
