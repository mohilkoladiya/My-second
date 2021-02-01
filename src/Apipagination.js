import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'

export default function Api1() {
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [data, setData] = useState(5)
    const [start, setStart] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        Axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
            .then((response) => {
                setList([response.data])
            })
            .catch((error) => { 
                console.log("Error : ", error);
            })
    }, [page,limit])

    let items = [];
    for (let number = start; number <= data; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)} >
                {number}
            </Pagination.Item>
        )
    }

    const nextDataHandler = () => {
        setData(data + 1)
        setStart(start + 1)
    }
    const prevDataHandler = () => { 
        setData(data - 1)
        setStart(start - 1)
    }

    const limitHandler=(event)=>{
        setLimit(event.target.value)
    }
    return (
        <>
            <div align="center">
                <h1>Employe - Data  </h1>
                <select  onChange={(event)=>{limitHandler(event)}}>
                    <option selected desable>---Record-Limit---</option>
                    <option value="5">5</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div align="center">
                <table border="1px" width="100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list &&
                            list.map((item) =>
                                 item.map((item1) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item1.id}</td>
                                                <td>{item1.name}</td>
                                                <td>{item1.email}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            )
                        }
                    </tbody>
                </table>
            </div><br/>
            <div>
                <Pagination>
                    <Pagination.Prev onClick={prevDataHandler} />
                    {items}
                    <Pagination.Next onClick={nextDataHandler} />
                </Pagination>
            </div>
        </>
    )
}
