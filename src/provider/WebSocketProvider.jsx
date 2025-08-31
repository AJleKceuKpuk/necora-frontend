import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { WebSocketContext } from '../context/WebSocketContext'
import { useToken } from '../hooks/useToken'
import { useProfile } from './ProfileProvider'
import { getWebSocketUrl } from '../api/webSocketApi'

export const WebSocketProvider = ({ children }) => {
    const [client, setClient] = useState(null)
    const [status, setStatus] = useState('idle')
    const { accessToken } = useToken();
    const { profile, isLoading } = useProfile();

    //Подключение к WS серверу
    const connect = useCallback(() => {
        if (!accessToken || client?.active) return
        const stomp = new Client({
            webSocketFactory: () => new SockJS(getWebSocketUrl(accessToken)),
            onConnect: () => {
                setStatus('open')
            },
            onStompError: (frame) => {
            },
            onWebSocketClose: () => {
                setStatus('closed')
            }
        })
        setStatus('connecting')
        setClient(stomp)
        stomp.activate()
        return stomp;
    }, [client, accessToken])

    //Отключение от WS
    const disconnect = useCallback(() => {
        if (client?.active) {
            client.deactivate();
            setClient(null);
            setStatus('closed');
        }
    }, [client]);

    // Универсальная подписка к WS
    const subscribe = useCallback((destination, handler) => {
        if (!client?.connected) {
            return null
        }
        const subscription = client.subscribe(destination, (message) => {
            try {
                const payload = JSON.parse(message.body)
                handler(payload)
            } catch (err) {
                console.warn('[WS] failed to parse message', message.body)
            }
        })

        return subscription
    }, [client])

    // Универсальный запрос
    const send = useCallback((destination, body) => {
        if (!client?.connected) {
            return
        }
        try {
            client.publish({
                destination,
                body: JSON.stringify(body),
            })
        } catch (err) {
        }
    }, [client])




    
    useEffect(() => {
        if (status !== 'open' || !profile?.username || isLoading) return

        const destination = `/ws/online/${profile.username}`;
        const sub = subscribe(destination, (data) => {
           // console.log('Online status:', data)
        })
        send('/ws/online/update', {
            userId: profile.id,
            status: 'online'
        })


        return () => {
            sub?.unsubscribe()
        }
    }, [status, profile, isLoading, subscribe, send])

    useEffect(() => {

        connect();

    }, [connect,])

    const value = useMemo(() => ({
        connect,
        disconnect,
        subscribe,
        send,
        status
    }), [connect, disconnect, subscribe, send, status]);

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    )
}
