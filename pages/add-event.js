import { Container } from "@chakra-ui/react";
//import Auth from "../components/Auth";
import AddEvent from "../components/AddEvent";
import Nav from "../components/Nav";



export default function Addevent(){
 return(
  <Container maxW="7xl">
    <Nav/>
    <AddEvent/>
  </Container>
 )
};