import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketIOHook {
    message: string | null;
    sendMessage: (msg: string) => void;
}

function useSocketIO(url: string): SocketIOHook {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const newSocket = io(url);

        newSocket.on('connect', () => {
            console.log('Socket.IO connected');
        });

        newSocket.on('message', (data: string) => {
            setMessage(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    const sendMessage = (msg: string) => {
        if (socket) {
            socket.emit('sendMessage', msg);
        }
    };

    return { message, sendMessage };
}

export {useSocketIO};
