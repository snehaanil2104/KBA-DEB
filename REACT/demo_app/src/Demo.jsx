import React from 'react'

const Demo = () => {
    const name = 'Jhon';
  const x = 10;
  const y = 20;
  const  names =['anju','hari','kukku','adhi'];
  const loggedIn =true;
  return (

    <>
    <div className='text-5xl font-bold underline'>APP</div>
    <p>Hello {name}</p>
    <p>The sum of {x} and {y} is {x+y}</p>
    <ul>
      {
        names.map((name,index)=>(
          <li key={index}>{name}</li>
        ))
      }
    </ul>
    {loggedIn ? <h1>Hello Member</h1>:<h1>Hello Guest</h1>}
    </>
  )
}

export default Demo