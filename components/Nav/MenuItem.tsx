import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
export default function NavMenu({ items, depthLevel, textColor }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="font-bold text-2xl">
    {items.url && items.submenu ?
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{ color: `${textColor}` }}
        >
          {items.title}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {items.submenu?.map((menu, index)=>{
          return (
          <Link role="menuitem" href={menu.url} key={index}>
            <MenuItem> 
                {menu.title}
            </MenuItem>
          </Link>)
          })}
        </Menu>
      </div>
    :  
      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: `${textColor}` }}
      >
        <Link
          href={items.url}
          className=""
        >
          {items.title}
        </Link>
      </Button>
      </div>
  }
    </div>
  );
}