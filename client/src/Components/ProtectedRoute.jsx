import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const Component = props.Component;
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token === 'false'){
            navigate('/login');
        }
    });

    return(
        <div>
            <Component />
        </div>
    );
}

export default ProtectedRoute;