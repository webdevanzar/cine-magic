import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menus = [
    { name: "Dashbord", link: "/" },
    { name: "Add Movies", link: "/add-movies" },
    { name: "Add Genre", link: "/add-genre" },
  ];

  const openNav = () => setIsOpen(true);

  const closeNav = () => setIsOpen(false);

  return (
    <div className="relative z-50">
      <button
        className={`text-[32px] font-extrabold top-14 text-black cursor-pointer border-none px-3 py-2 fixed md:hidden z-50 ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={openNav}
      >
        ☰
      </button>

      <div
        className={`md:translate-x-0 h-[calc(100vh-64px)] w-[180px] md:w-[200px] fixed bottom-0 left-0 bg-black overflow-x-hidden pt-10 transition-all duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <span
          className="md:hidden text-[24px] text-white cursor-pointer border-none absolute right-4 top-0"
          onClick={closeNav}
        >
          &times;
        </span>
        {menus?.map((menu, index) => (
          <Link to={menu?.link} key={index}>
            <div className="block text-[18px] no-underline py-[10px] px-[15px] font-bold text-[white] transition-[0.9s] hover:text-[#f1f1f1]">
              {menu?.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
