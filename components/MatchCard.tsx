import React, { memo, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { useNowTick } from '../hooks/useNowTick';
import { Match } from '../types/match';
import { formatCountdown } from '../utils/datetime';

type Props = { match: Match };

function MatchCard({ match }: Props) {
  const now = useNowTick(1000);
  const startMs = new Date(match.startTimeISO).getTime();

  const { label: startTime } = useMemo(() => {
    const formatTime = new Date(match.startTimeISO).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const diff = startMs - now;
    if (diff <= 0) return { label: 'LIVE' };

    return { label: formatTime };
  }, [startMs, now]);

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#EEE',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginVertical: 6,
      }}
    >
      {/* League */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '600',
          color: '#777',
          marginBottom: 6,
        }}
      >
        {match.sportName}
      </Text>

      {/* Teams row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Home */}
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Image
            source={{ uri: match.homeLogo }}
            style={{ width: 36, height: 36, marginBottom: 4 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 13, textAlign: 'center' }}>
            {match.homeTeam}
          </Text>
        </View>

        {/* Time */}
        <View style={{ alignItems: 'center', width: 80 }}>
          <Text style={{ fontFamily: 'bold-font', fontSize: 20, fontWeight:'700' }}>
            {startTime}
          </Text>

          {match.hasTips && (
            <View
              style={{
                marginTop: 4,
                backgroundColor: '#EAF2FF',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontSize: 11, color: '#2F6BFF' }}>Tips</Text>
            </View>
          )}
        </View>

        {/* Away */}
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Image
            source={{ uri: match.awayLogo }}
            style={{ width: 36, height: 36, marginBottom: 4 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 13, textAlign: 'center' }}>
            {match.awayTeam}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(MatchCard);
