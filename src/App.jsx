import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [score, setScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [difficulty, setDifficulty] = useState(10);
  const [highScore, setHighScore] = useState(0);

  const pokemonList = pokemon.map((entry) => (
    <div className="card" key={entry.id} onClick={() => handleClick(entry)}>
      <img src={entry.image}></img>
      <div>{entry.name}</div>
    </div>
  ));
  function handleClick(target) {
    if (target.found) {
      setScore(0);
      fetchPokemon(difficulty);
      return;
    }
    if (score === highScore) {
      setHighScore(score + 1);
    }
    setScore(score + 1);
    const newPokemon = pokemon.map((entry) => {
      if (entry.id === target.id) {
        return { ...entry, found: true };
      } else {
        return entry;
      }
    });

    setPokemon(newPokemon);
  }

  async function fetchPokemon(count) {
    /*TODO: currently it waits for every fetch to finish */
    let pokemon = [];
    while (pokemon.length < count) {
      const id = Math.floor(Math.random() * 1025 + 1);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const json = await response.json();
      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].id === id) {
          return;
        }
      }
      pokemon.push({
        id: id,
        name: json.name,
        image: json.sprites.front_default,
        found: false,
      });
    }
    setPokemon(pokemon);
  }

  useEffect(() => {
    let array = pokemon;
    let currentIndex = pokemon.length;
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setPokemon(array);
  }, [score, pokemon]);
  return (
    <>
      <div>
        Score:{score} High Score:{highScore}
      </div>
      <label>
        Difficulty:
        <input
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
        ></input>
      </label>
      <button onClick={() => fetchPokemon(difficulty)}>fetch</button>
      <div className="cardContainer ">{pokemonList}</div>
    </>
  );
}

export default App;
