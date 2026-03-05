import { getLoggedUserWhishlist } from '@/app/_actions/whishlist.actions'
import { useQuery } from '@tanstack/react-query'

export default function useGetWhishlist(enabled: boolean) {

    const queryOptions = useQuery(
        { 
        queryKey: ['whishlist'], 
        queryFn: getLoggedUserWhishlist , 
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
