// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav>
//       <div className="nav-left">
//         <Link to="/">
//           <div className="nav-left-container">
//             <img
//               className="community-icon"
//               src="https://i.ibb.co/673W95V7/community-img.png"
//               alt="community-icon"
//             />
//             <h1 className="community-board">COMMUNITY BOARD</h1>
//           </div>
//         </Link>
//       </div>

//       <div className="nav-right">
//         {user ? (
//           <>
//             <Link to="/create">Create Post</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Signup</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return null;  

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <div className="nav-left-container">
            <img
              className="community-icon"
              src="https://i.ibb.co/673W95V7/community-img.png"
              alt="community-icon"
            />
            <h1 className="community-board">COMMUNITY BOARD</h1>
          </div>
        </Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
