import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {addTodo} from "../api/todo";

//define react jsx component
const AddTodo = ()=>{
    //text input to associate a react state
    const [title, setTitle]=React.useState("");
    const [description, setDescription]=React.useState("");
    const [status, setStatus]= React.useState("pending");
    const [isLoading, setIsLoading]=React.useState(false);
    const toast=useToast();
    //call useAuth()
    const { isLoggedIn, user}= useAuth() || {};
    //define funstion to handle the add todo operation
    const handleTodoCreate= async ()=>{
        if(!isLoggedIn){
            //show alert if not logged in
            toast(
                {
                    title:"You must be logged in to create a todo",
                    status:"error",
                    duration:9000,
                    isClosable:true

                }
            );
        }
        //user is loged in
        setIsLoading(true);
        //object value template
        const todo={
            title,
            description,
            status,
            userId: user.uid
        };
        //call api funtion to add a new doc to our firestore collection
        await addTodo(todo);
        //past previous, the firestore doc is made
        setIsLoading(false);
        //flushing out the status field
        setTitle("");
        setDescription("");
        setStatus("pending");
        //show status update
        toast(
            {
                title:"To do created",
                status:"success"
            }
        );

    };
    //return the markup for this AddTodo JSX component
    return(
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                placeholder="Title"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <Select
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}>
                    <option 
                    value={"pending"} 
                    style={{color:"yellow",fontWeight:"bold"}}>
                    Pending
                    </option>
                    <option 
                    value={"completed"} 
                    style={{color:"green",fontWeight:"bold"}}>
                    Completed
                    </option>
                </Select>
                <Button
                    onClick={()=>handleTodoCreate()}
                    disabled={title.length < 1 || description.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Todo
                </Button>
            </Stack>
        </Box>
    );
};
export default AddTodo;