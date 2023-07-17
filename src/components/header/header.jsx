import './header.css';
import Button from '../buttons/Button';
import next from '../../assets/icon-arrow.svg';
import { useEffect, useState } from 'react';

function Header(props) {
    const [ipAddress, setIpAddress] = useState('');
    const [isValidIpAddress, setIsValidIpAddress] = useState(false);
    const [isIpInvalid, setIsIpInvalid] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    function isDomain(query) {
        const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        return domainRegex.test(query);
    }

    function isIPAddress(query) {
        const ipV4Regex = /^(?:[1-9]\d{0,2}|0)(?:\.(?:[1-9]\d{0,2}|0)){3}$/;
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        const octets = query.split('.');
        if (octets.length !== 4) {
            setIsIpInvalid(true);
            return;
        }

        // * check if the octect value exceeds 255
        for (const octet of octets) {
            const value = parseInt(octet, 10);
            if (isNaN(value) || value < 0 || value > 255) {
                setIsIpInvalid(true);
                return;
            }
        }
        return ipV4Regex.test(query) || ipv6Regex.test(query);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (ipAddress.length === 0) {
            setIsIpInvalid(false);
            props.onIp(ipAddress, null);
            return
        }
        
        if (isDomain(ipAddress)) {
            props.onIp(null, ipAddress);
            return
        } else {
            if (isIPAddress(ipAddress)) {
                setIsValidIpAddress(isIPAddress(ipAddress));
                setIsButtonClicked(true);
            } else {
                setIsValidIpAddress(isIPAddress(ipAddress));
                setIsButtonClicked(true);
            }
        }
    }
    // handle effect when button is clicked
    useEffect(() => {
        if (isButtonClicked) {
            if (isValidIpAddress) {
                setIsIpInvalid(false);
                props.onIp(ipAddress, null);
            } else {
                setIsIpInvalid(true);
                props.reset();
            }
        }
        return () => {
            setIsButtonClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValidIpAddress, isButtonClicked, isIpInvalid]);

    //set error msg for invalid domains
    useEffect(() => {
        if (props.error) {
            setIsIpInvalid(true);
        }
    }, [props.error]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setIpAddress(inputValue);
        setIsIpInvalid(false);
    }

    return (
        <header className="header flex flex-column w-100">
            <h1>IP Address Tracker</h1>
            {(props.data || props.error) && <section className="form-container w-100" style={{ overflow: isIpInvalid && 'unset' }}>
                <form action="" method="get" className='form flex'>
                    <section className="input-field w-100">
                        <input type="text" name='ip' id='ip' placeholder='Search for any IP address or domain' className='w-100' maxLength={39} value={ipAddress} onChange={handleChange} />
                    </section>
                    <section className="btn">
                        <Button handleButtonClick={handleButtonClick} src={next} id={next} alt='next-arrow' title='next' className='btn-next' />
                    </section>
                </form>
                {isIpInvalid && <section className='error w-100 text-center'>
                    <p className='erro-msg'> {props.error === '' ? 'You have entered an invalid ipAddress or domain' : props.error}</p>
                </section>}
            </section>}
            {props.data && <section className="info flex flex-column text-center">
                <section className="ip-address">
                    <h6 className='uppercase'>ip address</h6>
                    <h3>{props.data ? props.data.ip : ''}</h3>
                </section>
                <section className="location">
                    <h6 className='uppercase'>location</h6>
                    <h3>{props.data ? props.data.location.city : ''}, {props.data ? props.data.location.region : ''}, {props.data ? props.data.location.country : ''}</h3>
                </section>
                <section className="timezone">
                    <h6 className='uppercase'>timezone</h6>
                    <h3>UTC {props.data ? props.data.location.timezone : ''}</h3>
                </section>
                <section className="isp">
                    <h6 className='uppercase'>isp</h6>
                    <h3>{props.data ? props.data.isp : ''}</h3>
                </section>
            </section>}

        </header>
    );
}

export default Header;