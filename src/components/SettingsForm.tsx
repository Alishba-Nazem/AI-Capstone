import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  defaultSettingsFormValues,
  settingsFormSchema,
  themeOptions,
  type SettingsFormValues,
} from '../schemas/settingsSchema'
import { FormField, SelectInput, TextInput } from './ui/FormField'
import './SettingsForm.css'

export interface SettingsFormProps {
  defaultValues?: SettingsFormValues
  onSubmit: (values: SettingsFormValues) => Promise<void> | void
}

type SaveStatus = 'idle' | 'saved'

export function SettingsForm({
  defaultValues = defaultSettingsFormValues,
  onSubmit,
}: SettingsFormProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>({
    defaultValues,
    resolver: zodResolver(settingsFormSchema),
    mode: 'onBlur',
  })

  async function handleSave(values: SettingsFormValues) {
    setSaveStatus('idle')
    await onSubmit(values)
    setSaveStatus('saved')
  }

  function handleReset() {
    reset(defaultValues)
    setSaveStatus('idle')
  }

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit(handleSave)}
      noValidate
      aria-labelledby="settings-form-heading"
    >
      <header className="settings-form__header">
        <div>
          <p className="settings-form__eyebrow">Account</p>
          <h1 id="settings-form-heading">Settings</h1>
          <p className="settings-form__subtitle">
            Update your profile name, email, and theme preference.
          </p>
        </div>
        {saveStatus === 'saved' ? (
          <p className="settings-form__status" role="status">
            Changes saved
          </p>
        ) : null}
      </header>

      <section className="settings-section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>
        <div className="settings-grid">
          <FormField id="name" label="Name" error={errors.name?.message}>
            <TextInput
              id="name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
          </FormField>

          <FormField id="email" label="Email" error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
          </FormField>

          <FormField id="theme" label="Theme" error={errors.theme?.message}>
            <SelectInput
              id="theme"
              aria-invalid={errors.theme ? true : undefined}
              aria-describedby={errors.theme ? 'theme-error' : undefined}
              {...register('theme')}
            >
              {themeOptions.map((theme) => (
                <option key={theme} value={theme}>
                  {theme === 'light' ? 'Light' : 'Dark'}
                </option>
              ))}
            </SelectInput>
          </FormField>
        </div>
      </section>

      <footer className="settings-form__actions">
        <button type="button" className="button button--secondary" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </footer>
    </form>
  )
}
