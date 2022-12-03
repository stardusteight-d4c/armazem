import { serverHttp } from "./http.js"
import './websocket.js'

// STARTING SERVER
serverHttp.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})


