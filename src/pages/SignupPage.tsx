import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth.api";
import logo from "../assets/logo.svg";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nome: "",
    documento: "",
    email: "",
    senha: "",
    nascimento: "",
    tipo: "ESTUDANTE",
    universidade: "",
    curso: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formatDocument = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return numbers
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "documento" ? formatDocument(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      setError(error.response?.data?.message || "Falha ao registrar. Verifique seus dados.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4 py-10">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 p-8 bg-surface rounded-lg shadow-primary w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-4 mb-2">
          <img src={logo} alt="UniHub Logo" className="w-48" />
          <h2 className="text-xl font-bold text-text-muted">Criar uma Conta</h2>
        </div>

        {error && <p className="text-danger text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 font-semibold text-sm text-center">Cadastro realizado! Redirecionando para login...</p>}
        
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-semibold text-text-muted">Nome Completo</label>
          <input id="nome" name="nome" type="text" value={formData.nome} onChange={handleChange} required minLength={3} pattern="^[a-zA-ZÀ-ÿ\s]*$" title="Apenas letras e espaços" className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="documento" className="text-sm font-semibold text-text-muted">Documento (CPF/CNPJ)</label>
          <input id="documento" name="documento" type="text" maxLength={18} value={formData.documento} onChange={handleChange} required className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nascimento" className="text-sm font-semibold text-text-muted">Data de Nascimento</label>
          <input id="nascimento" name="nascimento" type="date" max={new Date().toISOString().split('T')[0]} value={formData.nascimento} onChange={handleChange} required className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="tipo" className="text-sm font-semibold text-text-muted">Tipo de Usuário</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white">
            <option value="ESTUDANTE">Estudante</option>
            <option value="PROFESSOR">Professor</option>
            <option value="INSTITUICAO">Instituição</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="universidade" className="text-sm font-semibold text-text-muted">Universidade (Opcional)</label>
          <input id="universidade" name="universidade" type="text" value={formData.universidade} onChange={handleChange} className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="curso" className="text-sm font-semibold text-text-muted">Curso (Opcional)</label>
          <input id="curso" name="curso" type="text" value={formData.curso} onChange={handleChange} className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-text-muted">E-mail</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="senha" className="text-sm font-semibold text-text-muted">Senha</label>
          <input id="senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required minLength={8} className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
        </div>
        
        <button 
          type="submit" 
          disabled={success} 
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md shadow-sm transition-colors ${success ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'}`}
        >
          Cadastrar
        </button>
        
        <p className="text-center text-sm text-text-muted mt-2">
          Já tem uma conta? <Link to="/login" className="text-primary hover:underline font-semibold">Entre aqui</Link>.
        </p>
      </form>
    </div>
  );
}
