import { createPortal } from "react-dom";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";


const CounsellingModal = ({
open,
close
})=>{

if(!open) return null;


return createPortal(

<div
className="
fixed
inset-0
z-[9999]
flex
items-center
justify-center
bg-black/80
p-4
"
>

<div
className="
relative
max-h-[90vh]
w-full
max-w-3xl
overflow-auto
rounded-3xl
bg-white
"
>


<button
onClick={close}
className="
absolute
right-4
top-4
"
>
×
</button>


<FreeCounsellingForm
onSuccess={close}
/>


</div>

</div>,

document.body

)

}


export default CounsellingModal;