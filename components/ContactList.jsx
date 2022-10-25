import React,{useEffect} from "react";
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
import { deleteContact, toggleContactStatus } from "../api/contact";
import Link from "next/link";

//define the jsx component for the list
const ContactList = ()=>{
    const [contacts, setContacts]= React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // nested function doing the work to update the l;ist from firestore data

    //tell recate to update the ui with refreshData
    useEffect(
        () => {
            if(!user){
                setContacts([]);
                return;
                  
            }
            const q = query(
                collection(db, "contact"),
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
                setContacts(ar);
            }
            );
        },
            [user]
        );
        
    //function to let delete an event
    const handleContactDelete= async (id)=>{
        if(
            confirm("Are you sure you want to delete?")
        ){
            deleteContact(id);
            toast(
                {
                    title:"Contact deleted successfully",
                    status:"success"
                }
            );
        }
    };
    //function to toggle status
    const handleToggle = async (id, status)=>{
        const newStatus = status == "No Contact" ? "Contacted" : "No Contact";
        await toggleContactStatus(
            {
                docId: id,
                status:newStatus
            }
        );
        toast(
            {
                title: `Contact marked ${newStatus}`,
                status: newStatus == "No Contact" ? "success" :"warning",
            }
        ); 
    };
    return( 
        <Box mt={5}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={8}>
                { contacts && 
                //looping through array of events
                contacts.map(
                    (contact)=>(
                        <Box
                    p={3}
                    boxShadow="2xl"
                    shadow={"dark-lg"}
                    bg='white'
                    transition="0.2s"
                    _hover={{boxShadow:"sm"}}
                    key={contact.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {contact.title}
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
                            onClick={ ()=> handleContactDelete(contact.id)}
                            >
                                <FaTrash/>
                            </Badge>
                            <Badge
                                color= {contact.status == "No Contact" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg:"inherit",
                                    transform:"scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={ ()=> handleToggle(contact.id, contact.status)}
                            >
                                {contact.status =="Contacted" ? <FaToggleOff/> : <FaToggleOn/>}
                            </Badge>
                            <Badge
                                float= "right"
                                opacity="0.8"
                                bg={contact.status == "Contacted" ? "green.500" : "red.500" }
                            >
                                {contact.status}
                            </Badge>
                        </Heading>
                        <Text>
                            {contact.phone}
                        </Text>
                        <Text>
                            {contact.address}
                        </Text>
                        <Text>
                            {contact.email}
                        </Text>
                        <Badge bg="blue.600" color="white">
                            <Link href={`/contact/${contact.id}`}> View </Link> 
                        </Badge>
                    </Box>
                   )
                   )
                }
            </SimpleGrid>
        </Box>
      
    );
};
export default ContactList;