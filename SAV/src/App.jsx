import { CookiesProvider } from "react-cookie"
import AppRoutes from "./routes"
import { SessionProvider } from "./context/SessionContext"

function App() {
  return (
    <>
      <CookiesProvider>
        <SessionProvider>
          <AppRoutes />
        </SessionProvider>
      </CookiesProvider>
    </>
  )
}

export default App
