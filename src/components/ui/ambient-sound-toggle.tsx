import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      // Start ambient sound
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Low frequency hum
      oscillatorRef.current.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
      oscillatorRef.current.type = 'sine';

      gainNodeRef.current.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);

      oscillatorRef.current.start();
      setIsPlaying(true);
    } else {
      // Stop sound
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110"
    >
      {isPlaying ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle ambient sound</span>
    </Button>
  );
}
