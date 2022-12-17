import React from 'react'
import axios from '@/lib/axios'

export const useUsers = () => {
    const [users, setUsers] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        setLoading(true)
        axios.get('/api/users').then(res => {
            setUsers(res.data?.users ?? [])
            setLoading(false)
        })
    }

    return { users, isLoading, loadUsers }
}
