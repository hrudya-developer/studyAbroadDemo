const MobileMenuButton = ({
 mobileOpen,
 setMobileOpen
})=>{

return(

<button
type="button"
onClick={()=>setMobileOpen(!mobileOpen)}
aria-expanded={mobileOpen}
className="
h-9
w-9
rounded-full text-xl
text-white
lg:hidden
"
>

{mobileOpen ? "×":"☰"}

</button>

)

}

export default MobileMenuButton;