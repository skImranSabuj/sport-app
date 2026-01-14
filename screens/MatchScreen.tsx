import { useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useMatchList } from '../hooks/useMatchList';
import MatchCard from '../components/MatchCard';
import FilterHeader from '../components/FilterHeader';
import FiltersSheet, { FiltersSheetRef } from '../components/FiltersSheet';
import LoadingFooter from '../components/LoadingFooter';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export default function MatchListScreen() {
  const sheetRef = useRef<FiltersSheetRef>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMatchList();

  if (isLoading) return <EmptyState variant="loading" />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <FlashList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MatchCard match={item} />}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => <FilterHeader onPressFilters={() => sheetRef.current?.open()} />}
        ListEmptyComponent={<EmptyState variant="empty" />}
        ListFooterComponent={<LoadingFooter visible={isFetchingNextPage} />}
        showsVerticalScrollIndicator={false}
      />

      {/* <FiltersSheet ref={sheetRef} /> */}
    </>
  );
}
