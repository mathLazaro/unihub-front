import { useEffect, useState } from "react";
import { UserCircleIcon } from "@phosphor-icons/react";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { Modal } from "../components/Modal";
import { getUserProfile, updateUserProfile, updatePassword } from "../api/users.api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editData, setEditData] = useState({ nome: "", universidade: "", curso: "" });
  
  // Password State
  const [passwordData, setPasswordData] = useState({ senhaAtual: "", novaSenha: "" });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setEditData({
        nome: data.nome || "",
        universidade: data.universidade || "",
        curso: data.curso || ""
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    try {
      await updateUserProfile(editData);
      await loadProfile(); // reload UI
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar perfil");
    }
  };

  const handlePasswordSave = async () => {
    setPasswordError("");
    if (passwordData.novaSenha.length < 8) {
      setPasswordError("A nova senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      await updatePassword(passwordData);
      setIsPasswordModalOpen(false);
      setPasswordData({ senhaAtual: "", novaSenha: "" });
      alert("Senha alterada com sucesso!");
    } catch (e: any) {
      console.error(e);
      setPasswordError(e.response?.data?.message || "Erro ao atualizar senha");
    }
  };

  if (loading) return <div className="p-10 text-center">Carregando...</div>;
  if (!profile) return <div className="p-10 text-center text-red-500">Erro ao carregar perfil.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <div className="bg-surface p-8 rounded shadow-primary flex flex-col items-center gap-4">
        <UserCircleIcon size={120} weight="fill" color="#457ccb" />
        <h2 className="text-2xl font-bold">{profile.nome}</h2>
        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
          {profile.tipo}
        </span>
      </div>

      <div className="bg-surface p-6 rounded shadow-primary flex flex-col gap-4">
        <h3 className="font-semibold text-lg border-b pb-2">Informações Pessoais</h3>
        
        <div className="flex flex-col gap-3">
          <Input label="Nome Completo" value={profile.nome} disabled placeholder="Seu nome" />
          <Input label="E-mail" value={profile.email} disabled placeholder="Seu e-mail" />
          <Input label="Documento" value={profile.documento} disabled />
          <Input label="Universidade" value={profile.universidade || "Não informada"} disabled />
          <Input label="Curso" value={profile.curso || "Não informado"} disabled />
          
          <div className="mt-4 flex gap-4 justify-end">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
              Editar Perfil
            </Button>
            <Button variant="primary" onClick={() => setIsPasswordModalOpen(true)}>
              Alterar Senha
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Editar Perfil</h2>
          <Input 
            label="Nome Completo" 
            value={editData.nome} 
            onChange={(e) => setEditData({...editData, nome: e.target.value})} 
          />
          <Input 
            label="Universidade" 
            value={editData.universidade} 
            onChange={(e) => setEditData({...editData, universidade: e.target.value})} 
          />
          <Input 
            label="Curso" 
            value={editData.curso} 
            onChange={(e) => setEditData({...editData, curso: e.target.value})} 
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleEditSave}>Salvar</Button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Alterar Senha</h2>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <Input 
            label="Senha Atual" 
            type="password"
            value={passwordData.senhaAtual} 
            onChange={(e) => setPasswordData({...passwordData, senhaAtual: e.target.value})} 
          />
          <Input 
            label="Nova Senha" 
            type="password"
            value={passwordData.novaSenha} 
            onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})} 
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setIsPasswordModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handlePasswordSave}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
