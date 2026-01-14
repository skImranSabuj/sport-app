import { addDays, format, getDate, isSameDay, startOfWeek } from "date-fns";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Radii, Spacing, Typography } from "../theme";

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};

const WeekCalendar: React.FC<Props> = ({ date, onChange }) => {
  const week = useMemo(() => getWeekDays(date), [date]);

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const isSelected = isSameDay(weekDay.date, date);

        return (
          <View key={weekDay.formatted} style={styles.weekDayItem}>
            <Text style={styles.weekDayText}>{weekDay.formatted}</Text>

            <TouchableOpacity
              onPress={() => onChange(weekDay.date)}
              style={[styles.touchable, isSelected && styles.selectedTouchable]}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, isSelected && styles.selectedLabel]}>
                {weekDay.day}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing[2],
  },

  weekDayItem: {
    alignItems: "center",
    flex: 1,
  },

  weekDayText: {
    color: "gray",
    marginBottom: 5,
    fontSize: Typography.size.xs,
  },

  touchable: {
    height: Spacing[7],
    width: Spacing[7],
    borderRadius: Radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedTouchable: {
    backgroundColor: Colors.primary,
  },

  label: {
    fontSize: Typography.size.xs,
    color: Colors.black,
    textAlign: "center",
  },

  selectedLabel: {
    color: Colors.white,
  },
});

type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export const getWeekDays = (date: Date): WeekDay[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 });

  return Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(start, i);
    return {
      formatted: format(d, "EEE"),
      date: d,
      day: getDate(d),
    };
  });
};

export default WeekCalendar;
