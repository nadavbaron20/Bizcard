import './Header.css'
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import Restricted from '../Restricted/Restricted';

const elmDocument = document.querySelector('html') as HTMLHtmlElement

export default function Header() {

  const [theme, setTheme] = useState('light')

  const auth = useContext(AuthContext)

  useEffect(() => {
    const lsTheme = localStorage.getItem('theme')

    if (lsTheme) {
      elmDocument.setAttribute('data-bs-theme', lsTheme)
      setTheme(lsTheme)
    } else {
      localStorage.setItem('theme', 'light')
      elmDocument.setAttribute('data-bs-theme', 'light')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; 
    setTheme(newTheme); 
    elmDocument.setAttribute('data-bs-theme', newTheme); 
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className='Header'>

      <div className="navbar navbar-light navbar-expand-lg px-2 border-bottom pb-4 d-flex justify-content-between">

        {/* ---- Logo ---- */}
        <Link to={'/'} className="navbar-brand d-flex align-items-center">
          <BiSolidCircle size={30} color='red' />
          <BiSolidCircle size={30} color='orange' style={{ marginLeft: '-15px', opacity: '0.7' }} />
          <span style={{ fontWeight: '500', fontFamily: 'monospace', paddingLeft:'5px' }}>BizCard</span>
        </Link>

        {/* ---- Search, now inside a flex container for better resizing ---- */}
     

        {/* ---- Hamburger ------------------------------------------------------------------------------------------------------------------------------------- */}
        <button className="navbar-toggler ms-2" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ---- Nav Links ------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav ms-auto" style={{ listStyle: 'none' }}>

            {/* ---- Pages ------------------------------------------------------------------------------------------------------------------------------------- */}
            <li className="nav-item mx-2">
              <Link to={'/'} className='nav-link'>Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/favorite'} className='nav-link'>Favorite</Link>
            </li>

            <li className="nav-item mx-2">
              <Link to={'/bcards'} className='nav-link'>Bcards</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/create'} className='nav-link'>Create</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/user'} className='nav-link'>User</Link>
            </li>

            <Restricted allowedRoles={['user']}>
              <li className="nav-item mx-2">
                <Link to={'/mycards'} className='nav-link'>My Cards</Link>
              </li>
            </Restricted>

            <li className="nav-item mx-2">
              <Link to={'/business'} className='nav-link'>Biz</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/admin'} className='nav-link'>Admin</Link>
            </li>

            {/* ---- Light\Dark Mode --------------------------------------------------------------------------------------------------------------------------- */}
            <li className="nav-item mx-3 theme-icon my-auto">
              <button type="button" className='dark-light-mode-button' onClick={() => toggleTheme()}>
                {
                  theme === 'light' ?
                    <BsFillMoonStarsFill size={18} fill='#000070' />
                    :
                    <BsFillSunFill size={18} fill='#FFFFB0' />
                }
              </button>
            </li>

            {/* ---- User Profile ------------------------------------------------------------------------------------------------------------------------------ */}
            <li className="nav-item mx-3">
              <Link to='/profile' className="nav-link">
                {
                  (auth?.userDetails) ?
                    <img className='profile-icon' style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '90px' }} src={auth.userDetails.image.url} alt='Profile' />
                    :
                    <FaCircleUser className='profile-icon' style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.5))' }} size={24} />
                }
              </Link>
            </li>

          </ul>
        </div>

      </div>

    </div>
  )
}
