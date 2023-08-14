## Описание

```typescript
import {useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';

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

    return {message, sendMessage};
}

export {useSocketIO};
```

Этот модуль предоставляет хук `useSocketIO`, который обеспечивает интеграцию с Socket.IO для управления соединением
WebSocket и передачи сообщений.

Хук `useSocketIO` принимает один аргумент:

1. `url` - URL сервера Socket.IO, к которому нужно подключиться.

При вызове хука `useSocketIO` устанавливается соединение с сервером Socket.IO, отслеживаются события и сообщения, а
также предоставляется функция `sendMessage` для отправки сообщений через сокет.

## Использование

Для использования хука `useSocketIO`, следуйте примеру ниже:

1. Установите зависимость `socket.io-client` с помощью npm или yarn:

```bash
npm install socket.io-client
```

2. Ваш компонент:

```tsx
import React from 'react';
import useSocketIO from './useSocketIO';

function SocketIOComponent() {
    const {message, sendMessage} = useSocketIO('http://example.com');

    const handleSendMessage = () => {
        sendMessage('Hello, Socket.IO!');
    };

    return (
        <div>
            <p>Received Message: {message}</p>
            <button onClick={handleSendMessage}>Send Socket.IO Message</button>
        </div>
    );
}

export {SocketIOComponent};
```

Подставьте реальный URL сервера Socket.IO вместо `'http://example.com'`. Хук `useSocketIO` позволяет легко устанавливать
соединение с сервером и передавать сообщения через сокет.

