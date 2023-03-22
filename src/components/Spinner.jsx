import logo from '../spinner.png';
import './Spinner.css';

function Spinner() {

    return (
        <>
        <div className='Spinner'></div>
            <img src={logo} className="Spinner-logo" alt="logo" />
            <p>Loading...</p>
        </>
    );
}

export default Spinner;