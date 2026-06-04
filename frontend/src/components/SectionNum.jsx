// 섹션 모서리에 거대한 흐릿한 모노 숫자 워터마크를 띄워 시각 리듬을 잡습니다.
export default function SectionNum({ num, position = 'tl' }) {
  return (
    <span
      className={`section-num section-num--${position} mono`}
      aria-hidden="true"
    >
      {num}
    </span>
  )
}
