import { io } from './http.js'

io.on('connection', (socket) => {
  socket.on('enter-post', (data) => {
    socket.join(data.postId)
  })
  socket.on('enter-chat', (data) => {
    socket.join(data.userId)
  })

  socket.on('post-update', (data) => {
    io.to(data.postId).emit('post-update', { status: true })
  })
  socket.on('chat-update', (data) => {
    io.to(data.to).emit('chat-update', { status: true })
  })
})
