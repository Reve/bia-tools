# Module Scripts & Learning Objectives

## Module 1: SHA Basics

### Learning Objectives
- Define a cryptographic hash in plain language.
- Describe SHA-256 outputs as fixed-length and deterministic.
- Explain the avalanche effect with a simple example.
- Demonstrate how small input changes produce large output changes.

### Script (Narration + On-Screen Prompts)
1. “A hash function turns any input into a fixed-length fingerprint.”
2. “SHA-256 always produces a 256-bit (64 hex character) output.”
3. “Try typing any message. Notice the hash updates instantly.”
4. “Now add a single character. The new hash looks completely different.”
5. “That’s the avalanche effect: tiny changes create big differences.”

### Interactive Prompts
- “Type a short word and record the hash.”
- “Add a punctuation mark and compare the two hashes.”
- “Which property—deterministic, fixed length, or avalanche—best explains what you saw?”


## Module 2: Block Anatomy

### Learning Objectives
- Identify the fields that make up a block (data, nonce, previous hash, current hash).
- Explain how a block’s hash is computed from its contents.
- Understand why changing any field changes the block hash.

### Script (Narration + On-Screen Prompts)
1. “A block bundles data with a nonce and the previous block’s hash.”
2. “The current hash is computed from all of these fields together.”
3. “Edit the data field and watch the hash update.”
4. “Even changing the nonce by one alters the hash output.”

### Interactive Prompts
- “Edit the data field and note the new hash.”
- “Increment the nonce by 1. What happens?”
- “Which field links this block to the one before it?”


## Module 3: Blockchain Integrity

### Learning Objectives
- Describe how blocks link through previous hashes.
- Explain why tampering with one block invalidates later blocks.
- Identify valid vs. invalid blocks in a chain.

### Script (Narration + On-Screen Prompts)
1. “Each block stores the previous block’s hash.”
2. “If one block changes, its hash changes too.”
3. “That breaks the link for every block after it.”
4. “This is why blockchains are tamper-evident.”

### Interactive Prompts
- “Edit Block 2’s data and observe the chain status.”
- “Which blocks become invalid after the change?”
- “Reset the data to restore the chain.”


## Module 4: Proof of Work (Lightweight)

### Learning Objectives
- Define proof of work as a search for a hash with specific properties.
- Explain difficulty as the number of leading zeros required.
- Describe why proof of work makes tampering costly.

### Script (Narration + On-Screen Prompts)
1. “Proof of work asks us to find a nonce that produces a special hash.”
2. “Difficulty means how many leading zeros we require.”
3. “Higher difficulty takes more tries and more time.”
4. “This makes it expensive to rewrite history.”

### Interactive Prompts
- “Set difficulty to 2 and start the search.”
- “Increase difficulty to 3 and compare the time.”
- “Why does higher difficulty make tampering harder?”
