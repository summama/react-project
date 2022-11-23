import { Link} from "react-router-dom"
import {auth} from "../config/firebase.config"
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar=()=>{
    // current user info, loading dstate any error 
    // const [user,loading,error ]= useAuthState(auth);
    // but for simplicty reasons we need user only now
    const [user]= useAuthState(auth);
    const signUserOut= async () =>{
        await signOut(auth);
    };
    return(
        <div className="navbar">
            <div className="links">
                <Link to="/"> Home </Link>
                {!user ? (
                    <Link to="/login"> Login </Link>
                )   :   (
                    <Link to="/createpost"> CreatePost </Link>
                )}
            </div>
            <div className="user">
                {user && (      // if user then belwo block works
                    <>
                        {/* will be useing useAuth state therefore auth.currentUser replaced by user */}
                        {/* <p> {auth.currentUser?.displayName}</p> */}
                        <p> {user?.displayName}</p>
                        {/* no pic then empty string or null */}
                        {/* <img src={auth. currentUser?.photoURL || " "} width="100" height="100"/> */}
                        <img src={user?.photoURL || ""} width="40" height="40"/>
                        <button onClick={signUserOut}> Log out</button>
                    </>
                )}
            </div>
        </div>
    )
}   