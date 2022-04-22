import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSessionStorage } from "../hooks/useSessionStorage"
import { getAllKatas } from "../services/getKatas"

export const KataDetailPage = () => {
   const [katas, setKatas] = useState([])
   // Variable to navigate between stack of routes
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

   // Find id from params
   const { id } = useParams()

   // Find kata by id

   if (katas.length === 0) return <div>Cargando...</div>
   console.log(katas)
   const kata: any = katas.find((kata: any) => kata._id === id)
   const { name, _id } = kata
   console.log(name, _id)
   return (
      <div> 
         {id}
         <div key={_id}>
            <h1>{name}</h1>
         </div>
      </div>
   )
}