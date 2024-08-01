// import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const YourAccount = () => {
  // const navigate = useNavigate();
  return (
    <main name="your-account" className="w-full">
      <section className="p-6 mx-auto max-w-5xl">
        <Outlet />
      </section>
    </main>
  );
};

export default YourAccount;
