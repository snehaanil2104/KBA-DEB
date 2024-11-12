import React from 'react';
import Card from './card';
import Demo from './Demo';

const App = () => {
  const name = 'Jhon';
  const x = 10;
  const y = 20;
  const  names =['anju','hari','kukku','adhi'];
  const loggedIn =true;
  return (
    <>
   <Demo />
    <Card customClasses="bg-yellow-100" />
    <Card customClasses="bg-green-100" />
    <Card customClasses="bg-blue-100" />
    </>
  )
}

export default App