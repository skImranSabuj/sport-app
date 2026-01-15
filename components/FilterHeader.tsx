import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSportsAndLeagues } from "../hooks/useSportsAndLeagues";
import { useFilters } from "../store/filters";
import { Colors, Radii, Spacing, Typography } from "../theme";
import WeekCalendar from "./WeekCalendar";

type Props = {
  onPressFilters: () => void;
};

export default function FilterHeader({ onPressFilters }: Props) {
  const {
    selectedTournamentIds,
    removeTournament,
    selectedDate,
    setSelectedDate,
    clearDate,
  } = useFilters();
  const { data: sports } = useSportsAndLeagues();

  const selectedChips = useMemo(() => {
    if (!sports || selectedTournamentIds.length === 0) return [];

    return sports.flatMap((sport) =>
      sport.tournaments
        .filter((t) => selectedTournamentIds.includes(t.id))
        .map((t) => ({
          id: t.id,
          label: t.name,
        }))
    );
  }, [sports, selectedTournamentIds]);

  const monthYear = (selectedDate || new Date()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        paddingBottom: 8,
        borderBottomWidth: Spacing[3],
        borderBottomColor: Colors.border,
      }}
    >
      {/* Calendar */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text
          style={{
            fontSize: Typography.size.md,
            textAlign: "center",
            fontFamily: "mediumFont",
          }}
        >
          {monthYear}{" "}
          <Entypo name="chevron-thin-down" size={16} color={Colors.black} />
        </Text>

        {/* <WeekCalendar date={selectedDate} onChange={setSelectedDate} /> */}
        <WeekCalendar
          date={selectedDate}
          onChange={(date) => {
            if (
              selectedDate &&
              date.toDateString() === selectedDate.toDateString()
            ) {
              clearDate();
            } else {
              setSelectedDate(date);
            }
          }}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing[4],
          paddingTop: Spacing[2],
        }}
      >
        {/* Open Filters */}
        <Pressable
          onPress={onPressFilters}
          style={{
            backgroundColor: Colors.primaryLight,
            paddingHorizontal: 14,
            paddingVertical: Spacing[1],
            borderRadius: Radii.pill,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: Typography.size.sm,
              color: Colors.primary,
              marginRight: 4,
            }}
          >
            Filters
          </Text>
          <Image
            source={require("../assets/icons/filter-icon.png")}
            style={{ height: 20, width: 20 }}
            tintColor={Colors.black}
          />
        </Pressable>

        {/* All */}
        {selectedChips.length === 0 && (
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 14,
              paddingVertical: Spacing[1],
              borderRadius: Radii.pill,
            }}
          >
            <Text style={{ fontSize: 13, color: Colors.white }}>All</Text>
          </View>
        )}

        {/* Active filters */}
        {selectedChips.map((chip) => (
          <View
            key={chip.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: Radii.pill,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                fontSize: Typography.size.sm,
                color: Colors.white,
                marginRight: 6,
              }}
            >
              {chip.label}
            </Text>

            <Pressable onPress={() => removeTournament(chip.id)}>
              <Ionicons name="close-circle" size={16} color={Colors.white} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
