import React,{useEffect, useState} from "react";
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import Link from "next/link";


//define the jsx component for the list
const TodoList = ()=>{
    const [todos, setTodos]= React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // nested function doing the work to update the l;ist from firestore data

    //tell recate to update the ui with refreshData
    useEffect(
        () => {
            if(!user){
                setTodos([]);
                return;
            }
            const q = query(
                collection(db, "todo"),
                where("user", "==", user.uid)
            );
            //query is async, set up event handler with onsnapshot
            onSnapshot(
            q,
            (querySnapShot)=>{
                let ar=[];
                //loop through each doc in the results
                querySnapShot.docs.forEach(
                    (doc)=>{
                        ar.push(
                            {
                            id:doc.id,
                            //... means if .doc.data captures anything we will get that as well
                            ...doc.data()
                            }
                        );
                    }
                );
                setTodos(ar);
            }
            );
        },
            [user]
        );
        
    //function to let user delete a todo
    const handleTodoDelete= async (id)=>{
        if(
            confirm("Are you sure you want to delete?")
        ){
            deleteTodo(id);
            toast(
                {
                    title:"Todo deleted successfully",
                    status:"success"
                }
            );
        }
    };

    /*const handleTodoEdit= async(id, title)=>{
       const newTitle = title == " ";
        await editTodo({
            docId : id,
            title: newTitle
        });
        edit
       
        
    }*/

    //function to toggle status
    const handleToggle = async (id, status)=>{
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus(
            {
                docId: id,
                status:newStatus
            }
        );
        toast(
            {
                title: `Todo marked ${newStatus}`,
                status: newStatus == "completed" ? "success" :"warning",
            }
        ); 
    };
    return(
        <Box mt={5}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={8}>
                { todos && 
                //looping through array of todos
                todos.map(
                    (todo)=>(
                        <Box
                    p={3}
                    boxShadow="2xl"
                    shadow={"dark-lg"}
                    bg='white'
                    transition="0.2s"
                    _hover={{boxShadow:"sm"}}
                    key={todo.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {todo.title}
                            {" "}
                            <Badge
                            color="red.500"
                            bg="inherit"
                            transition={"0.2s"}
                            _hover={{
                                bg:"inherit",
                                transform:"scale(1.2)",
                            }}
                            float="right"
                            size="xs"
                            onClick={ ()=> handleTodoDelete(todo.id)}
                            >
                                <FaTrash/>
                            </Badge>
                            <Badge
                                color= {todo.status == "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg:"inherit",
                                    transform:"scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={ ()=> handleToggle(todo.id, todo.status)}
                            >
                                {todo.status =="pending" ? <FaToggleOff/> : <FaToggleOn/>}
                            </Badge>
                            <Badge
                                float= "right"
                                opacity="0.8"
                                bg={todo.status == "pending" ? "yellow.500" : "green.500" }
                            >
                                {todo.status}
                            </Badge>
                            
                            
                        </Heading>
                        <Text>
                            {todo.description}
                        </Text>
                        <Text>
                            {todo.due}
                        </Text>
                        <Badge bg="blue.600" color="white">
                            <Link href={`/todo/${todo.id}`}> View </Link> 
                        </Badge>
                    </Box>
                   )
                   )
                }
            </SimpleGrid>
        </Box>
    );
};
export default TodoList;