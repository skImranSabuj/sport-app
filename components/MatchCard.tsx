import React, { memo, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { useCountdown } from "../hooks/useCountDown";
import { Colors, Spacing, Typography } from "../theme";
import { Match } from "../types/match";
import Team from "./Team";

type Props = { match: Match };

function MatchCard({ match }: Props) {
  const countdown = useCountdown(match.startTimeISO);
  const startMs = new Date(match.startTimeISO).getTime();
  const { label: startTime } = useMemo(() => {
    const formatTime = new Date(match.startTimeISO).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const diff = startMs - countdown?.now;
    if (diff <= 0) return { label: "LIVE" };

    return { label: formatTime };
  }, [startMs, countdown?.label]);
  console.log(countdown.label);

  useEffect(() => {
    console.log({ match });
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.card,
        marginHorizontal: Spacing[4],
        marginVertical: Spacing[2],
      }}
    >
      {/* Teams */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: Spacing[2],
        }}
      >
        <Team name={match.homeTeam} logo={match.homeLogo} />

        {/* League & Countdown */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: Typography.size.sm,
              color: Colors.muted,
            }}
          >
            {match.tournamentName}
          </Text>
          <Text
            style={{ fontFamily: "bold-font", fontSize: 24, fontWeight: "700" }}
          >
            {startTime}
          </Text>
          <Text
            style={{
              fontSize: Typography.size.lg,
              color: countdown.type === "live" ? Colors.danger : Colors.black,
            }}
          >
            {countdown.label}
          </Text>
          {/* {match.hasTips && (
            <View
              style={{
                marginTop: 4,
                backgroundColor: "#EAF2FF",
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontSize: 11, color: "#2F6BFF" }}>Tips</Text>
            </View>
          )} */}
        </View>

        <Team name={match.awayTeam} logo={match.awayLogo} />
      </View>
    </View>
  );
}

export default memo(MatchCard);
