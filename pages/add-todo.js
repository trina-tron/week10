import { Container } from "@chakra-ui/react";
//import Auth from "../components/Auth";
import AddTodo from "../components/AddTodo";
import Nav from "../components/Nav";



export default function Addtodo(){
 return(
  <Container maxW="7xl">
    <Nav/>
    <AddTodo/>
  </Container>
 )
};