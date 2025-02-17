import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AddGenre } from "./components/AddGenre";
import { AddMovie } from "./components/AddMovie";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Dashbord } from "./components/Dashbord";

function App() {
  return (
    <>
      <Header />
      <SideBar/>
      <Routes>
        <Route path="/" element={<Dashbord />}></Route>
        <Route path="/add-movies" element={<AddMovie />}></Route>
        <Route path="/add-genre" element={<AddGenre />}></Route>
      </Routes>
    </>
  );
}

export default App;
