import logo from '../spinner.png';
import './Spinner.css';

function Spinner() {

    return (
        <>
            <img src={logo} className="Spinner-logo" alt="logo" />
            <p>Loading...</p>
        </>
    );
}

export default Spinner;