import { z } from 'zod'

export const themeOptions = ['light', 'dark'] as const

export const settingsFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full Name is required.')
    .min(2, 'Full Name must be at least 2 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .pipe(z.email('Enter a valid email address.')),
  theme: z
    .string()
    .min(1, 'Theme is required.')
    .refine((value) => themeOptions.includes(value as (typeof themeOptions)[number]), 'Select a theme.'),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

export const defaultSettingsFormValues: SettingsFormValues = {
  fullName: '',
  email: '',
  theme: '',
}
