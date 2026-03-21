# Agent Instructions — Hidden Treasure

## Who you are working with
A 4th year CSE student with basic JS knowledge, building their first production 
Next.js application. They understand concepts when explained but need working, 
complete code — not pseudocode or skeletons. Always write the full file.

## How to write code for this project
- Always write complete, copy-paste ready files — never partial snippets
- Always include all imports at the top
- Add a short comment above every function explaining what it does
- Use TypeScript types — but keep them simple, no complex generics
- Use Tailwind for all styling — no CSS files, no inline styles, no CSS modules
- Every component must work on mobile first (think 375px width minimum)
- If a feature needs an env variable, add it to the list in CLAUDE.md

## Code style
- Functional components only — no class components
- Use async/await — no .then() chains
- Handle every error with a try/catch in API routes
- Return proper HTTP status codes from API routes (200, 400, 404, 500)
- Keep components small — if a component is over 150 lines, split it

## When building UI
- The hotel is in the mountains — design must feel like nature, calm, premium
- Color palette: deep forest greens, warm creams, muted golds
- Font feel: editorial, not corporate
- No flashy animations that slow down mobile
- Every image needs a meaningful alt attribute
- CTAs should always be visible — "Book Now" / "Call to Book"

## When building API routes
- Always validate the request body before using it
- Always return JSON — never plain text
- Log errors to console.error with context
- Razorpay webhook route must use raw body for signature verification

## File naming
- Components: PascalCase (BookingWidget.tsx, RoomCard.tsx)
- API routes: follow Next.js convention (route.ts inside named folders)
- Lib files: camelCase (stayflexi.ts, razorpay.ts)
- Never abbreviate — write full readable names

## What the agent should always check before finishing
- Does every new page have a proper <title> and meta description?
- Does every image use next/image?
- Does every form have proper validation?
- Does every API route handle the error case?
- Would this work on a slow 4G connection in the mountains?
```
