import './index.css'
import AppRouter from './config/routers/appRouters'
import interceptor from './services/api/interceptors';
import { getUser, login } from './services/helper/auth-helper';
import { useJwtTool } from './utils/utils';

function App() {
  
 const intercep = interceptor();

  console.log(intercep);
  
  return (
    <>
        {<AppRouter/>}
    </>
  )
}

export default App
