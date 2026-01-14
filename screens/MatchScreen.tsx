import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import FilterHeader from "../components/FilterHeader";
import FiltersSheet, { FiltersSheetRef } from "../components/FiltersSheet";
import LoadingFooter from "../components/LoadingFooter";
import MatchCard from "../components/MatchCard";
import Separator from "../components/Separator";
import { useMatchList } from "../hooks/useMatchList";

export default function MatchListScreen() {
  const sheetRef = useRef<FiltersSheetRef>(null);

  const Header = () => (
    <FilterHeader onPressFilters={() => sheetRef.current?.expand()} />
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMatchList();
  if (isLoading && !data?.length) return <EmptyState variant="loading" />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <FlashList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MatchCard match={item} />}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={Header}
        ListEmptyComponent={<EmptyState variant="empty" />}
        ListFooterComponent={<LoadingFooter visible={isFetchingNextPage} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
      />

      <FiltersSheet ref={sheetRef} />
    </>
  );
}
