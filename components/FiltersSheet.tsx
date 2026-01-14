import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSportsAndLeagues } from "../hooks/useSportsAndLeagues";
import { useFilters } from "../store/filters";
import { Colors, Radii, Spacing, Typography } from "../theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

export type FiltersSheetRef = {
  open: () => void;
  close: () => void;
};

const FiltersSheet = forwardRef<FiltersSheetRef>((_, ref) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const [expandedSportId, setExpandedSportId] = useState<number | null>(null);

  const {
    draftSelectedTournamentIds,
    draftSportSearch,
    toggleDraftTournament,
    setDraftSportSearch,
    apply,
    reset,
  } = useFilters();

  const { data, isFetching } = useSportsAndLeagues();

  useImperativeHandle(ref, () => ({
    open: () =>
      (translateY.value = withTiming(SCREEN_HEIGHT - SHEET_HEIGHT, {
        duration: 300,
      })),
    close: () =>
      (translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 })),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.overlay,
        },
        animatedStyle,
      ]}
    >
      {/* Overlay */}
      <Pressable
        style={{ flex: 1 }}
        onPress={() => (translateY.value = SCREEN_HEIGHT)}
      />

      {/* Sheet */}
      <View
        style={{
          height: SHEET_HEIGHT,
          backgroundColor: Colors.white,
          borderTopLeftRadius: Radii.lg,
          borderTopRightRadius: Radii.lg,
          padding: Spacing.lg,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: Spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: Typography.size.xl,
              fontWeight: Typography.weight.bold,
            }}
          >
            FILTERS
          </Text>

          <Pressable onPress={reset}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: Typography.size.sm,
                fontWeight: Typography.weight.semibold,
              }}
            >
              Reset all
            </Text>
          </Pressable>
        </View>

        {/* Search Trigger */}
        <Pressable
          onPress={apply}
          style={{
            backgroundColor: Colors.primaryLight,
            paddingVertical: 12,
            borderRadius: Radii.md,
            alignItems: "center",
            marginBottom: Spacing.md,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              // fontWeight: Typography.weight.bold,
            }}
          >
            Search
          </Text>
        </Pressable>

        {/* Content */}
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {data?.map((sport) => {
              const expanded = expandedSportId === sport.id;

              return (
                <View
                  key={sport.id}
                  style={{
                    backgroundColor: "#F2F3F7",
                    borderRadius: Radii.md,
                    marginBottom: Spacing.sm,
                  }}
                >
                  {/* Sport Header */}
                  <Pressable
                    onPress={() =>
                      setExpandedSportId(expanded ? null : sport.id)
                    }
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: Spacing.md,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Typography.size.md,
                        // fontWeight: Typography.weight.semibold,
                      }}
                    >
                      {sport.sportName}
                    </Text>
                    <Text>{expanded ? "▴" : "▾"}</Text>
                  </Pressable>

                  {/* Expanded */}
                  {expanded && (
                    <View style={{ paddingHorizontal: Spacing.md }}>
                      {/* League Search */}
                      <TextInput
                        placeholder="Search leagues"
                        value={draftSportSearch[sport.id] ?? ""}
                        onChangeText={(text) =>
                          setDraftSportSearch(sport.id, text)
                        }
                        style={{
                          backgroundColor: Colors.white,
                          borderRadius: Radii.sm,
                          padding: 10,
                          marginBottom: Spacing.sm,
                        }}
                      />

                      {/* Leagues */}
                      {sport.tournaments.map((league) => {
                        const selected = draftSelectedTournamentIds.includes(
                          league.id
                        );

                        return (
                          <Pressable
                            key={league.id}
                            onPress={() => toggleDraftTournament(league.id)}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingVertical: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: Typography.size.sm,
                              }}
                            >
                              {league.name}
                            </Text>

                            <Text
                              style={{
                                color: selected ? Colors.primary : Colors.muted,
                                fontSize: 16,
                              }}
                            >
                              {selected ? "✔" : "○"}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Apply */}
        <Pressable
          onPress={() => {
            apply();
            translateY.value = SCREEN_HEIGHT;
          }}
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 14,
            borderRadius: Radii.md,
            alignItems: "center",
            marginTop: Spacing.sm,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: Typography.size.md,
              // fontWeight: Typography.weight.bold,
            }}
          >
            Apply
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
});

export default FiltersSheet;
