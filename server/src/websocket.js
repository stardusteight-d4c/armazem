import { io } from './http'

io.on('connection', (socket) => {
  socket.on('enter-post', (data) => {
    socket.join(data.postId)
  })

  socket.on('post-update', (data) => {
    io.to(data.postId).emit('post-update', { status: true })
  })
})
