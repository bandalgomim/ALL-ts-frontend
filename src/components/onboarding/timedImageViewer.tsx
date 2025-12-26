import React, { useEffect, useState } from 'react';
import { View, Image, ImageRequireSource, StyleSheet } from 'react-native';
import { height, width } from '@/global';

type Props = {
  images: ImageRequireSource[];
  isActive?: boolean;
};

const INTERVAL_MS = 1100;

export default function TimedImageViewer({ images, isActive = true }: Props) {
  const [index, setIndex] = useState(0);

  // ✅ 슬라이드가 바뀌면 첫 이미지부터
  useEffect(() => {
    setIndex(0);
  }, [images]);
  useEffect(() => {
    if (isActive) {setIndex(0);}
  }, [isActive]);

  // ✅ 타이머는 isActive/이미지 세트 변경마다 재시작
  useEffect(() => {
    if (!isActive || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isActive, images]); // ← images.length가 아니라 images 자체를 의존

  const source = images[index] ?? null;

  return (
    <View style={[styles.container]}>
      {source && (
        <Image
          source={source}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.05,
    width: width,
    height: height * 0.9,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
