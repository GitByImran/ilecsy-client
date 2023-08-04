import React, { useContext } from 'react';
import { AuthContext } from '../../authentication/Provider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user } = useContext(AuthContext)
    const { refetch, data: cartData = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/orders?email=${user?.email}`)
            return response.json()
        }
    })
    return [cartData, refetch]
}
export default useCart;