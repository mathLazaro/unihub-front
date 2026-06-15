import {
  HouseSimpleIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react";
import logo from "../../assets/logo.png";
import Input from "../input/Input";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleSearchButtonClick = () => {
    if (currentPath === "/search") return;
    navigate("/search");
  };
  const handleHomeButtonClick = () => {
    if (currentPath === "/") return;
    navigate("/");
  };
  const handleProfileButtonClick = () => {
    if (currentPath === "/profile") return;
    navigate("/profile");
  };
  const handleSignOutButtonClick = () => {
    // TODO - Implementar lógica de logout
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between bg-surface shadow-primary p-2 px-[10vw]">
      <span className="flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-8 h-8 mr-2 bg-primary cursor-pointer"
          onClick={handleHomeButtonClick}
        />
        {currentPath !== "/profile" && (
          <Input
            placeholder="Buscar oportunidades, pessoas..."
            value=""
            onChange={() => {}}
            icon={<MagnifyingGlassIcon size={20} />}
            width="500px"
          />
        )}
      </span>
      <span className="flex items-center gap-8">
        <button
          className={`section-button text-sm ${currentPath === "/" ? "active" : ""}`}
          onClick={handleHomeButtonClick}
        >
          <HouseSimpleIcon size={32} />
          <span>Início</span>
        </button>
        <button
          className={`section-button text-sm ${currentPath === "/search" ? "active" : ""}`}
          onClick={handleSearchButtonClick}
        >
          <MagnifyingGlassIcon size={32} />
          <span>Buscar</span>
        </button>
        <button
          className={`section-button text-sm ${currentPath === "/profile" ? "active" : ""}`}
          onClick={handleProfileButtonClick}
        >
          <UserIcon size={32} />
          <span>Perfil</span>
        </button>

        <button onClick={handleSignOutButtonClick}>
          <span className="text-sm sign-out-button">
            <SignOutIcon size={32} />
            Sair
          </span>
        </button>
      </span>
    </nav>
  );
}
