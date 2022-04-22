import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSessionStorage } from "../hooks/useSessionStorage"
import { getAllKatas } from "../services/getKatas"

export const KatasPage = () => {
   const [katas, setKatas] = useState([])
   const navigate = useNavigate()
   const loggedIn = useSessionStorage("token")
   useEffect(() => {
      (async() => {
         const katas = await getAllKatas()
         setKatas(katas.data.katas)
      })()
      if (!loggedIn) {
         return navigate("/login")
      }
   },[loggedIn, navigate])
   /**
    * @param {number} Id of the kata
    */
   const navigateToKataDetails = (id: number) => {
      navigate(`/katas/${id}`)
   }

   if (!katas) return <div>Cargando...</div>	
   return (
      <div>
         {
            katas.map((kata: any) => (
               <div key={kata._id}>
                  <h1>{kata.name}</h1>
                  <button onClick={() => navigateToKataDetails(kata._id)}>
                     Go to kata
                  </button>
               </div>
            ))
         }
         <h1>Katas</h1>
         <ul>
            <li onClick={() => navigateToKataDetails(1)}>
               First kata
            </li>
            <li onClick={() => navigateToKataDetails(2)}>
               Second kata
            </li>
         </ul>
      </div>
   )
}