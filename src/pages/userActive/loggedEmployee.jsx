import { Link, useNavigate } from "react-router-dom";
import "./loggedUser.css";

function EmployeeActive (){

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();
    };
    return(
        <div>
            <div className="btnUser">
                <button className="buttonUser" onClick={handleLogout}>Salir</button>
            </div>
            <h1>empelados</h1>
            <div className="adminFeatures">
                <Link to="/verifyVoucher" className="adminLink">
                        <span>Verificar Código de Entrada</span>
                </Link>
            </div>
            <div className="footerLoggedEmployee">
            </div>
        </div>
    )
}
export default EmployeeActive;