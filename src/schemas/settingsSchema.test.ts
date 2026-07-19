import { describe, expect, it } from 'vitest'
import { settingsFormSchema } from './settingsSchema'

function fieldErrors(values: unknown) {
  const result = settingsFormSchema.safeParse(values)

  if (result.success) {
    return {}
  }

  return result.error.flatten().fieldErrors
}

describe('settingsFormSchema', () => {
  it('accepts valid values', () => {
    const result = settingsFormSchema.safeParse({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      theme: 'dark',
    })

    expect(result.success).toBe(true)
  })

  it('trims whitespace from name and email', () => {
    const result = settingsFormSchema.safeParse({
      name: '  Alex  ',
      email: '  alex@example.com  ',
      theme: 'light',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Alex',
        email: 'alex@example.com',
        theme: 'light',
      })
    }
  })

  it('requires name', () => {
    const errors = fieldErrors({
      name: '',
      email: 'alex@example.com',
      theme: 'light',
    })

    expect(errors.name).toContain('Name is required.')
  })

  it('rejects whitespace-only name', () => {
    const errors = fieldErrors({
      name: '   ',
      email: 'alex@example.com',
      theme: 'light',
    })

    expect(errors.name).toContain('Name is required.')
  })

  it('requires email', () => {
    const errors = fieldErrors({
      name: 'Alex',
      email: '',
      theme: 'light',
    })

    expect(errors.email).toContain('Email is required.')
  })

  it('rejects invalid email', () => {
    const errors = fieldErrors({
      name: 'Alex',
      email: 'not-an-email',
      theme: 'light',
    })

    expect(errors.email).toContain('Enter a valid email address.')
  })

  it('requires a supported theme', () => {
    const errors = fieldErrors({
      name: 'Alex',
      email: 'alex@example.com',
      theme: 'system',
    })

    expect(errors.theme?.length).toBeGreaterThan(0)
  })
})
