import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="bg-purple-600 py-6">
        <div className="container mx-auto flex justify-between px-4">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">StayEasy</Link>
          </span>
          <span className="flex space-x-2" ><Link to="/sign-in" className="flex items-center text-purple-600 px-3 bg-slate-100 font-bold hover:bg-purple-200 rounded ">Sign in</Link></span>
        </div>
    </div>
  )
}

export default Header