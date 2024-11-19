import React from 'react'
import { axiosInstance, TAGS_URLS } from '../services/urls/urls'
import useFetch from './useFetch'


const getTags= async()=>{
        let response = await axiosInstance.get(TAGS_URLS.GET_TAGS)
        return response
}
const useTags = () => {
const {data,isLoading,isError,error,trigger} = useFetch(getTags)
return({tags:data?.data,
    TagsError:error,
    isLoadingTags:isLoading,
    isErrorTags:isError,
    triggerTags:trigger})
}

export default useTags