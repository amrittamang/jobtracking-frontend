import { useAppContext } from "../context/appContext";
import { useSelector } from "react-redux";

const Alert = () => {
    const { alertType, alertText } = useSelector(state => state.account);
    return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert;