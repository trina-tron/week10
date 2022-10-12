import { Container } from "@chakra-ui/react";
//import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import Nav from "../components/Nav";


export default function ViewTodo(){
 return(
  <Container maxW="7xl">
    <Nav/>
    <TodoList />
  </Container>
 )
};