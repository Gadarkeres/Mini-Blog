import { NavLink } from "react-router-dom"
import{useAutenticacao} from '../hooks/useAutenticacao'
import {useAuthValue} from "../context/AuthContext"
//CSS
import styles from './Navbar.module.css'





const Navbar = () => {
    const {user}= useAuthValue();
    const {logout} = useAutenticacao();
    return (
        <nav className={styles.navbar}>
            <NavLink to={"/"} className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive? styles.active: "")}>Home</NavLink>
                </li>
                {!user && (
                    <>
                    <li>
                    <NavLink to="/Login" className={({isActive}) => (isActive? styles.active: "")}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/Registrar" className={({isActive}) => (isActive? styles.active: "")}>Cadastrar</NavLink>
                </li>
                    </>
                )}
                {user &&(
                        <>
                        <li>
                        <NavLink to="/posts/create" className={({isActive}) => (isActive? styles.active: "")}>Novo Post</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({isActive}) => (isActive? styles.active: "")}>Dashboard</NavLink>
                    </li>
                        </>
                )}
                <li>
                    <NavLink to="/Sobre" className={({isActive}) => (isActive? styles.active: "")}>Sobre</NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;