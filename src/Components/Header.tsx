import logo from '../assets/Logo.png'

export function Header(){
  return (
  <header className="w-full h-[200px] flex items-center justify-center bg-black ">
    <img src={logo} alt="logo" />
  </header>
  )
}