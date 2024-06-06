import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { motion, Variants } from "framer-motion";
import classNames from "classnames";
interface MenuItem {
  title: string;
  url: string;
  submenu?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapseMobile: boolean;
}

const Sidebar: React.FC<Props>  = ({menuItems,toggleCollapseMobile}) => {
  return (
    <Drawer
        sx={{
          width: "300px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "px",
            boxSizing: 'border-box',
            backgroundColor: "#DDDDD",
            opacity:0.97,
            color: "#000000"
          },
        }}
        variant="persistent"
        anchor="left"
        open={toggleCollapseMobile}
      >
        <List disablePadding>
          {menuItems.map((menu, index) => (
              menu.submenu? (
                <SidebarItemCollapse title={menu.title} url={menu.url} submenu={menu.submenu} key={index} />
              ) : (
                <SidebarItem  title={menu.title} url={menu.url} submenu={menu.submenu} key={index} />
              )
          ))}
        </List>
      </Drawer>
  );
};

export default Sidebar;