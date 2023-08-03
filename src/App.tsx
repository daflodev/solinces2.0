import './index.css'
import AppRouter from '@/components/routers'
import interceptor from '@/services/api/interceptors';

function App() {
  const intercep = interceptor();
  
  intercep
  
  return (
    <>
        {<AppRouter/>}
    </>
  )
}

export default App
