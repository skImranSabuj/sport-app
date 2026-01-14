import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFilters } from "../store/filters";
import { Colors, Radii, Spacing, Typography } from "../theme";
import { Sport } from "../types/sports";

type Props = {
  sport: Sport;
};

export default function SportAccordion({ sport }: Props) {
  const [expanded, setExpanded] = useState(false);

  const {
    draftSelectedTournamentIds,
    draftSportSearch,
    toggleDraftTournament,
    setDraftSportSearch,
  } = useFilters();

  // Parent sport is selected if any of its tournaments are selected
  const isSportSelected = sport.tournaments.some((t) =>
    draftSelectedTournamentIds.includes(t.id)
  );

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: Radii.md,
        marginBottom: Spacing[3],
      }}
    >
      {/* Header */}
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: Spacing[3],
        }}
      >
        {/* Chevron / Expand icon on the left */}
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.black}
          style={{ marginRight: Spacing[2] }}
        />

        <Text style={{ fontSize: Typography.size.md, flex: 1 }}>
          {sport.sportName}
        </Text>
        {/* Parent Checkbox */}
        <Ionicons
          name={isSportSelected ? "checkbox" : "checkbox-outline"}
          size={18}
          color={isSportSelected ? Colors.success : Colors.muted}
          style={{ marginRight: Spacing[2] }}
        />
      </Pressable>

      {/* Expanded */}
      {expanded && (
        <View style={{ paddingHorizontal: Spacing[3] }}>
          <TextInput
            placeholder="Search leagues"
            value={draftSportSearch[sport.id] ?? ""}
            onChangeText={(text) => setDraftSportSearch(sport.id, text)}
            style={{
              backgroundColor: Colors.white,
              borderRadius: Radii.sm,
              padding: Spacing[3],
              marginBottom: Spacing[4],
            }}
          />

          {sport.tournaments.map((league) => {
            const selected = draftSelectedTournamentIds.includes(league.id);

            return (
              <Pressable
                onPress={() => toggleDraftTournament(league.id)}
                key={league.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: Spacing[3],
                }}
              >
                <Text style={{ fontSize: Typography.size.sm }}>
                  {league.name}
                </Text>

                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={18}
                  color={selected ? Colors.primary : Colors.muted}
                />
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
