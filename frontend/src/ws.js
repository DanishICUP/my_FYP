import { io } from 'socket.io-client'

export const ConnectWs = io(
    'http://localhost:8000'   
)