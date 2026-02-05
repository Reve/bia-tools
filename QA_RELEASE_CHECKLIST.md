# Phase 5 QA & Release Checklist

Use this checklist to complete Phase 5 (QA & Release) before delivery.


## Usability Testing (Trainees)
- [ ] Recruit 3–5 trainees who are new to blockchain concepts.
- [ ] Provide a 10–15 minute session and observe their navigation.
- [ ] Ask trainees to complete at least one prompt per module.
- [ ] Capture any confusion points, unclear labels, or missing context.
- [ ] Ask trainees to summarize: "What is a hash?" and "Why does tampering break the chain?"


## Feedback Collection
- [ ] Record all observations in `FEEDBACK_LOG.md`.
- [ ] Tag feedback by module (SHA Basics, Block Anatomy, Blockchain Integrity, Proof of Work).
- [ ] Assign a severity level (Minor, Moderate, Critical).


## Iteration Pass
- [ ] Update copy where trainees struggled with terminology.
- [ ] Clarify instructions for any confusing interactive controls.
- [ ] Re-test any updated module with at least one trainee.


## Release Build
- [ ] Run `npm run build`.
- [ ] Validate `dist/index.html` opens offline with working interactions.
- [ ] Confirm all modules render and update hashes correctly.
- [ ] Verify glossary tooltips are readable and keyboard accessible.


## Hosting Checklist
- [ ] Publish `dist/` to the target static host.
- [ ] Confirm the app loads without network access.
- [ ] Share the offline distribution instructions from `README.md`.
