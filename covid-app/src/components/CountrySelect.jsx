import React from 'react'

export const CountrySelect = ({onchange,countries,select}) => {
  return (
    <select className='my-3 col-12 py-3 border' value={select} onChange={e=>onchange(e)}>
          <option value="0">
                  Select Country
          </option>
          {
            countries.map(item=>(
              <option key={item.ID} value={item.ID}>
                {item.Country}
              </option>
            ))
          }
       </select>
  )
}
