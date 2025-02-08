const Sidebar: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } fixed inset-0 bg-black bg-opacity-50 z-50`}
      onClick={() => setSidebarOpen(false)}
    ></div>
  );
};

export default Sidebar;
