import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.api";
import logo from "../assets/logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, senha: password } as any);
      localStorage.setItem("accessToken", response.token);
      // Trigger a storage event manually to notify the AuthProvider in the same tab
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch {
      setError("Falha ao entrar. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 p-8 bg-surface rounded-lg shadow-primary w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-4 mb-2">
          <img src={logo} alt="UniHub Logo" className="w-48" />
          <h2 className="text-xl font-bold text-text-muted">Entrar na sua conta</h2>
        </div>

        {error && <p className="text-danger text-sm text-center">{error}</p>}
        
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-text-muted">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-text-muted">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full py-3 mt-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 transition-colors shadow-sm"
        >
          Entrar
        </button>
        
        <p className="text-center text-sm text-text-muted mt-2">
          Não tem uma conta? <Link to="/signup" className="text-primary hover:underline font-semibold">Cadastre-se aqui</Link>.
        </p>
      </form>
    </div>
  );
}
