import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSportsAndLeagues } from "../hooks/useSportsAndLeagues";
import { useFilters } from "../store/filters";
import { Colors, Radii, Spacing, Typography } from "../theme";
import SportAccordion from "./SportAccordion";

export type FiltersSheetRef = {
  expand: () => void;
  collapse: () => void;
};

const FiltersSheet = forwardRef<FiltersSheetRef>((_, ref) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const {
    draftSelectedTournamentIds,
    draftSportSearch,
    toggleDraftTournament,
    setDraftSportSearch,
    apply,
    reset,
  } = useFilters();

  const { data: sports, isFetching } = useSportsAndLeagues();

  const handleExpand = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  const handleCollapse = useCallback(() => {
    sheetRef.current?.collapse();
  }, []);

  React.useImperativeHandle(ref, () => ({
    expand: handleExpand,
    collapse: handleCollapse,
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={BottomSheetBackdrop}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            padding: Spacing[4],
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
          }}
        >
          <Text style={{ fontSize: Typography.size.xl }}>FILTERS</Text>

          <Pressable
            onPress={reset}
            style={{ position: "absolute", right: Spacing[4], top: Spacing[4] }}
          >
            <Text
              style={{
                fontSize: Typography.size.sm,
                color: Colors.primary,
              }}
            >
              Reset all
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        {isFetching ? (
          <View style={{ padding: Spacing[4] }}>
            <ActivityIndicator />
          </View>
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{
              padding: Spacing[4],
              paddingBottom: Spacing[10],
            }}
          >
            {sports?.map((sport) => (
              <SportAccordion key={sport.id} sport={sport} />
            ))}
          </BottomSheetScrollView>
        )}
      </KeyboardAvoidingView>

      {/* Sticky Apply */}
      <View
        style={{
          padding: Spacing[4],
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.white,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            apply();
            handleCollapse();
          }}
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: Spacing[3],
            borderRadius: Radii.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: Typography.size.md,
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});

export default FiltersSheet;
