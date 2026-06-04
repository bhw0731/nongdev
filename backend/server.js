import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

const app = express()
app.use(cors({ origin: CLIENT_ORIGIN }))
app.use(express.json())

// 헬스체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// 문의는 전부 채널톡 채팅으로 받습니다. (별도 문의 폼/엔드포인트 없음)

// 프로덕션: 프론트엔드 빌드 결과물(frontend/dist) 정적 서빙 + SPA 폴백
const distPath = path.resolve(__dirname, '../frontend/dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send(
      '백엔드 실행 중입니다. 프론트는 frontend 폴더에서 `npm run dev` 로 띄우세요. (배포 시 `npm run build` 후 이 서버가 dist 를 서빙합니다.)',
    )
  })
}

app.listen(PORT, () => {
  console.log(`백엔드 서버 실행: http://localhost:${PORT}`)
})
