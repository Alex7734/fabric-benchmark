import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, StyleSheet, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

const CHUNK_SIZE = 100000;

export const MemoryAllocator = ({ size, onBack }: { size: number; onBack: () => void }) => {
  const [allocated, setAllocated] = useState<number>(0);
  const [memoryBlocks, setMemoryBlocks] = useState<number[][]>([]); 

  useEffect(() => {
    const allocateMemory = async () => {
      for (let i = 0; i < size; i += CHUNK_SIZE) {
        await new Promise(resolve => setTimeout(resolve, 200));

        const newBlock = Array.from({ length: CHUNK_SIZE }, () => Math.random());
        setMemoryBlocks(prevBlocks => [...prevBlocks, newBlock]);

        setAllocated(prev => Math.min(prev + CHUNK_SIZE, size));
      }
    };

    allocateMemory();
  }, [size]);

  const progress = Math.floor((allocated / size) * 100);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.progress}>
        Allocated memory: {allocated.toLocaleString()} / {size.toLocaleString()} items
      </Text>
      <ProgressBar progress={progress} />
      <View style={styles.animationBox}>
        <Text style={styles.animationText}>📦</Text>
      </View>
      <Button title="BACK" onPress={onBack} accessibilityLabel="BACK_BUTTON" />
    </ScrollView>
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
  animationBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  animationText: {
    fontSize: 50,
  },
});
