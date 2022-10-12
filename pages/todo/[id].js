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

const TodoItem= ({itemData})=>{
        //enforce user login
        const {user} = useAuth() || {};
        if (!user){
            return;
        }
        //if code continues user has logged in
       return( <Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                {itemData.title}
            </Heading>
            <Text>
                {itemData.description}
            </Text>
            <Text>
                {itemData.status}
            </Text>
            <Text>
                {itemData.createdAt}
            </Text>
        </Box>
       )
};

// call required getServerSideProps() function
export async function getServerSideProps(context){
    let itemData= null;
    //get a doc from firestore
    const docRef = doc(db, "todo", context.params.id)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        itemData = docSnap.data();
    }
    return{
        props:{
            itemData
        }
    }
}
export default TodoItem;