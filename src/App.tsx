import { SettingsForm } from './components/SettingsForm'
import type { SettingsFormValues } from './schemas/settingsSchema'
import './App.css'

function App() {
  async function handleSaveSettings(values: SettingsFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('Saved settings:', values)
  }

  return (
    <main className="app">
      <SettingsForm onSubmit={handleSaveSettings} />
    </main>
  )
}

export default App
