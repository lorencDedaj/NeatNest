import { useState, useEffect } from 'react'
import api from './services/api'
import './App.css'

function App() {
  const [serverStatus, setServerStatus] = useState('Connecting...')
  const [serverData, setServerData] = useState(null)

  // Test server connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/health')
        setServerStatus('✅ Connected')
        setServerData(response.data)
      } catch (error) {
        setServerStatus('❌ Connection Failed')
        console.error('Server connection error:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          NeatNest Kafka
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">🎨 Frontend Status</h3>
            <p className="text-green-600">✅ React + Vite Running</p>
            <p className="text-sm text-gray-600">Port: 3000</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">🔧 Backend Status</h3>
            <p className={serverStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {serverStatus}
            </p>
            <p className="text-sm text-gray-600">Port: 8000</p>
          </div>

          {serverData && (
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-semibold">📡 Server Response</h3>
              <pre className="text-sm text-gray-600 mt-2">
                {JSON.stringify(serverData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

