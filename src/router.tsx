import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { fetchPokemonList, fetchPokemonById } from "./services/PokemonService";
import PokemonDetail from "./pages/PokemonDetail";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={<Dashboard fetchPokemonList={fetchPokemonList} />}
      />
      <Route
        path="pokemon/:id"
        element={<PokemonDetail fetchPokemonDetail={fetchPokemonById} />}
      />

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
