import { Headset, UserRound } from "lucide-react";
import { Link } from "react-router-dom";


const NavbarActions = ({
 openCounsellingPopup,
 scrolled
}) => {

return (

<div
className="
hidden
items-center
gap-3
lg:flex"
>

<button
onClick={openCounsellingPopup}
className="text-sm
flex
items-center
gap-2
rounded-xl
bg-white
px-4
py-3
font-semibold
text-slate-900
shadow
hover:-translate-y-0.5 hover:cursor-pointer
"
>

<Headset size={18}/>

Get Free Counselling

</button>


<Link
to="/loginViaOtp"
className="text-sm
flex
items-center
gap-2
rounded-xl
border
border-white
px-4
py-3
font-semibold
text-white
hover:bg-white
hover:text-primary hover:cursor-pointer
"
>

<UserRound size={18}/>

Student Login

</Link>


</div>

)

}


export default NavbarActions;