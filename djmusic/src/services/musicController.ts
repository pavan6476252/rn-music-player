import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      artwork:'',
      title: 'Make a cup of coffe',
      artist: 'Powfu',
      duration: 40,
    },
  ]);
}
