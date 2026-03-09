import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}
export default function PokemonDetailsScreen() {
  const params = useLocalSearchParams();
  const [pokemonData, setPokemonData] = useState<any>(null);
  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonData = async () => {
    try {
      const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
      const response = await fetch(URL, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        console.log("bad request");
      }
    } catch (error) {
      console.log("ocurrio un error");
    }
  };

  return (
    <View>
      <Text>{params.name}</Text>
      <Text>{JSON.stringify(pokemonData)}</Text>
    </View>
  );
}
