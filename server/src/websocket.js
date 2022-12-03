import { io } from './http'

io.on('connection', (socket) => {
  socket.on('enter-post', (data) => {
    console.log('enter-post', data)
    socket.join(data.postId)
  })

  socket.on('post-update', (data) => {
    console.log('post-update', data)
    io.to(data.postId).emit('post-update', { status: true })
  })
})
