import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

// 한글(현대/자모) 범위: AC00–D7A3, 1100–11FF, 3130–318F
const RE = /([\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+)/g;

type Props = TextProps & {
  text: string;
  koreanFont: string;   // 예: 'Pretendard' or custom
  englishFont: string;  // 예: 'SFProDisplay' or custom Latin
};

const MultiFontText = memo(({ text, koreanFont, englishFont, style, ...rest }: Props) => {
  const parts = text.split(RE); // [영문/기타, 한글, 영문/기타, 한글, ...]
  return (
    <Text style={style} {...rest}>
      {parts.map((chunk, i) => {
        const isKorean = RE.test(chunk);
        // test의 lastIndex 문제 방지 위해 매번 reset
        RE.lastIndex = 0;
        return (
          <Text
            key={i}
            style={{ fontFamily: isKorean ? koreanFont : englishFont }}
          >
            {chunk}
          </Text>
        );
      })}
    </Text>
  );
});