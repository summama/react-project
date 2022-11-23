// installing reacthookform and yup validation library  
// and @hookform/resolve which gives us a fuction which helps us in integration of 2 libs yup and reacthookform 
// npm install react-hook-form yup @hookform/resolve 
import {useForm} from "react-hook-form";
import * as  yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
// addDoc is called when u want want to add document/record to ur db
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../config/firebase.config"
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => { 
    const [user]=useAuthState(auth);
    const navigate=useNavigate();
    const schema= yup.object().shape({
        title:yup.string().required("Title is manadtory"),
        description: yup.string().required("You must add desc:")
    })

    const { register, handleSubmit , formState:{errors}}= useForm({
        resolver: yupResolver(schema),
    });

    // reference to our collection which i have named as posts
    const postsRef= collection(db,"posts") // name of db is what in config file 

    const onCreatePost=async (data) => {
        // console.log(data);
        //with addDoc we pass reference to the document in which  collection we want to add document to
        // then we add the data that we want to pass
        await addDoc(postsRef,{
            // title: data.title,
            // description:data.description,
            ...data,// doing same work by destructiong obj / using spread operator
            username:user?.displayName,
            userId: user?.uid,  // uid is id used by google for that specific user
            // userId: "user?.uid",  //testinf if id different so don't allow to post
        });

        navigate('/');
    };
    return (
    <form  onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title ..." {... register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description ..."  maxLength={200} minLength={40} {... register("description")}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        
        <input type="submit" className="submitForm"/>
    </form>
)};