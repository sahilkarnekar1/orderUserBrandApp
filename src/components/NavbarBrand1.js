import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {  SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Menu } from 'antd';

const NavbarBrand1 = () => {
  const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key: '3',
      label: 'My Orders',
      extra: '⌘B',
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
  ];

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    // Navigate to the respective route based on the key
    switch (key) {
      case '2':
        navigate('/profile');
        break;
      case '3':
        navigate('/my-orders');
        break;
      case '4':
        navigate('/settings');
        break;
      default:
        break;
    }
  };
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/homepage">Brand Order</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/homepage">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/special-store">Special Store</Link>
      </li>
      
    </ul>
    <div className='setdisplayflextocart'>
        <Link className="nav-link" to="/cart">
        <Badge count={5}>
        <Avatar
        shape="square" icon={<ShoppingCartOutlined />} />
    </Badge>
    </Link>
    </div>
      



    <Dropdown
      overlay={
        <Menu
          items={items}
          onClick={handleMenuClick} // Add onClick handler to the Menu
        />
      }
      trigger={['click']}
    >
      <Avatar
        style={{
          border: '1px solid black',
        }}
        size={40}
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
      />
    </Dropdown>


  </div>
</nav>

    </>
  )
}

export default NavbarBrand1
