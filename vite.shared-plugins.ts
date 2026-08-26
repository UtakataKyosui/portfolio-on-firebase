import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';

// vite.config.ts と vitest.config.ts の両方が使うプラグイン構成をここに集約する。
// 個別に複製すると設定がドリフトし、build と test で異なるモジュール変換
// パイプラインを使うことになる。
export function sharedPlugins() {
  return [tanstackStart(), react({ compiler: true }), tailwindcss()];
}
