import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";

interface MenuItem {
  title: string;
  url: string;
  submenu?: MenuItem[];
}

const SidebarItemCollapse: React.FC<MenuItem>  = (menuItems) => {
  const [open, setOpen] = useState(false);

  return (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: "#a9aaa9"
            },
            paddingY: "12px",
            paddingX: "24px"
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {menuItems.title}
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {menuItems.submenu?.map((menu, index) => (
                menu.submenu ? (
                  <SidebarItemCollapse title={menu.title} url={menu.url} submenu={menu.submenu} key={index} />
                ) : (
                  <SidebarItem title={menu.title} url={menu.url} submenu={menu.submenu} key={index} />
                )
            ))}
          </List>
        </Collapse>
      </>
  );
};

export default SidebarItemCollapse;