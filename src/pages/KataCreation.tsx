import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Editor } from "../editor/Editor"
import { useSessionStorage } from "../hooks/useSessionStorage"

export const KataCreation = () => {
  const navigate = useNavigate()
  const loggedIn = useSessionStorage("token")

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login")
    }
  }, [loggedIn, navigate])

  const codeExaple = `
    (function someDemo() {
      var test = 'Hello World';
      console.log(test);
    })()
    return () => <App />
  `

  return (
    <div>
      <Editor language='jsx'>
        {codeExaple}
      </Editor>
    </div>
  )
}