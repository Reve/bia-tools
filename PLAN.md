# Blockchain & SHA Learning Tools Plan

## Audience & Goals
- Audience: complete beginners with no prior blockchain or cryptography knowledge.
- Goals:
  - Explain what a cryptographic hash is (focus on SHA-256).
  - Demonstrate hash properties (deterministic, fixed length, avalanche effect).
  - Show how blocks link via hashes to create blockchain immutability.
  - Provide hands-on, interactive, browser-only learning tools.


## Delivery Constraints
- Must run offline (no server requirement) once the static files are delivered.
- JavaScript runs directly in the browser.
- Interactive, descriptive, and easy to follow for trainees.
- UI/UX should feel modern and academic (clean typography, clear structure, minimal distractions).


## Framework Variants (at least 3 options)
### Option A: Vanilla JS + Web Components
- **Why:** Maximum portability and minimal tooling; no framework runtime required.
- **Pros:** Simple deployment, easy offline use, no dependencies.
- **Cons:** More manual state management and UI composition.
- **Best for:** Small footprint, long-term maintenance without tooling.


### Option B: Svelte (compiled to static assets)
- **Why:** Small bundles, simple reactivity, and clean component model.
- **Pros:** Minimal runtime, easy to build interactive demos.
- **Cons:** Requires build step to generate static assets.
- **Best for:** Polished interactive experiences with manageable complexity.


### Option C: React + Vite (static build)
- **Why:** Strong ecosystem and familiar patterns.
- **Pros:** Rich component ecosystem, easy state management patterns.
- **Cons:** Larger runtime than Svelte or vanilla; still requires build step.
- **Best for:** Teams already comfortable with React and tooling.


### Option D: Vue + Vite (static build)
- **Why:** Template-based approach with gentle learning curve.
- **Pros:** Simple templating, good official tooling, small bundles.
- **Cons:** Requires build step, another runtime dependency.
- **Best for:** Clear template-driven UI and quick iteration.


## Recommended Approach
- **Primary recommendation:** Svelte for clean, modern, academic UI with a small runtime and great interactive ergonomics.
- **Rationale:** Svelte keeps the UI expressive and interactive while compiling to static assets that run offline without a server.
- **Fallback:** Vanilla JS + Web Components if you want zero build tooling and maximum portability.


## Content Modules & Interactions
### Module 1: SHA Basics
- Explain hash functions in plain language.
- Interactive input to generate SHA-256 output.
- Avalanche effect toggle: highlight changed bits/characters.
- “Try it” tasks with guided prompts.


### Module 2: Block Anatomy
- Visual block card with fields: data, nonce, previous hash, current hash.
- Live hash update as data changes.
- Explain how a block hash is constructed.


### Module 3: Blockchain Integrity
- 3–5 block chain view.
- Tamper with a block to show invalidation cascade.
- Visual indicators: valid/invalid badges, chain link highlights.


### Module 4: Proof of Work (Lightweight)
- Simple nonce search with adjustable difficulty.
- Time-limited demo to avoid heavy CPU use.
- Explain why difficulty makes tampering expensive.


## UX/UI Principles (Modern, Academic)
- Clean grid-based layout with generous whitespace.
- Academic typography (e.g., Inter or Source Sans Pro).
- Minimal color palette with semantic highlights for validity states.
- Step-by-step flow with progress indicators.
- Glossary popovers for key terms (hash, nonce, immutability).


## Implementation Tasks (Backlog)
### Phase 1 — Planning & Content
1. Draft module scripts and learning objectives per module.
2. Define glossary terms and academic tone style guide.
3. Create a visual style guide (colors, typography, spacing).


### Phase 2 — Prototype
4. Build the SHA Explorer demo with live hashing.
5. Add avalanche effect comparison view.
6. Validate with internal review for clarity.


### Phase 3 — Core Modules
7. Implement Block Anatomy module with live hash updates.
8. Implement Blockchain Integrity module with validity cascade.
9. Add guided tasks and inline hints for each module.


### Phase 4 — Polish & Accessibility
10. Add keyboard navigation and ARIA labels.
11. Improve layout responsiveness for tablet and desktop.
12. Add gentle animations for state changes.


### Phase 5 — QA & Release
13. Run usability testing with trainees.
14. Collect feedback and iterate on explanations.
15. Finalize static build output and hosting instructions.

#### Phase 5 Artifacts (This Repo)
- QA checklist: `QA_RELEASE_CHECKLIST.md`.
- Usability feedback template: `FEEDBACK_LOG.md`.
- Hosting instructions: `README.md`.


## Svelte Implementation Outline
### Project Structure
- `src/`: Svelte components and core logic.
  - `modules/`: Module components for SHA Basics, Block Anatomy, Blockchain Integrity, Proof of Work.
  - `components/`: Reusable UI elements (cards, inputs, badges, glossary popovers).
  - `lib/`: Hash utilities, formatting helpers, and sample data.
- `public/`: Static assets, fonts, and offline-ready resources.


### Core Components
1. `ShaExplorer.svelte`: Live input + SHA-256 output with avalanche comparison.
2. `BlockCard.svelte`: Editable block fields with computed hash.
3. `ChainView.svelte`: Multiple blocks with validity cascade and visual links.
4. `ProofOfWork.svelte`: Nonce search demo with adjustable difficulty and timeout.
5. `GlossaryTooltip.svelte`: Academic definitions accessible inline.


### Offline & Static Build
- Use Svelte with Vite to compile to static assets.
- Bundle fonts locally for offline use.
- Ensure all module examples run without network calls.


### Svelte-Specific Tasks
1. Scaffold the Svelte project with Vite and set up build scripts.
2. Build the shared layout and academic design system.
3. Implement Module 1 and verify SHA-256 hashing via Web Crypto API.
4. Implement Module 2 and Module 3 with shared block/chain logic.
5. Implement Module 4 with a controlled proof-of-work loop.
6. Add accessibility labels and keyboard navigation across components.
7. Produce a static build and validate offline execution.


## Acceptance Criteria
- A trainee can explain SHA properties in simple words.
- A trainee can demonstrate why changing one block invalidates the chain.
- The tools run entirely offline in a browser.
- The UI feels modern and academic with a clear, guided flow.
