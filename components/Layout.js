import Nav from "./Nav";
import {
    Container,
} from '@chakra-ui/react';
import Footer from './Footer';

const Layout= ({children, home}) => {
    return (  
       <Container maxW='100%'  bgGradient={[
        'linear(to-tr, teal.300, yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]} h="auto" >
            <Nav/>
            <main>{children}</main>
            <Footer/>
      </Container>
    );
}
 
export default Layout;