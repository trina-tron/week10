import { db } from "../firebase";
import{
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";


const addContact = async({userId,title, phone, address, email, status })=>{
    try{
        await addDoc(
            collection(db, "contact"),
            {
                user:userId,
                title:title,
                phone:phone,
                address:address,
                email:email,
                status:status,
                createdAt: new Date().getTime()

            }
        );
    }catch(err){
        console.log(err);
    }
};

const toggleContactStatus= async({docId, status})=>{
    try{
        const eventRef = doc(db, "contact", docId);
        await updateDoc(
            eventRef,
            {
                status: status
            }
        )
    }catch(err){
        console.log(err);
    }
};

const deleteContact= async (docId)=>{
try{
    const contactRef = doc(db, "contact", docId);
    await deleteDoc(contactRef);
}catch(err){
    console.log(err);
}
};

export{addContact, toggleContactStatus, deleteContact};