import {auth ,provider} from "../config/firebase.config"
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const navigate=useNavigate();
    const signInWithGoogle= async ()=>{
        const result= await signInWithPopup(auth,provider);
        // console.log(result)
        navigate('/')  // whatever u put inside if, is URL or route u gonna route to
    }
    

    
    return (
        <div>
            <p> Sign in to continue with google</p>
            <button onClick={signInWithGoogle}>Sign in wiht Google </button>
        </div>
    )
};