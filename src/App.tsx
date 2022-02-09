import { Routes, Route, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>&nbsp;<NavLink to="/about">about</NavLink>
      </div>

      <Routes>
        <Route path="/" element={<div className="font-bold">home</div>} />
        <Route path="/about" element={<div>about</div>} />
      </Routes>
    </div>
  );
}
