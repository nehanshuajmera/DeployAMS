import { useLocation, useNavigate } from "react-router-dom"

const AdminNav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const navMenu = [
        {
            navName:"Home",
            navLink:"/dashboard",
            id:4,
        },
        {
            navName:"Student",
            navLink:"/allstudent",
            id:1,
        },
        {
            navName:"Teacher",
            navLink:"/allteacher",
            id:2,
        },
        {
            navName:"Subject",
            navLink:"/allsubject",
            id:3,
        }
    ]
    console.log((location.pathname===( '/' || '/dashboard'  ))?'hidden':'false')
    let locationName
    if(location.pathname===( '/'   )){
        locationName = true
    }
    else if(location.pathname===(  '/dashboard'  )){
        locationName= true
    }
  return (
    <div className={`bg-primary px-6 py-3 text-white flex justify-between items-center ${locationName?'hidden':''} `}>
      <div >
        <h3 className="text-2xl cursor-pointer" onClick={()=>navigate('/dashboard')}>
            AMS
        </h3>
      </div>
      <div className="flexCenter gap-8 cursor-pointer">
        {
            navMenu.map(menu=>{
                console.log(menu)
                return(
                    <div key={menu.id} onClick={()=>navigate(menu.navLink)}>
                        {menu.navName}
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default AdminNav
