import React, { useEffect, useState } from 'react'

export default function useFetch(fetchFn) {
    const [data,setData] =useState()
    const [isLoading,setIsLoading] =useState(false)
    const [isError,setIsError] =useState(false)
    const [error,setError] =useState()
    const [counter,setCounter]=useState(0);

    const trigger =()=>setCounter((prev)=>prev+1)

    useEffect(()=>{
        (async()=>{
            setIsLoading(true)
            try{
             const response=  await (fetchFn && fetchFn())
             setData(response)
            }catch(error){
                setError(error)
                setIsError(true)
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        })()
    },[counter])
  return {data,isLoading,isError,error,trigger};
}
