import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AllContacts from './components/AllContacts'
import AddContact from './components/AddContact'
import UpdateContact from './components/UpateContact'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/shared/ErrorFallback'
import SuccessMessage from './components/shared/SuccessMessage'

export default function App() {

  return (
    <>
      {/* <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset the state of your application if needed
          window.location.reload();
        }}
      > */}
      <Layout>
        <SuccessMessage />
          <Routes>
            <Route path="/" element={<AllContacts></AllContacts>} />
          </Routes>      
          <Routes>
            <Route path="/add-contact" element={<AddContact></AddContact>} />
          </Routes>  
          <Routes>
            <Route path="/update-contact/:id" element={<UpdateContact></UpdateContact>} />
          </Routes> 
      </Layout>
      {/* </ErrorBoundary> */}
    </>
  )
}

