import React, { useEffect, useState } from 'react';
import { View, Image, ImageRequireSource, StyleSheet } from 'react-native';

type Props = {
  images: ImageRequireSource[]; // require(...) 배열
  isActive?: boolean;           // 포커스 여부 (기본 true)
};

const INTERVAL_MS = 3000;       // 3초 고정
const ASPECT = 1080 / 1210;     // 가로/세로 비율

export default function TimedImageViewer({ images, isActive = true }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive || images.length <= 1) return;   // 포커스 아닐 때/한 장뿐이면 타이머 미가동
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length); // 무한 루프
    }, INTERVAL_MS);
    return () => clearInterval(id);                 // 포커스 변경/언마운트 시 정리
  }, [isActive, images.length]);

  const source = images[index] ?? null;

  return (
    <View style={[styles.container, styles.aspect]}>
      {source && (
        <Image
          source={source}
          style={styles.image}
          resizeMode="contain" // 가로 100% + 세로 비율 유지, 크롭 없음
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  aspect: {
    aspectRatio: ASPECT, // 세로 자동 계산
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
