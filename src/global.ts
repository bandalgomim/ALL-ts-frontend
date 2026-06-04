import { Dimensions } from 'react-native';

// global.js
export const colors = {
    primary: '#30397A',
    secondory: '#CECECE',
    text: '#000000',
    background: '#30397A',
    placeholder: '#919191',
    border: '#d9d9d9',
    icon: '#222222',
  };

export const { width, height } = Dimensions.get('window');

// 피그마 기준 사이즈 (아이폰 15 Pro)
const FIGMA_WIDTH = 393;
const FIGMA_HEIGHT = 852;

// 피그마 값을 그대로 넣으면 현재 기기 화면에 맞게 변환
export const sw = (size: number) => (width / FIGMA_WIDTH) * size;   // 가로 기준 스케일
export const sh = (size: number) => (height / FIGMA_HEIGHT) * size; // 세로 기준 스케일

// 폰트/아이콘 등 가로 기준으로 균일하게 스케일 (일반적으로 가장 많이 사용)
export const ss = (size: number) => sw(size);

// SVG 도형 크기 (피그마 기준)
export const SCORE_SMALL_W = 26;
export const SCORE_SMALL_H = 37;

export const LOGO_SMALL_W = 37;
export const LOGO_SMALL_H = 37;
export const LOGO_MIDDLE_W = 57;
export const LOGO_MIDDLE_H = 57;
export const LOGO_BIG_W = 90;
export const LOGO_BIG_H = 90;

export const MATCH_BAR_W = 363;
export const MATCH_BAR_H = 56;

export const domain = 'https://all-ts-backend-production.up.railway.app/';