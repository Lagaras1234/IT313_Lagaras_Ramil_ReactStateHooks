
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// 1. PracticeTracker component
type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Practice Tracker</Text>
      <Text style={styles.counter}>Solved: {solved}</Text>

      <View style={styles.button}>
        <Button title="Solve +1" onPress={onSolve} />
      </View>

      <View style={styles.button}>
        <Button title="Reset" onPress={onReset} />
      </View>

      {solved >= 5 && (
        <Text style={styles.success}>Great job!</Text>
      )}
    </View>
  );
}

// 2. Custom stopwatch hook
function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    // Cleanup: stop the interval when paused or unmounted.
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return seconds;
}

// 3. Stopwatch component
type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Lab Stopwatch</Text>
      <Text style={styles.timer}>{formattedTime}</Text>
      <Text style={styles.status}>
        {isRunning ? 'Running…' : 'Paused'}
      </Text>
    </View>
  );
}

// 4. Parent component owns the shared state
export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lab Timer & Practice Tracker</Text>

      <PracticeTracker
        solved={solved}
        onSolve={() => setSolved((s) => s + 1)}
        onReset={() => setSolved(0)}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.card}>
        <Text style={styles.heading}>Timer Controls</Text>

        <View style={styles.button}>
          <Button
            title="Start"
            onPress={() => setIsRunning(true)}
            disabled={isRunning}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Stop"
            onPress={() => setIsRunning(false)}
            disabled={!isRunning}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#17324D',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#17324D',
  },
  counter: {
    fontSize: 22,
    marginBottom: 12,
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: '#0D9488',
  },
  status: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  success: {
    color: '#15803D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginVertical: 4,
  },
});