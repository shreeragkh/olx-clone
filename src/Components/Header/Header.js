import React , {useContext} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/firebaseContext';
import { signOut } from 'firebase/auth';
import {auth} from '../../api'
import {  useNavigate } from 'react-router-dom';



function Header() {
  const {User,setUser} = useContext(AuthContext)
  const history=useNavigate()

  const SignOut =async ()=>{
    try {
      await signOut(auth)
      history('/login')
      setUser(null)
    } catch (error) {
      console.error("Error in signing out ",error)
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{User ? User.displayName:'Login'}</span>
          <hr />
        </div>

        {User && <span onClick={SignOut}>Logout</span>} 
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
