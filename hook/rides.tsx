import { RideService } from '@/services/ride';
import { useUser } from '@clerk/clerk-expo';
import { useInfiniteQuery } from '@tanstack/react-query';

const useRides = () => {
    const { user } = useUser()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["rides", user?.id],
        queryFn: ({ pageParam }) =>
            RideService.getRides({ user_id: user?.id!, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            const { totalPages, page } = lastPage;
            if (page < totalPages) {
                return page + 1;
            }
            return undefined;
        },
        enabled: !!user?.id
    });


    return {
        rides: data?.pages.flatMap((page) => page.data) ?? [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isLoading,
    }
}

export default useRides