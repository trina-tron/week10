import React, {useState} from "react";
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
import {addContact} from "../api/contact";



//define react jsx component
const AddContact = ()=>{
    //text input to associate a react state
    const [title, setTitle]=React.useState("");
    const [phone, setPhone]=React.useState("");
    const [address, setAddress]= React.useState("");
    const [email, setEmail]= React.useState("");
    const [status, setStatus]= React.useState("No Contact");
    const [isLoading, setIsLoading]=React.useState(false);
    const toast=useToast();
    //call useAuth()
    const { isLoggedIn, user}= useAuth() || {};
    //define funstion to handle the add todo operation
    const handleContactCreate= async ()=>{
        if(!isLoggedIn){
            //show alert if not logged in
            toast(
                {
                    title:"You must be logged in to create a contact",
                    status:"error",
                    duration:9000,
                    isClosable:true

                }
            );
        }
        //user is loged in
        setIsLoading(true);
        //object value template
        const contact={
            title,
            phone,
            address,
            email,
            status,
            userId: user.uid
        };
        //call api funtion to add a new doc to our firestore collection
        await addContact(contact);
        //past previous, the firestore doc is made
        setIsLoading(false);
        //flushing out the status field
        setTitle("");
        setPhone("");
        setAddress("");
        setEmail("");
        setStatus("No Contact");
        //show status update
        toast(
            {
                title:"Contact created",
                status:"success"
            }
        );

    };
    //return the markup for this AddTodo JSX component
    return(
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Heading as="h3" fontSize={{base:'15px', md:'24px', lg:'28px'}}>Make a new Contact</Heading>
                <Input
                placeholder="Name of contact"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                /> 
                <Textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />
                <Textarea
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                  <Heading as="h3" fontSize={{base:'15px', md:'24px', lg:'28px'}}>
                  Type of contact</Heading>
                <Select
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}>
                    <option 
                    value={"No Contact"} 
                    style={{color:"red",fontWeight:"bold"}}>
                    No Contact
                    </option>
                    <option 
                    value={"Contacted"} 
                    style={{color:"green",fontWeight:"bold"}}>
                   Contacted
                    </option>
                </Select>
                <Button
                    onClick={()=>handleContactCreate()}
                    disabled={title.length < 1 || phone.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Contact
                </Button>
            </Stack>
        </Box>
    );
};
export default AddContact;