import MenuItems from "./MenuItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LangSelector from "../LangSelector/LangSelector";
import { FormattedMessage, useIntl } from "react-intl"
import MenuHambuger from "./MenuHambuger";
import Sidebar from "./common/Sidebar";
import Image from "next/image";
const Navbar = () => {
  const intl = useIntl();
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  //things shall be on navbar menu
  const menuItemsData = [
    {
      title: intl.formatMessage({ id: 'NavBar.home' }),
      url: "/",
    },

    {
      title: intl.formatMessage({ id: 'NavBar.serv' }),
      url: "/services",
      submenu: [
        {
          title: intl.formatMessage({ id: 'NavBar.serv.subroute1' }),
          url: "https://app.tdlogistics.net.vn",
        },
        {
          title: intl.formatMessage({ id: 'NavBar.serv.subroute2' }),
          url: "/pricelist",
        },
      ],
    },

    {
      title: intl.formatMessage({ id: 'NavBar.enroll' }),
      url: "/enroll",
      submenu: [
        {
          title: intl.formatMessage({ id: 'NavBar.enroll.subroute1' }),
          url: "https://delivery.tdlogistics.net.vn", //this will be connect to another url driver website
        },
        {
          title: intl.formatMessage({ id: 'NavBar.enroll.subroute2' }),
          url: "/driverhelp",
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'NavBar.info' }),
      url: "/info",
      submenu: [
        {
          title:  intl.formatMessage({ id: 'NavBar.info.subroute1' }),
          url: "/news",
        },
        {
          title: intl.formatMessage({ id: 'NavBar.info.subroute2' }),
          url: "/about",
        },
      ],
    }
  ];
  //
  const [textColor, setTextColor] = useState("black");


  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setTextColor("#000000");
      } else {
        setTextColor("#000000");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);
  return (
    <>
      <div
        className="fixed w-full z-10 mt-5 animate-fade-in-down px-2 "
      >
        <div className=" max-w-[1240px] m-auto flex shadow-2xl bg-white rounded-xl justify-between items-center text-black px-2">
          <Link href="/">
          <Image
            src="/Logo_name.png"
            width={225}
            height={50}
            alt="Picture of the author"
          />
          </Link>
          <ul style={{ color: `${textColor}` }} className="hidden lg:flex gap-5">
            {menuItemsData.map((menu, index) => {
              return (<MenuItems items={menu} key={index} depthLevel={0} textColor={textColor} />);
            })}
          </ul>
          <div className="flex items-center">
            <LangSelector IconColor={textColor}/>
            <MenuHambuger IconColor={textColor} toggle ={handleSidebarToggleMobile}/>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="inset-0 bottom-0 left-0 right-0 bg-black/70 z-50">
        <Sidebar menuItems={menuItemsData} toggleCollapseMobile={toggleCollapseMobile} />
        </div>
      </div>
    </>
  );
};

export default Navbar;