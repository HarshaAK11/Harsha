import { createSign } from 'node:crypto'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

const encodeBase64Url = (value) => Buffer.from(value)
  .toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')

const createAccessToken = async () => {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env
  const issuedAt = Math.floor(Date.now() / 1000)
  const unsignedToken = [
    encodeBase64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
    encodeBase64Url(JSON.stringify({
      iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: SHEETS_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    })),
  ].join('.')

  const signer = createSign('RSA-SHA256')
  signer.update(unsignedToken)
  signer.end()

  const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  const assertion = `${unsignedToken}.${signer.sign(privateKey, 'base64url')}`
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error('Google authentication failed')
  }

  const { access_token: accessToken } = await tokenResponse.json()
  return accessToken
}

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email)

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : ''
  const question = typeof request.body?.question === 'string' ? request.body.question.trim() : ''

  if (!name || !isValidEmail(email) || !question || name.length > 100 || email.length > 254 || question.length > 5000) {
    return response.status(400).json({ error: 'Please provide a valid name, email, and message.' })
  }

  const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env
  if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.error('Google Sheets environment variables are not configured.')
    return response.status(500).json({ error: 'The contact form is not configured yet.' })
  }

  try {
    const accessToken = await createAccessToken()
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Messages'
    const range = encodeURIComponent(`${sheetName}!A:D`)
    const sheetResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [[new Date().toISOString(), name, email, question]] }),
      },
    )

    if (!sheetResponse.ok) {
      throw new Error('Google Sheets write failed')
    }

    return response.status(201).json({ message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return response.status(500).json({ error: 'Unable to send your message. Please try again later.' })
  }
}
