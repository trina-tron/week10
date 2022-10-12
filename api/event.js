import { db } from "../firebase";
import{
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";


const addEvent = async({userId,title, description, date, location, status })=>{
    try{
        await addDoc(
            collection(db, "event"),
            {
                user:userId,
                title:title,
                description: description,
                date:date,
                location:location,
                status:status,
                createdAt: new Date().getTime()

            }
        );
    }catch(err){
        console.log(err);
    }
};

const toggleEventStatus= async({docId, status})=>{
    try{
        const eventRef = doc(db, "event", docId);
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

const deleteEvent= async (docId)=>{
try{
    const eventRef = doc(db, "event", docId);
    await deleteDoc(eventRef);
}catch(err){
    console.log(err);
}
};

export{addEvent, toggleEventStatus, deleteEvent};
