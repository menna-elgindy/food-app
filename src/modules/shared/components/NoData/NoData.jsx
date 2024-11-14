import React from 'react'
import noDataImg from '../../../../assets/imgs/no-data.png'


export default function NoData() {
  return (
    <>
      <img className='img-fluid'src={noDataImg}/>
      <h5 className='pt-3'>No Data !</h5>
      <p className='text-muted py-3'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </>
  )
}
