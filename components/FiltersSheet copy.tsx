import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
const APPLY_HEIGHT = 56;

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
          // height: SCREEN_HEIGHT,
          backgroundColor: Colors.overlay,
          borderWidth: 2,
        },
        animatedStyle,
      ]}
    >
      {/* Overlay */}
      <Pressable
        style={{ height: SCREEN_HEIGHT - SHEET_HEIGHT }}
        onPress={() => (translateY.value = SCREEN_HEIGHT)}
      />

      {/* Sheet */}
      <View
        style={{
          height: SHEET_HEIGHT,
          backgroundColor: Colors.white,
          borderTopLeftRadius: Radii.lg,
          borderTopRightRadius: Radii.lg,
        }}
      >
        {/* Header */}
        <View
          style={{
            padding: Spacing[4],
            paddingBottom: Spacing[2],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: Spacing[3],
            }}
          >
            <Text style={{ fontSize: Typography.size.xl }}>FILTERS</Text>

            <Pressable onPress={reset}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: Typography.size.sm,
                }}
              >
                Reset all
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Content */}
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Spacing[4],
              paddingBottom: APPLY_HEIGHT * 2,
            }}
          >
            {data?.map((sport) => {
              const expanded = expandedSportId === sport.id;

              return (
                <View
                  key={sport.id}
                  style={{
                    backgroundColor: "#F2F3F7",
                    borderRadius: Radii.md,
                    marginBottom: Spacing[2],
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
                      padding: Spacing[3],
                    }}
                  >
                    <Text style={{ fontSize: Typography.size.md }}>
                      {sport.sportName}
                    </Text>
                    <Text>{expanded ? "▴" : "▾"}</Text>
                  </Pressable>

                  {/* Expanded */}
                  {expanded && (
                    <View style={{ paddingHorizontal: Spacing[3] }}>
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
                          marginBottom: Spacing[2],
                        }}
                      />

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
                            <Text style={{ fontSize: Typography.size.sm }}>
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

        {/* Sticky Apply */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: Spacing[4],
            backgroundColor: Colors.white,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
            zIndex: 10,
            marginBottom: Spacing[8],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              apply();
              translateY.value = SCREEN_HEIGHT;
            }}
            style={{
              backgroundColor: Colors.primary,
              height: APPLY_HEIGHT,
              borderRadius: Radii.md,
              alignItems: "center",
              justifyContent: "center",
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
      </View>
    </Animated.View>
  );
});

export default FiltersSheet;
