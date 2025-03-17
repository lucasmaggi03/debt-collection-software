import { useState, useEffect } from 'react';
import axios from 'axios';

export function Parents() {
  const [list, setList] = useState([])
  const getParents = async () => {
    await axios.get('http://localhost:5000/parents')
    .then((response) => {
      console.log(response.data)
      setList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getParents()
  }, [])

  return (
    <>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item.name}</li>
        }
        )}
      </ul>
    </>
  )
}
