import {
    Box,
    Heading,
    Text,
    Container,
    Button
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "../../firebase";
import Layout from "../../components/Layout";
import Link from "next/link";


const TodoItem= ({itemData})=>{
        //enforce user login
        const {user} = useAuth() || {};
        if (!user){
            return;
        }
        //if code continues user has logged in
       return( 
        <Layout>
        <Container maxW='2xl' centerContent h='100vh'>
        <Box padding='6' border="2px" borderColor='blue.500' color='black' maxW='lg' borderRadius="lg">
              
            <Heading as="h3" fontSize={"xl"} textAlign="center" textDecoration="underline" p="2">
                {itemData.title}
            </Heading>
            <Text p="2">
                {itemData.description}
            </Text>
            <Text p="2">
                {itemData.due}
            </Text>
            <Text p="2">
                {itemData.status}
            </Text>
        </Box>
        <Button m='2' p='2'bg={{base:'pink.500', md:"purple.500", lg:"blue.500"}} color="white">
        <Link href="../view-todo">
            Back 
        </Link>
        </Button>
        </Container>
        </Layout> 
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