import {
    getDocs,
    addDoc,
    deleteDoc,
    collection,
    query,
    where ,
    doc// specifies specific document u want to remove 
    } from "firebase/firestore"; // getDOcs get all the docs/records and collection here is post in which are docs / records 
import { useState, useEffect } from "react";
import {db,auth} from "../config/firebase.config" 
import {useAuthState} from "react-firebase-hooks/auth";
import { async } from "@firebase/util";

export const Post =(props) =>
{
    const {post} =props;
    const [user]= useAuthState(auth);
    // const [likeAmount , setLikeAmount] = useState(null);
    const [likes , setLikes] = useState(null);

    // console.log(props)

    const likesRef= collection(db,"likes") 
    //  query(name of collection , where (CONDITIONS))
    const likeDoc= query(likesRef,where("postId","==",post.id))

    const getLikes=async () =>{
        const data= await getDocs(likeDoc)
        // below line was to just see that our logic regarding storing likes was right
        // console.log(data.docs.map(doc=>({...doc.data(),id: doc.id})));
        // console.log(data.docs.length);
        // setLikeAmount(data.docs.length);

        setLikes(data.docs.map((doc) => ({userId:doc.data().userId, likeId:doc.id})))
    }

    const addLike=async (data) => {
    
        try {
            const newDoc=await addDoc(likesRef,{userId:user?.uid,postId: post.id})
            // setLikes((prev)=>{...prev , {userId:user?uid}, likeId:newDoc.id})
            // above line giving error bcuz prev can be null

            if(user) // set like when user exists only
            setLikes((prev)=>prev ? [...prev , {userId:user?.uid , likeId:newDoc.id}]:[{userId:user?.uid, likeId:newDoc.id}])
        }  
        catch(err) {
            console.log(err) 
        }
    }
    
    const removeLike=async (data) => {
    
        try {
            const removeLikeQuery= query(
                likesRef,
                where("postId","==",post.id),
                where("userId","==",user?.uid)
            );
            const removeLikeData = await getDocs(removeLikeQuery)
            // data base u r referring i.e db , collection reffered i.e likes , id u want to delete 
            const removeLike= doc(db, "likes",removeLikeData.docs[0].id)
            const removeLikeId= removeLikeData.docs[0].id
            
            await deleteDoc(removeLike)

            if(user) // set like when user exists only
            setLikes((prev)=>prev && prev.filter((like)=> like.likeId !== removeLikeId ))
        }  
        catch(err) {
            console.log(err) 
        }
    }
    
    const hasUserLiked=likes?.find((like)=> like.userId=== user?.uid)
    useEffect(() => {
        getLikes();
    }
    , [])
    
    return (
    <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
    
        <div className="body">
            <p>{post.description}</p>
        </div>

        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked ? removeLike :addLike }>{hasUserLiked ? <>👎</>:<>👍</> }</button>
            {/* show when likes not null i.e like exists */}
            {likes && <p>Likes: {likes?.length}</p>}  
        </div>
    </div>
    )   
}