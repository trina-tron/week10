
import { 
  Container,
  Box,
  SimpleGrid,
  Heading,
  Button
 } from "@chakra-ui/react";
//import Auth from "../components/Auth";

/*import {
  doc,
  getDoc
} from "firebase/firestore";*/
import {db} from "../firebase";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home(){
 return(

<Layout>

  <Heading as="h1" fontSize={{base:'40px', md: '45px', lg:'50px'}} textAlign="center" p="10">
    What whould you like to do?
   </Heading> 
   <SimpleGrid spacing={10} minChildWidth='350px'>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
    Make a To Do
    <Button m="10" color="black">
    <Link href="./add-todo">ADD</Link>
    </Button>
  </Box>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
    Make an Event
    <Button  m="10" color="black">
    <Link href="./add-event">ADD</Link>
    </Button>
  </Box>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
 Make a Contact
  <Button m="10" color="black">
  <Link href="./add-contact">VIEW</Link>
  </Button>
  </Box>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
    View To Dos
    <Button  m="10" color="black">
    <Link href="./view-todo">VIEW</Link>
    </Button>
  </Box>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
  View Events
  <Button m="10" color="black">
  <Link href="./view-event">VIEW</Link>
  </Button>
  </Box>
  <Box textAlign="center" boxShadow='dark-lg' bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white"  borderRadius='lg' fontSize={{ base: '18px', md: '24px', lg: '29px' }}>
 View Contacts
  <Button m="10" color="black">
  <Link href="./view-contact">VIEW</Link>
  </Button>
  </Box>
  </SimpleGrid>
  </Layout>
 )
};

