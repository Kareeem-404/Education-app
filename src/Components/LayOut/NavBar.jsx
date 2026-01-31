/**
 * NavBar - Fixed navigation component displayed at the top of every page.
 * Contains:
 * - Logo/Website name (links to home)
 * - Navigation links (Front-End, Back-End)
 * - Authentication buttons (LogIn, SignIn)
 */
//================Router===========
import { Link} from "react-router";

export default function NavBar() {
  const ButtonNavStyle =
    "text-[18px] cursor-pointer hover:underline duration-500 transition hover:duration-500";
  return (
    <>
      {/* Fixed navigation bar */}
      <nav className="flex flex-row w-full h-18 items-center justify-between bg-text fixed top-0 z-50">
        <div className="flex flex-row text-background justify-between ml-4 w-full ">
          {/* Logo/Website name - links to home page */}
          <Link to={"/"} className="text-2xl w-55 ">
            Eduction Flow
          </Link>

          {/* Center navigation links */}
          <div className={location.pathname == "/" ? "hidden flex-row gap-4 w-full justify-center text-background items-center": "flex flex-row gap-4 w-full justify-center text-background items-center"}>
            {/* Front-End section link */}
            <Link to={'/FrontEndStack'} className={ButtonNavStyle}>Front-End</Link>
            {/* Back-End section link */}
            <Link to={'/BackEndStack'} className={ButtonNavStyle}>Back-End</Link>
            <Link to={'/FullStack'} className={ButtonNavStyle}>Full-Stack</Link>
          </div>

          {/* Right-side authentication buttons */}
          <div className="flex flex-row gap-5 mr-7">
            {/* LogIn link - navigates to login page */}
            <Link
              to={"/logIn"}
              className="text-center flex justify-center items-center w-18 h-10 bg-white border-2 border-text rounded-md text-text cursor-pointer hover:bg-gray-200 duration-500 transition hover:duration-500"
            >
              LogIn
            </Link>
            {/* SignIn button - for new user registration */}
            <button className="text-center w-18 cursor-pointer hover:bg-hover-color hover:border-text border border-transparent duration-500 transition hover:duration-500 hover:text-white rounded-md ">
              SignIn
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
