import React from 'react';
import { Container, Icon, Image, Menu } from 'semantic-ui-react';

const MenuSidebar = () => {
  const [activeItem, setActiveItem] = React.useState('home');
  const handleItemClick = (e:React.MouseEvent, { name }:{name:string}) => setActiveItem(name);

  return (
    <Menu size='large' stackable>
      <Container>
        <Menu.Item header>
          <Image src='/logo.png' size='mini' />
          Company Name
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={(e, { name }) => name && handleItemClick(e, { name })}
          >
            Home
          </Menu.Item>
          <Menu.Item
            name='about'
            active={activeItem === 'about'}
            onClick={(e, { name }) => name && handleItemClick(e, { name })}
          >
            About
          </Menu.Item>
          <Menu.Item
            name='contact'
            active={activeItem === 'contact'}
            onClick={(e, { name }) => name && handleItemClick(e, { name })}
          >
            Contact
          </Menu.Item>
          <Menu.Item>
            <Icon name='bars' />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default MenuSidebar();
