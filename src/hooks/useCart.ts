import { getLoggedUserCart } from '@/app/_actions/cart.actions'
import { useQuery } from '@tanstack/react-query'

export default function useGetCart() {

    const queryOptions = useQuery(
        { 
        queryKey: ['cart'], 
        queryFn: getLoggedUserCart , 
        gcTime: 5 * 60 * 1000,       // 5 minutes (formerly cacheTime)
        staleTime: 5 * 1000, 
        // refetchOnMount: true,
        retry: false, 
        refetchOnWindowFocus:false,      
        refetchOnReconnect: true,    // refresh if internet reconnects
        
        }
    )

    return queryOptions
}
