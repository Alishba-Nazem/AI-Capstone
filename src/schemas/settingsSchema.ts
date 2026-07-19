import { z } from 'zod'

export const themeOptions = ['light', 'dark'] as const

export const settingsFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .pipe(z.email('Enter a valid email address.')),
  theme: z.enum(themeOptions, {
    error: 'Select a theme.',
  }),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

export const defaultSettingsFormValues: SettingsFormValues = {
  name: '',
  email: '',
  theme: 'light',
}
