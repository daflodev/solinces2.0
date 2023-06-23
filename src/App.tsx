import './index.css'
import AppRouter from './utils/components/routers'
import interceptor from './utils/services/api/interceptors';  

function App() {
  const intercep = interceptor();
  console.log(intercep, 'activo')
  return (
    <>
        {<AppRouter/>}
    </>
  )
}

export default App
