import './index.css'
import AppRouter from '@/components/routers'
import interceptor from '@/services/api/interceptors';

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
