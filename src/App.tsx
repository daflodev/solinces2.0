import './index.css'
import AppRouter from './config/routers/appRouters'
import interceptor from './services/api/interceptors';
import { getUser, login } from './services/helper/auth-helper';
import { useJwtTool } from './utils/utils';

function App() {
  
  let intercep = interceptor();

  console.log(intercep);

  getUser().then(user => {
    if (user && user.access_token) {
  
        const { myDecodedToken, isMyTokenExpired } = useJwtTool(user.access_token);
  
        localStorage.setItem("user_token_information", JSON.stringify(myDecodedToken))
  
        console.log('decode Token:', myDecodedToken);
        console.log('is expired token?:', isMyTokenExpired)
        
    } else {
      login()
    }
  });

  
  return (
    <>
        {<AppRouter/>}
    </>
  )
}

export default App
