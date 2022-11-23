// almost all of firebase fuction requires  awit  i.e  return proimisies
import {getDocs,collection } from "firebase/firestore"; // getDOcs get all the docs/records and collection here is post in which are docs / records 
import { useState, useEffect } from "react";
import {db} from "../config/firebase.config"
import { Post } from "./post.component";

export const Main = () => {
    const [postsList,setPostsList] = useState(null);
    const postsRef= collection(db,"posts");
    
    const getPosts= async () => {
        const data= await getDocs(postsRef);
        // console.log(data.docs.map(doc=>({...doc.data(),id: doc.id})));
        // console.log(data.docs[0]);
        setPostsList(data.docs.map(doc=>({...doc.data(),id: doc.id})));

        } 
    useEffect(() => {
        getPosts();
    }, [])
    
    
    return (    
        <div> 
            { postsList?.map((post) => <Post post={post}/>) }
        </div>
    );

}; 