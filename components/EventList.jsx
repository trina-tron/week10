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
import { deleteEvent, toggleEventStatus } from "../api/event";

//define the jsx component for the list
const EventList = ()=>{
    const [events, setEvents]= React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // nested function doing the work to update the l;ist from firestore data

    //tell recate to update the ui with refreshData
    useEffect(
        () => {
            if(!user){
                setEvents([]);
                return;
            }
            const q = query(
                collection(db, "event"),
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
                setEvents(ar);
            }
            );
        },
            [user]
        );
        
    //function to let delete an event
    const handleEventDelete= async (id)=>{
        if(
            confirm("Are you sure you want to delete?")
        ){
            deleteEvent(id);
            toast(
                {
                    title:"Event deleted successfully",
                    status:"success"
                }
            );
        }
    };
    //function to toggle status
    const handleToggle = async (id, status)=>{
        const newStatus = status == "private" ? "public" : "private";
        await toggleEventStatus(
            {
                docId: id,
                status:newStatus
            }
        );
        toast(
            {
                title: `Event marked ${newStatus}`,
                status: newStatus == "private" ? "success" :"warning",
            }
        ); 
    };
    return(
        <Box mt={5}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={8}>
                { events && 
                //looping through array of events
                events.map(
                    (event)=>(
                        <Box
                    p={3}
                    boxShadow="2xl"
                    shadow={"dark-lg"}
                    transition="0.2s"
                    _hover={{boxShadow:"sm"}}
                    key={event.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {event.title}
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
                            onClick={ ()=> handleEventDelete(event.id)}
                            >
                                <FaTrash/>
                            </Badge>
                            <Badge
                                color= {event.status == "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg:"inherit",
                                    transform:"scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={ ()=> handleToggle(event.id, event.status)}
                            >
                                {event.status =="public" ? <FaToggleOff/> : <FaToggleOn/>}
                            </Badge>
                            <Badge
                                float= "right"
                                opacity="0.8"
                                bg={event.status == "public" ? "yellow.500" : "red.500" }
                            >
                                {event.status}
                            </Badge>
                        </Heading>
                        <Text>
                            {event.description}
                        </Text>
                        <Text>
                            {event.date}
                        </Text>
                        <Text>
                            {event.location}
                        </Text>
                    </Box>
                   )
                   )
                }
            </SimpleGrid>
        </Box>
    );
};
export default EventList;