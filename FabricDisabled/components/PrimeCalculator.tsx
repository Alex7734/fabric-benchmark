import React, { useState, useEffect } from 'react';
import { FlatList, Text, Button, StyleSheet, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

export const PrimeCalculator = ({ limit, onBack }: { limit: number; onBack: () => void }) => {
  const [primes, setPrimes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculatePrimes = async () => {
      const calculatedPrimes: number[] = [];
      let num = 2;

      const computeChunk = () => {
        const chunkSize = 500;
        for (let i = 0; i < chunkSize && num <= limit; i++, num++) {
          let isPrime = true;
          for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
            if (num % divisor === 0) {
              isPrime = false;
              break;
            }
          }
          if (isPrime) calculatedPrimes.push(num);
        }

        setPrimes([...calculatedPrimes].reverse());
        setProgress(Math.floor((num / limit) * 100));

        if (num <= limit) {
          setTimeout(computeChunk, 0);
        }
      };

      computeChunk();
    };

    calculatePrimes();
  }, [limit]);

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Progress: {progress}%</Text>
      <ProgressBar progress={progress} />
      <Text style={styles.title}>Prime Numbers:</Text>
      <FlatList
        data={primes}
        renderItem={({ item }) => (
          <View style={styles.primeContainer}>
            <Text style={styles.prime}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.list}
      />
      <Button title="BACK" onPress={onBack} accessibilityLabel="BACK_BUTTON" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  progress: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingVertical: 10,
  },
  primeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  prime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
