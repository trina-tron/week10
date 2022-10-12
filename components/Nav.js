import {
    Box,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, 
    Flex,
    Spacer

} from "@chakra-ui/react";
import Link from "next/link";
import Auth from "./Auth";


 const Nav = () => {
    return ( 
        <Flex>
        <Menu isLazy >
  <MenuButton p='4'  bg='blue.600' color='white'>Menu</MenuButton>
  <MenuList>
  <MenuItem>
    <Link href="/">
       Home
    </Link>
    </MenuItem>
    <MenuItem>
    <Link href="/add-todo">
        Add To Do
    </Link>
    </MenuItem>
    <MenuItem>
    <Link href="/view-todo">
    View Existing To Dos
    </Link>
    </MenuItem>
    <MenuItem>
    <Link href="/add-event">
    Add Event
    </Link>
    </MenuItem>
    <MenuItem>
    <Link href="/view-event">
    View Existing Events
    </Link>
    </MenuItem>
    
  </MenuList>
  <Spacer/>
  <Auth />
</Menu>
</Flex>

     );
}
 
export default Nav;