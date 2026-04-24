Build this coding test incrementally. Do not over-engineer. Keep code TypeScript-first, readable, and runnable on Node 18+.

## Phase 1 — Backend endpoint foundation

Goal: Add the required NestJS endpoint.

Tasks:

- Create a `comms` module if one does not already exist.

- Add:

  - `src/comms/comms.controller.ts`

  - `src/comms/comms.service.ts`

  - `src/comms/comms.module.ts`

- Register `CommsModule` in `AppModule`.

- Implement endpoint:

GET `/comms/your-next-delivery/:userId`

For now, return a hardcoded placeholder response with this shape:

{

  title: string;

  message: string;

  totalPrice: number;

  freeGift: boolean;

}

Acceptance criteria:

- `yarn start` runs successfully.

- Visiting `/comms/your-next-delivery/test-id` returns JSON.

---

## Phase 2 — Load and type user data

Goal: Read from the provided `data.json`.

Tasks:

- Locate existing `data.json`.

- Create TypeScript interfaces/types:

  - `User`

  - `Cat`

  - `PouchSize`

  - `NextDeliveryResponse`

- Load data from `data.json`.

- In the service, find a user by `id`.

- If user is not found, throw NestJS `NotFoundException`.

Acceptance criteria:

- Existing user IDs return data-derived responses.

- Unknown user IDs return 404.

---

## Phase 3 — Business logic helpers

Goal: Implement core domain logic as pure helper functions.

Create helper functions, preferably in `src/comms/comms.utils.ts`:

1. `getActiveCats(cats)`

- Returns only cats where `subscriptionActive === true`.

2. `formatCatNames(names)`

- One cat: `A`

- Two cats: `A and B`

- Three or more: `A, B and C`

3. `calculateTotalPrice(cats)`

- Uses active cats only.

- Pouch prices:

  - A: 55.50

  - B: 59.50

  - C: 62.75

  - D: 66.00

  - E: 69.00

  - F: 71.25

Acceptance criteria:

- Inactive cats are excluded.

- Cat names are grammatically correct.

- Price is calculated from active cats only.

---

## Phase 4 — Final backend response

Goal: Return the exact required payload.

Response format:

{

  "title": "Your next delivery for <catNames>",

  "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <catNames>'s fresh food.",

  "totalPrice": <calculated total>,

  "freeGift": <true if totalPrice > 120>

}

Tasks:

- Use only active cats for names and price.

- Round/normalise `totalPrice` to two decimal places as a number.

- Set `freeGift` to true only when `totalPrice > 120`.

- Add a sensible handling path for users with no active cats. Prefer returning a valid response with empty/alternative wording, and document the assumption.

Acceptance criteria:

- The example user from the README returns:

  - title: `Your next delivery for Dorian and Ocie`

  - totalPrice: `134`

  - freeGift: `true`

---

## Phase 5 — Minimal tests

Goal: Add useful tests without overbuilding.

Tasks:

- Add unit tests for:

  - `formatCatNames`

  - `calculateTotalPrice`

  - inactive cats excluded from pricing

  - `freeGift` threshold behaviour

- Keep tests small and focused.

Acceptance criteria:

- Tests pass.

- Tests cover the most error-prone business logic.

---

## Phase 6 — Frontend setup

Goal: Create a simple React frontend page.

Tasks:

- Create a frontend using a lightweight React setup, preferably Vite or Next.js.

- Add route/page:

`/welcome/:userId`

- Fetch backend endpoint:

`/comms/your-next-delivery/:userId`

- Display:

  - title

  - message

  - total price

  - free gift indicator if `freeGift === true`

  - a random cat image

Acceptance criteria:

- Page loads for a valid user ID.

- Loading state appears while fetching.

- Error state appears if the request fails.

---

## Phase 7 — Frontend styling

Goal: Make the page visually close enough to the supplied Figma without chasing pixel perfection.

Tasks:

- Create a friendly card-style layout.

- Add cat image.

- Use warm colours, rounded corners, spacing, and clear hierarchy.

- Make it responsive enough for mobile and desktop.

- Keep CSS simple.

Acceptance criteria:

- Looks intentional and polished.

- Clearly displays the personalised message.

- Does not require exact font/spacing match.

---

## Phase 8 — README / submission polish

Goal: Make the submission easy to assess.

Tasks:

- Update README with:

  - How to run backend

  - How to run frontend

  - Example user ID to test

  - Assumptions made

  - What I would improve with more time

- Mention no database/auth/containerisation was added because the brief explicitly said not to.

- Add a short comment on the test, e.g.:

“I liked that the task is small enough to complete in a timebox while still revealing practical judgement around data modelling, formatting, edge cases, and API/frontend integration. One improvement could be clarifying expected behaviour for users with no active cat subscriptions.”

Acceptance criteria:

- Reviewer can run the app without guessing.

- Scope and tradeoffs are clear.