import React from "react";
import {
    Box,
    Heading,
    SimplegGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "../../firebase";

const EventItem= ({eventData})=>{
        //enforce user login
        const {user} = useAuth() || {};
        if (!user){
            return;
        }
        //if code continues user has logged in
       return( <Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                {eventData.title}
            </Heading>
            <Text>
                {eventData.description}
            </Text>
            <Text>
                {eventData.date}
            </Text>
            <Text>
                {eventData.location}
            </Text>
            <Text>
                {eventData.status}
            </Text>
        </Box>
       )
};

// call required getServerSideProps() function
export async function getServerSideProps(context){
    let eventData = null;
    //get a doc from firestore
    const docRef = doc(db, "event", context.params.id)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        eventData = docSnap.data();
    }
    return{
        props:{
            eventData
        }
    }
}
export default EventItem;