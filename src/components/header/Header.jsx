import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
    return (
        <header className="headerNav">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand brand-link">
                        <span>Cine Aurora</span>
                    </Link>
                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/upcoming" className="nav-link">
                                    <span>Proximamente</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                            <div className="user-info">
                                {user ? (
                                    <>
                                        {user.tips === 'admin' ? (
                                            <Link to="/adminActive" className="navbar-brand user-link">
                                                <span className="userActive">{user.name}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="iconUser" height="auto" viewBox="0 -960 960 960" width="24px" fill="white">
                                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                                </svg>
                                            </Link>
                                        ) : (
                                            <Link to="/userActive" className="navbar-brand user-link">
                                                <span className="userActive">{user.name}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                                </svg>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/login" className="navbar-brand user-link">
                                        <span>Usuario</span>
                                    </Link>
                                )}
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
