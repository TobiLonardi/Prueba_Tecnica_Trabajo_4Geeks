import { UserList } from "../components/UserList"


export const Home = () => {
  return (
    <div>
      <h1 className="text-center">Gestión de Usuarios</h1>
      <UserList />
    </div>
  );
}