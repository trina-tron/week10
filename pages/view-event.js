import { Container } from "@chakra-ui/react";
//import Auth from "../components/Auth";
import EventList from "../components/EventList";
import Nav from "../components/Nav";


export default function ViewEvent(){
 return(
  <Container maxW="7xl">
    <Nav/>
    <EventList />
  </Container>
 )
};