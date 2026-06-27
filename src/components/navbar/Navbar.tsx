import {
  HouseSimpleIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserIcon,
  Bell,
  BellIcon
} from "@phosphor-icons/react";
import logo from "../../assets/logo.svg";
import Input from "../input/Input";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationBell } from "../notification/NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const currentPath = window.location.pathname;

  const handleSearchButtonClick = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    } else if (currentPath !== "/search") {
      navigate("/search");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  const handleHomeButtonClick = () => {
    if (currentPath !== "/") navigate("/");
  };
  const handleProfileButtonClick = () => {
    setSearch("");
    if (currentPath !== "/profile") navigate("/profile");
  };
  const handleSignOutButtonClick = () => navigate("/login");

  const navButtons = (
    <>
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
      <NotificationBell />
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
    </>
  );

  return (
    <>
      <nav className="hidden md:flex w-[100%] items-center justify-between bg-surface shadow-primary p-2 px-[10vw] gap-10">
        <span className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-40 cursor-pointer"
            onClick={handleHomeButtonClick}
          />
          {currentPath !== "/profile" && (
            <Input
              placeholder="Buscar oportunidades, pessoas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              icon={<MagnifyingGlassIcon size={20} />}
              width="25vw"
            />
          )}
        </span>
        <span className="flex items-center gap-8">
          {navButtons}
        </span>
      </nav>

      <div className="md:hidden bg-surface shadow-primary p-3 px-4 flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className="w-40 cursor-pointer"
          onClick={handleHomeButtonClick}
        />
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-surface shadow-primary p-2">
        {navButtons}
      </nav>
    </>
  );
}
