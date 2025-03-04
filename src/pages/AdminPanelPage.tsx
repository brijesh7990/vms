import AdminTable from "../components/admin/AdminTable";
import Sidebar from "../components/admin/Sidebar";

const AdminPanelPage = () => {

  return (
    <div className="flex h-screen bg-[#1D222B]">
      <div
        className={`fixed md:relative w-[250px] h-full bg-[#2A303D] shadow-lg transition-transform  md:translate-x-0 md:block hidden`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 p-5 flex flex-col items-center overflow-y-auto justify-center">
        <AdminTable />
      </div>
    </div>
  );
};

export default AdminPanelPage;
