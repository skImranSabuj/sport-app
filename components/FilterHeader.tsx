import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import WeekCalendar from "./WeekCalendar";

type Props = {
  onPressFilters: () => void;
};

export default function FilterHeader({ onPressFilters }: Props) {
  const [date, setDate] = useState(new Date());

  // Format month + year from state
  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <View style={{ backgroundColor: "#FFF", paddingBottom: 8 }}>
      {/* Calendar row (simplified for now) */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}>
          {monthYear}{" "}
          <Entypo name="chevron-thin-down" size={18} color="black" />
        </Text>
        <WeekCalendar date={date} onChange={(newDate) => setDate(newDate)} />
      </View>

      {/* Filters row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
      >
        <Pressable
          onPress={onPressFilters}
          style={{
            backgroundColor: "#EEF1FF",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 18,
            marginRight: 8,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#3B4CCA" }}>
            Filters{" "}
            <MaterialCommunityIcons
              name="filter-variant"
              size={18}
              color="black"
            />
          </Text>
        </Pressable>

        {["All", "Australian Rules", "Rugby League"].map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: "blue",
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 18,
              marginRight: 8,
            }}
          >
            <Text style={{ fontSize: 13, color: "white" }}>
              {item} <Ionicons name="close-circle" size={16} color="white" />
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
