import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, 
  Flex,
  Spacer,
  MenuGroup,
  MenuDivider

} from "@chakra-ui/react";
import Link from "next/link";
import Auth from "./Auth";


const Nav = () => {
  return ( 
      <Flex>
      <Menu isLazy >
<MenuButton p='4'  bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color='white'>Menu</MenuButton>
<MenuList>
<MenuItem>
  <Link href="/">
     Home
  </Link>
  </MenuItem>
  <MenuDivider/>
  <MenuGroup title='To Do' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white" textAlign="center">
  <MenuItem>
  <Link href="/add-todo">
      Add 
  </Link>
  </MenuItem>
  <MenuItem>
  <Link href="/view-todo">
  View Existing 
  </Link>
  </MenuItem>
  </MenuGroup>
  <MenuDivider/>

  <MenuGroup title='Events' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white" textAlign="center">
  <MenuItem>
  <Link href="/add-event">
  Add
  </Link>
  </MenuItem>
  <MenuItem>
  <Link href="/view-event">
  View Existing
  </Link>
  </MenuItem>
  </MenuGroup>
  <MenuDivider/>

  <MenuGroup title='Contacts' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white" textAlign="center">
  <MenuItem>
  <Link href="/add-contact">
  Add 
  </Link>
  </MenuItem> 
  <MenuItem>
  <Link href="/view-contact">
  View Existing 
  </Link>
  </MenuItem>
  </MenuGroup>
</MenuList>
<Spacer/>
<Auth />
</Menu>
</Flex>

   );
}

export default Nav;