import FontAwesome from "@expo/vector-icons/FontAwesome";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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

  const { apply, reset } = useFilters();

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
      backgroundStyle={{ backgroundColor: Colors.black }}
      handleIndicatorStyle={{
        borderWidth: 0,
        backgroundColor: Colors.primaryLight,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: Colors.white }}
      >
        {/* Header */}
        <View
          style={{
            padding: Spacing[4],
            backgroundColor: Colors.black,
          }}
        >
          <Text
            style={{
              fontFamily: "bold-font",
              fontSize: Typography.size.xl,
              color: Colors.primaryLight,
            }}
          >
            FILTERS
          </Text>

          <TouchableOpacity
            onPress={() => handleCollapse()}
            style={{ position: "absolute", right: Spacing[4], top: Spacing[4] }}
          >
            <FontAwesome
              name="close"
              size={24}
              color={Colors.primaryLight}
              style={{ marginRight: Spacing[2] }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={reset}
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.border,
            padding: Spacing[4],
          }}
        >
          <Text
            style={{
              fontSize: Typography.size.md,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            <FontAwesome
              name="undo"
              size={18}
              color={Colors.primary}
              style={{ marginRight: Spacing[2] }}
            />
            <Text style={{ textDecorationLine: "underline" }}>Reset all</Text>
          </Text>
        </TouchableOpacity>

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
