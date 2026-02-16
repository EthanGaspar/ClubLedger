import { useState, useEffect } from "react"
import api from "../lib/axios"
import { useAuthContext } from "./useAuthContext"

const useRoles = () => {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchRoles = async () => {
            if (!user) {
                setLoading(false)
                return
            }
            try {
                const res = await api.get("/settings")
                setRoles(res.data.roles)
            } catch (error) {
                console.error("Error fetching roles:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchRoles()
    }, [user])

    return { roles, setRoles, loading }
}

export default useRoles
