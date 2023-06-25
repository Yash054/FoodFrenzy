import React,{useState} from 'react'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReader';
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
//you have to return in a single parent tag
export default function Navbar() {

    let data = useCart();
    const [cartView,setCartView]= useState(false)
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("authtoken");
        navigate("/login")
    }
    return (
        <div >
            <nav style={{ backgroundColor: "red" }} className="  navbar navbar-expand-lg navbar-dark " >
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic mb-2 fw-bold" to="/">Yomato</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active " aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authtoken")) ?
                                <li className='nav-items'>
                                    <Link className="nav-link fs-5 active " aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""
                            }

                        </ul>
                        {(!localStorage.getItem("authtoken")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-black mx-1 rounded-pill" to="/Login">Login</Link>


                                <Link className="btn bg-white text-black mx-1 rounded-pill" to="/createuser">Signup</Link>
                            </div>
                            : <div>
                                <div className='btn bg-white text-black mx-2' onClick={()=>{setCartView(true)}}>
                                    My Cart{"  "}
                                    <Badge pill bg="dark">{data.length}</Badge>
                                </div>
                                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
