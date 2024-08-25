import 'bootstrap/dist/css/bootstrap.min.css'
import Contacts from './components/Contacts'

export default function App() {

  return (
    <>
      <div className="App pb-3">
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">Case Study</a>
        </div>
        </nav>
      </div>
      <div className="container-fluid">
        <div className="card">
        <div className="card-header bg-dark text-white">
            Contact Manager
          </div>
          <div className="card-body">
            <Contacts />
          </div>
        </div>
      </div>
    </>
  )
}

