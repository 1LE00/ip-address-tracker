import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/header';
import Map from './components/map/map';

function App() {
  const [data, setData] = useState(null);
  const [errMessage, setErrMessage] = useState('');
  const sendIp = (ip, domain) => {
    if (ip || ip === '' || domain) {
      traceIp(true, ip, domain);
    }
  }
  // track user ipaddress on load
  useEffect(() => {
    let isMounted = true;
    traceIp(isMounted, null, null);
    return () => {
      isMounted = false;
      setData(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const traceIp = async (isMounted, ip, domain) => {
    const api = process.env.REACT_APP_API_KEY;
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api}&ipAddress=${ip ? ip : ''}&domain=${domain ? domain : ''}`);
      const responseData = await response.json();
      if (isMounted) {
        if (response.status === 200) {
          setData(responseData);
          setErrMessage('');
        } else {
          setErrMessage('Bad Request: The domain or ip may not exist.');
          console.error('Bad Request: There has been a problem with your fetch operation. The domain or ip may not exist.');
        }
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const resetErrMessage = ()=>{
    setErrMessage('');
  }
  return (
    <div className="App flex flex-column">
      <Header data={data} onIp={sendIp} error={errMessage} reset = {resetErrMessage}/>
      {(data || errMessage) && <Map data={data} />}
    </div>
  );
}

export default App;
