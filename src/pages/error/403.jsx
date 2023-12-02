import { Link } from 'react-router-dom'

const Error403 = () => {
  return (
    <div className="container dark:text-white">
      <h1>403</h1>
      <h2>Forbidden</h2>
      <p>You don't have access to this page.</p>
      <Link to="/login">Back to Login</Link>
    </div>
  )
}

export default Error403