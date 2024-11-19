import React, { useEffect } from 'react'

export default function useBeforUnload(callback) {
    useEffect(()=>{
        const beforeUnloadHandler =(e)=>{
            e.preventDefault()
            callback && callback()
        }
        window.addEventListener('beforeunload',beforeUnloadHandler)
        return ()=> window.removeEventListener('beforeunload',beforeUnloadHandler)
    },[])
}