## Диаграмма

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448.06615828932013 391.8888888888888" width="448.06615828932013" height="391.8888888888888">
  <!-- svg-source:excalidraw -->

  <defs>
    <style class="style-fonts">
      @font-face {
        font-family: "Virgil";
        src: url("https://excalidraw.com/Virgil.woff2");
      }
      @font-face {
        font-family: "Cascadia";
        src: url("https://excalidraw.com/Cascadia.woff2");
      }
    </style>

  </defs>
  <rect x="0" y="0" width="448.06615828932013" height="391.8888888888888" fill="#ffffff"></rect><g stroke-linecap="round" transform="translate(10 10) rotate(0 88.48664767669572 33.96457183549937)"><path d="M16.98 0 M16.98 0 C64.11 -0.46, 107.28 2.66, 159.99 0 M16.98 0 C66.65 0.27, 117.49 -0.14, 159.99 0 M159.99 0 C171.93 -0.16, 177.33 6.97, 176.97 16.98 M159.99 0 C170.53 1.85, 178.35 6.26, 176.97 16.98 M176.97 16.98 C178.11 29.98, 175.25 42.72, 176.97 50.95 M176.97 16.98 C177.22 30.49, 176.21 42.98, 176.97 50.95 M176.97 50.95 C178.89 61.45, 170.65 68.21, 159.99 67.93 M176.97 50.95 C174.85 62.84, 169.83 66.31, 159.99 67.93 M159.99 67.93 C115.49 69.48, 70.99 67.83, 16.98 67.93 M159.99 67.93 C108.76 66.15, 56.85 66.46, 16.98 67.93 M16.98 67.93 C6 67.71, 1.03 64.21, 0 50.95 M16.98 67.93 C7.69 68.21, 0.67 62.73, 0 50.95 M0 50.95 C0.86 40.23, 0.96 31.52, 0 16.98 M0 50.95 C0.13 42.91, -0.47 32.59, 0 16.98 M0 16.98 C-1.64 6.09, 7.16 -0.08, 16.98 0 M0 16.98 C1.68 4.1, 6.9 -0.92, 16.98 0" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(54.09435641801667 26.386416236425106) rotate(0 44.2802474646885 20.855438846359263)"><text x="44.280247464688486" y="0" font-family="Virgil, Segoe UI Emoji" font-size="16.68435107708741px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">Socket.IO </text><text x="44.280247464688486" y="20.855438846359263" font-family="Virgil, Segoe UI Emoji" font-size="16.68435107708741px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">Server</text></g><g stroke-linecap="round" transform="translate(11.489674203311324 111.8937155064981) rotate(0 88.48664767669572 33.964571835499385)"><path d="M16.98 0 M16.98 0 C57.39 0.38, 97.7 -0.39, 159.99 0 M16.98 0 C55.2 -0.43, 96.15 -0.66, 159.99 0 M159.99 0 C170.98 -0.6, 178.74 6.42, 176.97 16.98 M159.99 0 C173.18 2.06, 176.6 5.51, 176.97 16.98 M176.97 16.98 C176.34 26.96, 177.58 41.43, 176.97 50.95 M176.97 16.98 C177.06 26.16, 177.81 35, 176.97 50.95 M176.97 50.95 C175.1 62.42, 171.04 66.17, 159.99 67.93 M176.97 50.95 C176.87 60.43, 169.82 69.17, 159.99 67.93 M159.99 67.93 C105.65 66.46, 46.55 65.34, 16.98 67.93 M159.99 67.93 C112.99 68.71, 67.43 68.94, 16.98 67.93 M16.98 67.93 C6.2 69.28, 0.02 60.66, 0 50.95 M16.98 67.93 C7.62 67.17, 0.29 64.17, 0 50.95 M0 50.95 C-0.95 42.57, -1.83 33.63, 0 16.98 M0 50.95 C-0.15 40.82, -0.69 31.49, 0 16.98 M0 16.98 C-0.62 5.97, 5.82 0.93, 16.98 0 M0 16.98 C1.39 3.42, 6.71 -2.22, 16.98 0" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(56.47491905676168 125.5325104345934) rotate(0 44.2802474646885 20.85543884635925)"><text x="44.280247464688486" y="0" font-family="Virgil, Segoe UI Emoji" font-size="16.68435107708741px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">Socket.IO </text><text x="44.280247464688486" y="20.855438846359263" font-family="Virgil, Segoe UI Emoji" font-size="16.68435107708741px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">Client</text></g><g stroke-linecap="round" transform="translate(14.071776155717771 215.442624572231) rotate(0 88.48664767669572 33.964571835499385)"><path d="M16.98 0 M16.98 0 C69.92 -0.74, 121.29 1.47, 159.99 0 M16.98 0 C62.67 -1.21, 107.98 -0.39, 159.99 0 M159.99 0 C170.06 0.23, 178.16 3.86, 176.97 16.98 M159.99 0 C169.5 -1.58, 176.78 5.23, 176.97 16.98 M176.97 16.98 C178.43 24.58, 178.48 32.34, 176.97 50.95 M176.97 16.98 C177.61 29.76, 177.71 42.08, 176.97 50.95 M176.97 50.95 C177.34 62.52, 171.88 69.45, 159.99 67.93 M176.97 50.95 C174.92 61.28, 173.4 68.99, 159.99 67.93 M159.99 67.93 C120.16 67.46, 81.89 66.58, 16.98 67.93 M159.99 67.93 C120.08 67.02, 78.98 67.65, 16.98 67.93 M16.98 67.93 C7.43 66.83, -1.88 60.65, 0 50.95 M16.98 67.93 C6.47 65.92, 1.24 61.24, 0 50.95 M0 50.95 C-2.09 38.95, 1.75 28.82, 0 16.98 M0 50.95 C0.95 41.07, -0.75 33.69, 0 16.98 M0 16.98 C-0.08 5.67, 6.44 -1.25, 16.98 0 M0 16.98 C0.09 5.38, 3.81 1.7, 16.98 0" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(42.67352085929622 241.06502086918664) rotate(0 63.1955184080814 8.938045219868258)"><text x="0" y="0" font-family="Virgil, Segoe UI Emoji" font-size="14.30087235178921px" fill="#1e1e1e" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">useSocketIO Hook</text></g><g stroke-linecap="round" transform="translate(15.793177457322031 313.95974521789003) rotate(0 88.48664767669572 33.964571835499385)"><path d="M16.98 0 M16.98 0 C59.76 1.4, 102.38 0.81, 159.99 0 M16.98 0 C49.69 0.25, 82.04 0.08, 159.99 0 M159.99 0 C173.19 -1.02, 177.28 4.64, 176.97 16.98 M159.99 0 C172.93 -0.02, 175.79 7.55, 176.97 16.98 M176.97 16.98 C179.1 30.1, 178.04 42.99, 176.97 50.95 M176.97 16.98 C176.32 24.54, 176.39 32.46, 176.97 50.95 M176.97 50.95 C175.65 62.03, 170.67 69.88, 159.99 67.93 M176.97 50.95 C178.9 60.02, 172.35 69.13, 159.99 67.93 M159.99 67.93 C124.84 67.29, 90.63 68.17, 16.98 67.93 M159.99 67.93 C119.94 67.6, 78.81 67.36, 16.98 67.93 M16.98 67.93 C6.81 66.73, 0.42 60.87, 0 50.95 M16.98 67.93 C6.26 67.06, -2.08 60.1, 0 50.95 M0 50.95 C-1.48 43.56, 1.55 34.44, 0 16.98 M0 50.95 C0.2 43.12, -0.3 33.25, 0 16.98 M0 16.98 C0.42 4.28, 5.6 0.21, 16.98 0 M0 16.98 C1.21 4.84, 5.52 -1.5, 16.98 0" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(53.332967380768764 330.09063071997815) rotate(0 49.020982866930694 22.02597615584577)"><text x="49.0209828669307" y="0" font-family="Virgil, Segoe UI Emoji" font-size="17.62078092467662px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">WebSocket </text><text x="49.0209828669307" y="22.025976155845775" font-family="Virgil, Segoe UI Emoji" font-size="17.62078092467662px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">Connection</text></g><g stroke-linecap="round"><g transform="translate(97.96003904431052 82.69610112159512) rotate(0 -0.8011933176740627 10.637069235888191)"><path d="M0.49 0.14 C-0.03 3.79, -1.87 17.26, -2.09 21.08 M-0.72 -0.83 C-0.92 3.02, 0.38 18.42, 0.29 22.1" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(97.96003904431052 82.69610112159512) rotate(0 -0.8011933176740627 10.637069235888191)"><path d="M-3.74 11.29 C-3.24 16.36, 0.18 18.86, 1.1 21.25 M-3.42 11.41 C-2.62 14.51, -1.92 17.29, 0.79 22.57" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(97.96003904431052 82.69610112159512) rotate(0 -0.8011933176740627 10.637069235888191)"><path d="M3.81 11.01 C1.42 16.22, 1.94 18.83, 1.1 21.25 M4.13 11.13 C3.02 14.28, 1.8 17.13, 0.79 22.57" stroke="#1971c2" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round"><g transform="translate(101.300476727395 181.3456372519929) rotate(0 -0.2898874174981074 14.81532414586269)"><path d="M-1.1 -1.04 C-0.93 3.79, -0.02 24.23, 0.24 29.13 M0.52 1.02 C0.63 6.04, -0.48 25.96, -0.58 30.67" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(101.300476727395 181.3456372519929) rotate(0 -0.2898874174981074 14.81532414586269)"><path d="M-6.28 17.09 C-3.96 20.62, -3.85 22.87, -1.3 31.42 M-5.13 17.36 C-3.47 22.52, -1.28 27.76, -0.22 30.62" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(101.300476727395 181.3456372519929) rotate(0 -0.2898874174981074 14.81532414586269)"><path d="M3.68 17.49 C3.69 20.83, 1.51 23, -1.3 31.42 M4.82 17.76 C2.59 22.78, 0.88 27.87, -0.22 30.62" stroke="#1971c2" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round"><g transform="translate(101.300476727395 286.6159476193301) rotate(0 0.8787572882014842 11.9612049569011)"><path d="M1.13 -0.35 C1.03 3.83, -0.09 21.06, -0.25 25.5 M0.27 -1.57 C0.51 2.18, 2.17 19.2, 1.99 23.55" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(101.300476727395 286.6159476193301) rotate(0 0.8787572882014842 11.9612049569011)"><path d="M-3.11 10.94 C-0.79 15.2, 1.59 18.62, 3.15 23.52 M-2.97 12.45 C-1.15 14.7, -0.1 18.05, 1.75 23.44" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(101.300476727395 286.6159476193301) rotate(0 0.8787572882014842 11.9612049569011)"><path d="M5.49 10.62 C4.98 15.07, 4.51 18.59, 3.15 23.52 M5.63 12.13 C5.07 14.47, 3.74 17.91, 1.75 23.44" stroke="#1971c2" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(261.0928629359287 313.5624987636738) rotate(0 88.48664767669572 33.964571835499356)"><path d="M16.98 0 M16.98 0 C58.53 0.94, 98.68 -2.48, 159.99 0 M16.98 0 C64.87 0.98, 111.7 0.75, 159.99 0 M159.99 0 C170.7 -1.68, 178.62 4.48, 176.97 16.98 M159.99 0 C171.21 -1.62, 174.82 6.27, 176.97 16.98 M176.97 16.98 C177.58 25.07, 178.49 37.66, 176.97 50.95 M176.97 16.98 C177.39 24.48, 176.69 32.72, 176.97 50.95 M176.97 50.95 C175.87 61.19, 169.43 67.31, 159.99 67.93 M176.97 50.95 C176.02 60.19, 172.74 67.59, 159.99 67.93 M159.99 67.93 C118.08 70.46, 73.38 67.37, 16.98 67.93 M159.99 67.93 C119.02 67.69, 78.49 67.84, 16.98 67.93 M16.98 67.93 C5.84 68.53, 1.25 63.59, 0 50.95 M16.98 67.93 C6.41 69.1, -0.18 61.62, 0 50.95 M0 50.95 C1.73 39.22, -2.07 30.58, 0 16.98 M0 50.95 C-0.16 43.15, -0.4 36.01, 0 16.98 M0 16.98 C0.4 5.89, 5.52 -0.75, 16.98 0 M0 16.98 C0.56 4.25, 4.6 2.13, 16.98 0" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(273.7999866473448 340.286623044865) rotate(0 73.85364907896133 11.012988077922898)"><text x="73.85364907896133" y="0" font-family="Virgil, Segoe UI Emoji" font-size="17.62078092467662px" fill="#1e1e1e" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">React Component</text></g><g stroke-linecap="round"><g transform="translate(194.65339346824123 344.87876090439727) rotate(0 32.66035648560296 0.0021411133899960078)"><path d="M0.74 -1.19 C11.88 -1.39, 54.76 -0.51, 65.65 -0.04 M-0.33 0.8 C10.82 1.25, 54.07 1.3, 65.1 1.13" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(194.65339346824123 344.87876090439727) rotate(0 32.66035648560296 0.0021411133899960078)"><path d="M34.98 12.81 C41.37 11.19, 49.81 7.29, 65.47 2.62 M36.54 12.4 C43.65 9.5, 51.84 6.2, 64.54 0.21" stroke="#1971c2" stroke-width="1" fill="none"></path></g><g transform="translate(194.65339346824123 344.87876090439727) rotate(0 32.66035648560296 0.0021411133899960078)"><path d="M34.88 -7.71 C41.48 -5.19, 49.94 -4.96, 65.47 2.62 M36.43 -8.12 C43.77 -5.43, 51.99 -3.14, 64.54 0.21" stroke="#1971c2" stroke-width="1" fill="none"></path></g></g><mask></mask></svg>


Эта диаграмма иллюстрирует взаимодействие между компонентом React, хуком `useSocketIO` и сервером Socket.IO.
Хук `useSocketIO` обеспечивает удобное управление соединением и обменом данными между компонентом React и сервером
Socket.IO.
