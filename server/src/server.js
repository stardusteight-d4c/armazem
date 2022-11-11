import { serverHttp } from "./http"
import './websocket'

// STARTING SERVER
serverHttp.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})


