import { getLoggedUserCart } from '@/app/_actions/cart.actions'
import { useQuery } from '@tanstack/react-query'

export default function useGetCart(enabled:boolean) {
    // The enabled truth value changes by changining the session status 
    // As I want the hook to work only when the user is authenticated
    const queryOptions = useQuery(
        { 
        queryKey: ['cart'], 
        queryFn: getLoggedUserCart , 
        enabled: enabled,
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
