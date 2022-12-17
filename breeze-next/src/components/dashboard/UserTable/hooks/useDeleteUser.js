import React from 'react'
import axios from '@/lib/axios'

export const useDeleteUser = reload => {
    const [isLoading, setLoading] = React.useState(false)

    const handleDeleteUser = id => {
        setLoading(true)
        axios
            .delete(`/api/users/${id}`)
            .then(() => {
                if (reload) reload()
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return { handleDeleteUser, isLoading }
}
