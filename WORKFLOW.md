# AI Development Workflow Comparison

## Round One: Vague Prompt

For the first round, I used the intentionally vague prompt: “Build a settings form in React.” The AI generated a functional settings form with validation, save/reset behavior, theme selection, responsive styling, and accessible error feedback. It also verified the implementation with a production build and tests.

However, the vague prompt did not explicitly require dedicated component tests or a structured validation architecture. The implementation was therefore more dependent on the AI's assumptions.

## Round Two: Precise Prompt

For the second round, I used a detailed prompt with file references, specific fields, validation rules, accessibility requirements, responsive behavior, constraints, and a verification loop. The AI first explored the project and planned the implementation, then coded, tested, built, and reviewed the result.

The precise workflow added a dedicated `SettingsForm.test.tsx` with tests for required fields, invalid email, valid submission, saving state, and reset behavior. It also improved the validation structure through `settingsSchema.ts` and added accessibility improvements such as `aria-labelledby`.

## Comparison

The precise workflow required more upfront prompting but reduced review effort because the requirements and verification steps were explicit. The vague version produced a working UI quickly, but more assumptions were left to the AI.

Correctness improved because the precise version included explicit validation and automated tests. Accessibility also received more deliberate attention. Edge cases such as empty fields, invalid email, reset behavior, and saving state were explicitly tested.

One AI weakness I caught was that the vague round produced a functional form but did not include dedicated component tests for the required behaviors. The precise prompt addressed this by explicitly requiring tests and verification.

Overall, the precise workflow was more reliable and easier to review. The main lesson is that better specifications, constraints, and verification instructions produce more predictable AI-assisted development results.