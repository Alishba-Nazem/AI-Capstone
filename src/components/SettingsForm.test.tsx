import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SettingsForm } from './SettingsForm'

const initialValues = {
  fullName: 'Taylor Jones',
  email: 'taylor@example.com',
  theme: 'dark',
} as const

describe('SettingsForm', () => {
  it('shows required-field messages and does not submit empty values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SettingsForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Full Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email is required.')).toBeInTheDocument()
    expect(screen.getByText('Theme is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows an error for an invalid email address', async () => {
    const user = userEvent.setup()
    render(<SettingsForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('Full Name'), 'Taylor Jones')
    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.selectOptions(screen.getByLabelText('Theme'), 'light')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument()
  })

  it('submits valid values and shows the saving state', async () => {
    const user = userEvent.setup()
    let finishSaving: (() => void) | undefined
    const onSubmit = vi.fn(
      () => new Promise<void>((resolve) => {
        finishSaving = resolve
      }),
    )
    render(<SettingsForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Full Name'), 'Taylor Jones')
    await user.type(screen.getByLabelText('Email'), 'taylor@example.com')
    await user.selectOptions(screen.getByLabelText('Theme'), 'dark')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith(initialValues)
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled()

    finishSaving?.()
    expect(await screen.findByText('Changes saved')).toBeInTheDocument()
  })

  it('restores the provided default values when reset', async () => {
    const user = userEvent.setup()
    render(<SettingsForm defaultValues={initialValues} onSubmit={vi.fn()} />)

    await user.clear(screen.getByLabelText('Full Name'))
    await user.type(screen.getByLabelText('Full Name'), 'Changed Name')
    await user.clear(screen.getByLabelText('Email'))
    await user.type(screen.getByLabelText('Email'), 'changed@example.com')
    await user.selectOptions(screen.getByLabelText('Theme'), 'light')
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByLabelText('Full Name')).toHaveValue(initialValues.fullName)
    expect(screen.getByLabelText('Email')).toHaveValue(initialValues.email)
    expect(screen.getByLabelText('Theme')).toHaveValue(initialValues.theme)
  })
})
