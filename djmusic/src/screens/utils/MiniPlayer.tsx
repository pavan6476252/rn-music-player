import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, { Event, Capability, useTrackPlayerEvents, useProgress ,Track} from 'react-native-track-player';

const MiniPlayer = () => {
  const [trackTitle, setTrackTitle] = useState<string | null>(null);
  const [trackArtist, setTrackArtist] = useState<string | null>(null);
  const [trackArtwork, setTrackArtwork] = useState<string | null>(null);

  const progress = useProgress(); // Get playback progress

  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack) {
        const track = await TrackPlayer.getTrack(currentTrack);
        setTrackInfo(track);
      }
    }

    setupPlayer();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrackInfo(track);
    }
  });

  const setTrackInfo = (track: Track | null) => {
    setTrackTitle(track?.title || 'Unknown Title');
    setTrackArtist(track?.artist || 'Unknown Artist');
    setTrackArtwork(track?.artwork ?? null);
  };

  const playPause = async () => {
    const playbackState = await TrackPlayer.getState();
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  return (
    <TouchableOpacity onPress={playPause}  style={styles.container}>
      {trackArtwork && (
        <Image
          style={styles.trackArtwork}
          source={{ uri: trackArtwork }}
        />
      )}
      <View style={styles.trackInfoContainer}>
        <Text style={styles.trackTitle}>{trackTitle}</Text>
        <Text style={styles.trackArtist}>{trackArtist}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Text style={styles.controlButton}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause}>
          <Text style={styles.controlButton}>Play/Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <Text style={styles.controlButton}>Next</Text>
        </TouchableOpacity>
      </View>
      {/* <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress.position / progress.duration}
        style={styles.progressBar}
      /> */}
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>{formatTime(progress.position)}</Text>
        <Text style={styles.progressText}>{formatTime(progress.duration)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = {
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  trackArtwork: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
  trackInfoContainer: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    flex: 1,
    height: 6,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
  },
};

export default MiniPlayer;
