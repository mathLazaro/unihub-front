import { Feed } from "../components/feed/Feed";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-4">
      <div className="bg-surface p-6 rounded shadow-primary flex flex-col items-center justify-center text-center gap-2">
        <MagnifyingGlassIcon size={48} className="text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">
          {query ? `Resultados para: "${query}"` : "Página de Busca"}
        </h2>
        {!query && (
          <p className="text-gray-500 text-sm max-w-md">
            Digite algo na barra de pesquisa acima para encontrar posts interessantes!
          </p>
        )}
      </div>
      
      <div className="mt-4">
        <Feed q={query} />
      </div>
    </div>
  );
}
