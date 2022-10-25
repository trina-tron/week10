import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    Heading,
    useToast
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {addEvent} from "../api/event";


//define react jsx component
const AddEvent = ()=>{
    //text input to associate a react state
    const [title, setTitle]=React.useState("");
    const [description, setDescription]=React.useState("");
    const [date, setDate]= React.useState("");
    const [location, setLocation]= React.useState("");
    const [status, setStatus]= React.useState("public");
    const [isLoading, setIsLoading]=React.useState(false);
    const toast=useToast();
    //call useAuth()
    const { isLoggedIn, user}= useAuth() || {};
    //define funstion to handle the add todo operation
    const handleEventCreate= async ()=>{
        if(!isLoggedIn){
            //show alert if not logged in
            toast(
                {
                    title:"You must be logged in to create an event",
                    status:"error",
                    duration:9000,
                    isClosable:true

                }
            );
        }
        //user is loged in
        setIsLoading(true);
        //object value template
        const event={
            title,
            description,
            date,
            location,
            status,
            userId: user.uid
        };
        //call api funtion to add a new doc to our firestore collection
        await addEvent(event);
        //past previous, the firestore doc is made
        setIsLoading(false);
        //flushing out the status field
        setTitle("");
        setDescription("");
        setDate("");
        setLocation("");
        setStatus("public");
        //show status update
        toast(
            {
                title:"Event created",
                status:"success"
            }
        );

    };
    //return the markup for this AddTodo JSX component
    return(
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Heading as="h3" fontSize={"xl"}>Make a new Event</Heading>
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
                <Textarea
                    placeholder="Date and time of event"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                />
                <Textarea
                    placeholder="Location of event"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
                  <Heading as="h3" fontSize={"xl"}>
                  Type of event</Heading>
                <Select
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}>
                    <option 
                    value={"public"} 
                    style={{color:"yellow",fontWeight:"bold"}}>
                    Public
                    </option>
                    <option 
                    value={"private"} 
                    style={{color:"red",fontWeight:"bold"}}>
                    Private
                    </option>
                </Select>
                <Button
                    onClick={()=>handleEventCreate()}
                    disabled={title.length < 1 || description.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Event
                </Button>
            </Stack>
        </Box>
    );
};
export default AddEvent;