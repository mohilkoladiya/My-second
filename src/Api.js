import React, { useState, useEffect } from 'react'

export default function Api () {
    const [page, setPage] = useState(1)
    const [listItems, setListItems] = useState([])
    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
        .then(res => res.json())
        .then(response => {
            setListItems([...listItems, ...response])
        })
        .catch(error => console.log(error))
    }, [page])

    useEffect(() => {
        function handleScroll() {
            if (
                Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
                document.documentElement.offsetHeight
            )
                return 
                setPage(page + 1)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })
    return (
        <>
            <div>
                {listItems.map((item) => (
                    <div>
                        <img width="200" height="200" src={item.url} />
                        <h3>{item.id}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}
