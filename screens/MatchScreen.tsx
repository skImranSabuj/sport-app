// screens/MatchListScreen.tsx
import { FlashList } from '@shopify/flash-list';
import { useMatchList } from '../hooks/useMatchList';
import MatchCard from '../components/MatchCard';
// import LoadingFooter from '../components/LoadingFooter';
// import EmptyState from '../components/EmptyState';
// import ErrorState from '../components/ErrorState';
// import FiltersSheet from '../components/FiltersSheet';

export default function MatchListScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useMatchList();

//   if (isLoading) return <EmptyState variant="loading" />;
//   if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <FlashList
        data={data}
        // estimatedItemSize={120}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MatchCard match={item} />}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        // ListEmptyComponent={<EmptyState variant="empty" />}
        // ListFooterComponent={<LoadingFooter visible={isFetchingNextPage} />}
      />
      {/* <FiltersSheet /> */}
    </>
  );
}