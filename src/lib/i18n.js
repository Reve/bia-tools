import { writable } from 'svelte/store';

export const language = writable('ro');

export const languageOptions = [
  { value: 'ro', label: 'Română' },
  { value: 'en', label: 'English' }
];

const translations = {
  en: {
    languageLabel: 'Language',
    languages: {
      en: 'English',
      ro: 'Romanian'
    },
    common: {
      skipToContent: 'Skip to main content',
      moduleStatus: 'Module {current} of {total}',
      comingSoon: 'Coming soon',
      learningObjectives: 'Learning Objectives',
      keyConcepts: 'Key concepts',
      tryItYourself: 'Try it yourself',
      promptsLabel: 'Learning prompts'
    },
    app: {
      title: 'Blockchain & SHA Learning Tools',
      subtitle: 'Interactive cryptography fundamentals',
      moduleNavLabel: 'Module navigation',
      moduleTablistLabel: 'Learning modules',
      moduleTitles: {
        shaBasics: 'SHA Basics',
        blockAnatomy: 'Block Anatomy',
        blockchainIntegrity: 'Blockchain Integrity',
        proofOfWork: 'Proof of Work'
      },
      moduleObjectives: {
        shaBasics: {
          label: 'Learning objectives for SHA Basics',
          items: [
            'Define a cryptographic hash in plain language.',
            'Describe SHA-256 outputs as fixed-length and deterministic.',
            'Explain the avalanche effect with a simple example.',
            'Demonstrate how small input changes produce large output changes.'
          ]
        },
        blockAnatomy: {
          label: 'Learning objectives for Block Anatomy',
          items: [
            'Identify the fields that make up a block: data, nonce, previous hash, current hash.',
            "Explain how a block's hash is computed from its contents.",
            'Understand why changing any field changes the block hash.'
          ]
        },
        blockchainIntegrity: {
          label: 'Learning objectives for Blockchain Integrity',
          items: [
            'Describe how blocks link through previous hashes.',
            'Explain why tampering with one block invalidates later blocks.',
            'Identify valid vs. invalid blocks in a blockchain.'
          ]
        },
        proofOfWork: {
          label: 'Learning objectives for Proof of Work',
          items: [
            'Define proof of work as a search for a hash with specific properties.',
            'Explain difficulty as the number of leading zeros required.',
            'Describe why proof of work makes tampering costly.'
          ]
        }
      },
      moduleKeyConcepts: {
        shaBasics: {
          label: 'Key concepts',
          items: [
            {
              title: 'Deterministic',
              description: 'Same input always produces the same hash output.'
            },
            {
              title: 'Fixed Length',
              description: 'Output is always 64 hex characters, regardless of input size.'
            },
            {
              title: 'Avalanche Effect',
              description: 'Tiny input changes cause massive hash differences.'
            }
          ]
        },
        blockAnatomy: {
          label: 'Key concepts',
          items: [
            {
              title: 'Data Container',
              description: 'Blocks bundle data with metadata for organization.'
            },
            {
              title: 'Hash Links',
              description: 'Previous hash field creates chain connections.'
            },
            {
              title: 'Hash Recomputes',
              description: 'Any field change updates the entire block hash.'
            }
          ]
        },
        blockchainIntegrity: {
          label: 'Key concepts',
          items: [
            {
              title: 'Chain Links',
              description: "Each block stores the previous block's hash."
            },
            {
              title: 'Tamper-Evident',
              description: 'Changing data breaks the chain verification.'
            },
            {
              title: 'Cascade Effect',
              description: 'Invalid blocks invalidate all subsequent blocks.'
            }
          ]
        },
        proofOfWork: {
          label: 'Key concepts',
          items: [
            {
              title: 'Nonce Search',
              description: 'Miners try nonces until the hash meets the difficulty target.'
            },
            {
              title: 'Exponential Cost',
              description: 'Each extra zero roughly multiplies the work needed by 16.'
            },
            {
              title: 'Tamper Protection',
              description: 'Rewriting history requires redoing all proof of work.'
            }
          ]
        }
      },
      footerOffline: 'Runs entirely offline in your browser'
    },
    shaExplorer: {
      title: 'SHA-256 Explorer',
      descriptionPrefix: 'A ',
      hashWord: 'hash',
      descriptionMiddle: ' function turns any input into a fixed-length fingerprint. ',
      descriptionSuffix: ' always produces a 256-bit (64 hex character) output, no matter how long or short your input is.',
      explorerModeLabel: 'Explorer mode',
      liveHashing: 'Live Hashing',
      avalancheEffect: 'Avalanche Effect',
      enterAnyText: 'Enter any text',
      inputPlaceholder: 'Type something here...',
      inputHelp: 'Type any text to see its SHA-256 hash generated in real time below.',
      hashLabel: 'SHA-256 Hash',
      comparisonDescription: 'The avalanche effect means that even a tiny change in input produces a completely different hash. Compare two inputs below to see this in action.',
      inputOneLabel: 'Input 1',
      inputTwoLabel: 'Input 2',
      inputOnePlaceholder: 'First input...',
      inputTwoPlaceholder: 'Second input...',
      hashInputOneLabel: 'Hash of Input 1',
      hashInputTwoLabel: 'Hash of Input 2 (differences highlighted)',
      comparisonStats: 'Comparison Statistics',
      bitsChanged: 'Bits Changed',
      totalBits: 'Total Bits',
      hexCharsChanged: 'Hex Chars Changed',
      showBinary: 'Show Binary Representation',
      hideBinary: 'Hide Binary Representation',
      binaryHashOne: 'Binary of Hash 1',
      binaryHashTwo: 'Binary of Hash 2 (differences in red)',
      binaryDiffAria: 'Binary representation with differences highlighted in red',
      promptsLabel: 'Learning prompts',
      prompts: {
        live: [
          'Type a short word and observe the hash.',
          'Add a single character. Notice how the entire hash changes.',
          'Try a very long sentence. The hash is still 64 characters.'
        ],
        comparison: [
          'Change just one letter in Input 2. How many bits change?',
          'Make the inputs identical. What percentage of bits differ?',
          'Why does this property matter for security?'
        ]
      },
      whyMattersLabel: 'Why the avalanche effect matters',
      whyMattersTitle: 'Why this matters',
      whyMattersDescription: 'The avalanche effect is crucial for security. If similar inputs produced similar hashes, attackers could guess inputs by comparing outputs. With SHA-256, about 50% of bits change with any input modification, making such attacks impractical.'
    },
    blockAnatomy: {
      title: 'Block Anatomy',
      description: "A block bundles data with metadata and links to the previous block. Every field contributes to the block's unique fingerprint.",
      fieldsLabel: 'Block fields',
      dataTitle: 'Data',
      dataDescription: 'The actual content stored in the block.',
      nonceTitle: 'Nonce',
      nonceDescription: 'A number used once, adjustable for mining.',
      previousHashTitle: 'Previous Hash',
      previousHashDescription: 'Links this block to the one before it.',
      currentHashTitle: 'Current Hash',
      currentHashDescription: 'Computed from all fields combined.',
      interactiveTitle: 'Interactive Block',
      resetBlock: 'Reset Block',
      resetBlockAria: 'Reset block to original values',
      hashComputedTitle: 'How the Hash is Computed',
      hashComputedDescription: 'The current hash is calculated by combining all block fields and passing them through SHA-256:',
      hashFormulaLabel: 'Hash computation formula',
      prompts: [
        'Edit the data field and note the new hash. How many characters changed?',
        'Increment the nonce by 1. Does the hash change completely?',
        'Which field links this block to the one before it?'
      ],
      keyInsightTitle: 'Key Insight',
      keyInsightDescription: "Every field in a block contributes to its hash. If any field changes, the entire hash changes. This is why the previous hash field is so important: it creates an unbreakable link to the block before it. Change the previous block, and this block's link becomes invalid."
    },
    blockchainIntegrity: {
      title: 'Blockchain Integrity',
      description: 'A blockchain links blocks through hashes. If one block changes, every block after it becomes invalid. This makes blockchains tamper-evident.',
      chainStatusAria: 'Chain status: {valid} valid, {invalid} invalid blocks',
      validLabel: 'Valid',
      invalidLabel: 'Invalid',
      chainModified: 'Chain Modified',
      resetChain: 'Reset Chain',
      resetChainAria: 'Reset entire blockchain to original state',
      visualizationLabel: 'Interactive blockchain visualization',
      genesisLabel: 'Genesis',
      blockLabel: 'Block {index}',
      dataLabel: 'Data',
      dataPlaceholder: 'Block data...',
      nonceLabel: 'Nonce',
      decreaseNonceAria: 'Decrease nonce for {blockName}',
      increaseNonceAria: 'Increase nonce for {blockName}',
      previousHashLabel: 'Previous Hash',
      previousHashAria: 'Previous hash: {hash} truncated',
      currentHashLabel: 'Current Hash',
      currentHashAria: 'Current hash: {hash} truncated',
      blockStatusSr: 'This block is currently {status}. Edit the data or nonce to see how it affects the chain.',
      resetBlock: 'Reset this block',
      resetBlockAria: 'Reset {blockName} to original values',
      linked: 'Linked',
      broken: 'Broken',
      prompts: [
        "Edit Block 2's data and observe the chain status. Which blocks become invalid?",
        'Now edit Block 3. Does Block 2 become invalid?',
        'Reset the chain and try editing only the Genesis block. What happens to all other blocks?'
      ],
      tamperEvidentTitle: 'Why Chains are Tamper-Evident',
      tamperEvidentDescription: "Each block stores the previous block's hash. If you change any data in an earlier block, its hash changes. But the next block still stores the old hash, creating a mismatch. This \"broken link\" proves tampering occurred.",
      cascadeTitle: 'The Cascade Effect',
      cascadeDescription: 'When one block becomes invalid, every block after it also becomes invalid. To hide tampering, an attacker would need to recalculate every subsequent block\'s hash. With proof of work, this becomes computationally impractical.'
    },
    proofOfWork: {
      title: 'Proof of Work',
      description: "Proof of work requires finding a nonce that makes the block's hash start with a certain number of zeros. The more zeros required, the harder (and slower) the search becomes. This is what makes tampering with a blockchain expensive.",
      miningConfigTitle: 'Mining Configuration',
      blockDataLabel: 'Block Data',
      blockDataPlaceholder: 'Enter block data...',
      difficultyLabel: 'Difficulty',
      leadingZerosLabel: '(leading zeros)',
      difficultyAria: 'Set difficulty from {min} to {max} leading zeros',
      easyLabel: 'Easy ({min})',
      hardLabel: 'Hard ({max})',
      timeLimitLabel: 'Time Limit',
      timeLimitAria: 'Set time limit from {min} to {max} seconds',
      targetLabel: 'Target: hash must start with',
      startMining: 'Start Mining',
      startMiningAria: 'Start mining to find a nonce that meets the difficulty requirement',
      stopMining: 'Stop Mining',
      stopMiningAria: 'Stop the mining process',
      reset: 'Reset',
      resetAria: 'Reset mining configuration and results',
      miningInProgress: 'Mining in Progress',
      timeLimitReached: 'Time Limit Reached',
      nonceFound: 'Nonce Found',
      limitLabel: 'Limit: {time}',
      stats: {
        nonce: 'Nonce',
        attempts: 'Attempts',
        time: 'Time',
        difficulty: 'Difficulty'
      },
      latestHash: 'Latest Hash Tested',
      winningHash: 'Winning Hash',
      hashStartsWith: 'Hash starts with {count} {zeroLabel} — proof of work satisfied.',
      timeoutMessage: 'Could not find a valid nonce within {time}.',
      timeoutAttempts: 'Tried {attempts} nonces.',
      timeoutSuggestion: 'Try a lower difficulty or different data.',
      nonceSearchLabel: 'Nonce Search',
      nonceLabel: 'Nonce: {value}',
      timeElapsed: 'Time elapsed',
      prompts: [
        'Set difficulty to 2 and start the search. How many attempts did it take?',
        'Increase difficulty to 3 and compare the time and attempts. How much harder was it?',
        'Why does higher difficulty make tampering with earlier blocks impractical?'
      ],
      secureChainTitle: 'How Proof of Work Secures the Chain',
      secureChainDescription: 'To add a block, miners must find a nonce that produces a hash with the required leading zeros. This takes real computational effort. To tamper with a past block, an attacker would need to redo this work for that block and every block after it — faster than the rest of the network.',
      difficultyMattersTitle: 'Why Difficulty Matters',
      difficultyMattersDescription: 'Each additional leading zero roughly multiplies the search space by 16. A difficulty of 2 might take hundreds of attempts, while a difficulty of 5 can take millions. Real blockchains use much higher difficulties, making history rewriting practically impossible.'
    },
    blockCard: {
      blockLabel: 'Block {number}',
      blockStatusAria: 'Block {number}: {status}',
      valid: 'Valid',
      invalid: 'Invalid',
      statusAria: 'Block is {status}',
      dataLabel: 'Data',
      dataPlaceholder: 'Enter block data...',
      emptyData: '(empty)',
      nonceLabel: 'Nonce',
      decreaseNonce: 'Decrease nonce',
      increaseNonce: 'Increase nonce',
      previousHashLabel: 'Previous Hash',
      previousHashAria: 'Previous hash value',
      currentHashLabel: 'Current Hash',
      currentHashAria: 'Current hash value',
      computing: 'Computing...'
    },
    hashDisplay: {
      defaultLabel: 'Hash Output',
      emptyMessage: 'Enter text above to see the hash',
      lengthAria: '{count} characters representing 256 bits',
      lengthLabel: '{count} characters (256 bits)'
    },
    glossary: {
      termLabel: 'Glossary term: {term}'
    },
    initialContent: {
      helloBlockchain: 'Hello, blockchain!',
      genesisBlock: 'Genesis Block',
      transactionAliceBob: 'Transaction: Alice sends 10 coins to Bob',
      transactionBobCharlie: 'Transaction: Bob sends 5 coins to Charlie',
      transactionCharlieAlice: 'Transaction: Charlie sends 2 coins to Alice'
    }
  },
  ro: {
    languageLabel: 'Limbă',
    languages: {
      en: 'Engleză',
      ro: 'Română'
    },
    common: {
      skipToContent: 'Sari la conținutul principal',
      moduleStatus: 'Modulul {current} din {total}',
      comingSoon: 'În curând',
      learningObjectives: 'Obiective de învățare',
      keyConcepts: 'Concepte cheie',
      tryItYourself: 'Încearcă tu',
      promptsLabel: 'Indicații de învățare'
    },
    app: {
      title: 'Instrumente de învățare Blockchain & SHA',
      subtitle: 'Fundamente interactive de criptografie',
      moduleNavLabel: 'Navigare module',
      moduleTablistLabel: 'Module de învățare',
      moduleTitles: {
        shaBasics: 'Bazele SHA',
        blockAnatomy: 'Anatomia blocului',
        blockchainIntegrity: 'Integritatea blockchain-ului',
        proofOfWork: 'Dovada de lucru'
      },
      moduleObjectives: {
        shaBasics: {
          label: 'Obiective de învățare pentru Bazele SHA',
          items: [
            'Definește un hash criptografic în limbaj simplu.',
            'Descrie ieșirile SHA-256 ca fiind cu lungime fixă și deterministe.',
            'Explică efectul de avalanșă cu un exemplu simplu.',
            'Demonstrează cum modificări mici ale intrării produc modificări mari ale ieșirii.'
          ]
        },
        blockAnatomy: {
          label: 'Obiective de învățare pentru Anatomia blocului',
          items: [
            'Identifică câmpurile care alcătuiesc un bloc: date, nonce, hash anterior, hash curent.',
            'Explică modul în care hash-ul unui bloc se calculează din conținutul lui.',
            'Înțelege de ce schimbarea oricărui câmp modifică hash-ul blocului.'
          ]
        },
        blockchainIntegrity: {
          label: 'Obiective de învățare pentru Integritatea blockchain-ului',
          items: [
            'Descrie cum se leagă blocurile prin hash-uri anterioare.',
            'Explică de ce modificarea unui bloc invalidează blocurile ulterioare.',
            'Identifică blocurile valide vs. invalide într-un blockchain.'
          ]
        },
        proofOfWork: {
          label: 'Obiective de învățare pentru Dovada de lucru',
          items: [
            'Definește dovada de lucru ca o căutare a unui hash cu proprietăți specifice.',
            'Explică dificultatea ca numărul de zerouri la început necesar.',
            'Descrie de ce dovada de lucru face modificările costisitoare.'
          ]
        }
      },
      moduleKeyConcepts: {
        shaBasics: {
          label: 'Concepte cheie',
          items: [
            {
              title: 'Determinist',
              description: 'Aceeași intrare produce întotdeauna același hash.'
            },
            {
              title: 'Lungime fixă',
              description: 'Rezultatul are întotdeauna 64 de caractere hex, indiferent de dimensiunea intrării.'
            },
            {
              title: 'Efect de avalanșă',
              description: 'Modificări infime ale intrării produc diferențe masive ale hash-ului.'
            }
          ]
        },
        blockAnatomy: {
          label: 'Concepte cheie',
          items: [
            {
              title: 'Container de date',
              description: 'Blocurile grupează date cu metadate pentru organizare.'
            },
            {
              title: 'Legături prin hash',
              description: 'Câmpul hash anterior creează legăturile lanțului.'
            },
            {
              title: 'Recalculare hash',
              description: 'Orice schimbare a unui câmp actualizează hash-ul blocului.'
            }
          ]
        },
        blockchainIntegrity: {
          label: 'Concepte cheie',
          items: [
            {
              title: 'Legături în lanț',
              description: 'Fiecare bloc stochează hash-ul blocului anterior.'
            },
            {
              title: 'Evident la manipulare',
              description: 'Schimbarea datelor rupe verificarea lanțului.'
            },
            {
              title: 'Efect de cascadă',
              description: 'Blocurile invalide invalidează toate blocurile următoare.'
            }
          ]
        },
        proofOfWork: {
          label: 'Concepte cheie',
          items: [
            {
              title: 'Căutarea nonce-ului',
              description: 'Minerii încearcă nonce-uri până când hash-ul îndeplinește ținta de dificultate.'
            },
            {
              title: 'Cost exponențial',
              description: 'Fiecare zero în plus multiplică aproximativ munca necesară cu 16.'
            },
            {
              title: 'Protecție împotriva manipulării',
              description: 'Rescrierea istoricului cere refacerea întregii dovezi de lucru.'
            }
          ]
        }
      },
      footerOffline: 'Rulează complet offline în browserul tău'
    },
    shaExplorer: {
      title: 'Explorator SHA-256',
      descriptionPrefix: 'O funcție ',
      hashWord: 'hash',
      descriptionMiddle: ' transformă orice intrare într-o amprentă cu lungime fixă. ',
      descriptionSuffix: ' produce întotdeauna o ieșire de 256 de biți (64 de caractere hex), indiferent cât de lungă sau scurtă este intrarea.',
      explorerModeLabel: 'Mod explorator',
      liveHashing: 'Hashing în timp real',
      avalancheEffect: 'Efect de avalanșă',
      enterAnyText: 'Introdu orice text',
      inputPlaceholder: 'Tastează ceva aici...',
      inputHelp: 'Tastează orice text pentru a vedea mai jos hash-ul SHA-256 generat în timp real.',
      hashLabel: 'Hash SHA-256',
      comparisonDescription: 'Efectul de avalanșă înseamnă că și o schimbare foarte mică a intrării produce un hash complet diferit. Compară două intrări mai jos ca să vezi acest efect.',
      inputOneLabel: 'Intrare 1',
      inputTwoLabel: 'Intrare 2',
      inputOnePlaceholder: 'Prima intrare...',
      inputTwoPlaceholder: 'A doua intrare...',
      hashInputOneLabel: 'Hash-ul intrării 1',
      hashInputTwoLabel: 'Hash-ul intrării 2 (diferențe evidențiate)',
      comparisonStats: 'Statistici de comparație',
      bitsChanged: 'Biți modificați',
      totalBits: 'Biți totali',
      hexCharsChanged: 'Caractere hex modificate',
      showBinary: 'Afișează reprezentarea binară',
      hideBinary: 'Ascunde reprezentarea binară',
      binaryHashOne: 'Binar pentru hash 1',
      binaryHashTwo: 'Binar pentru hash 2 (diferențe în roșu)',
      binaryDiffAria: 'Reprezentare binară cu diferențele evidențiate cu roșu',
      promptsLabel: 'Indicații de învățare',
      prompts: {
        live: [
          'Tastează un cuvânt scurt și observă hash-ul.',
          'Adaugă un singur caracter. Observă cum se schimbă întregul hash.',
          'Încearcă o propoziție foarte lungă. Hash-ul are tot 64 de caractere.'
        ],
        comparison: [
          'Schimbă o singură literă în intrarea 2. Câți biți se schimbă?',
          'Fă intrările identice. Ce procent de biți diferă?',
          'De ce este importantă această proprietate pentru securitate?'
        ]
      },
      whyMattersLabel: 'De ce contează efectul de avalanșă',
      whyMattersTitle: 'De ce contează',
      whyMattersDescription: 'Efectul de avalanșă este esențial pentru securitate. Dacă intrări similare ar produce hash-uri similare, atacatorii ar putea ghici intrările comparând ieșirile. Cu SHA-256, aproximativ 50% dintre biți se schimbă la orice modificare a intrării, ceea ce face astfel de atacuri impracticabile.'
    },
    blockAnatomy: {
      title: 'Anatomia blocului',
      description: 'Un bloc grupează date cu metadate și se leagă de blocul anterior. Fiecare câmp contribuie la amprenta unică a blocului.',
      fieldsLabel: 'Câmpurile blocului',
      dataTitle: 'Date',
      dataDescription: 'Conținutul efectiv stocat în bloc.',
      nonceTitle: 'Nonce',
      nonceDescription: 'Un număr folosit o singură dată, ajustabil pentru minare.',
      previousHashTitle: 'Hash anterior',
      previousHashDescription: 'Leagă acest bloc de cel anterior.',
      currentHashTitle: 'Hash curent',
      currentHashDescription: 'Calculat din toate câmpurile combinate.',
      interactiveTitle: 'Bloc interactiv',
      resetBlock: 'Resetează blocul',
      resetBlockAria: 'Resetează blocul la valorile originale',
      hashComputedTitle: 'Cum se calculează hash-ul',
      hashComputedDescription: 'Hash-ul curent se calculează combinând toate câmpurile blocului și trecându-le prin SHA-256:',
      hashFormulaLabel: 'Formula de calcul a hash-ului',
      prompts: [
        'Editează câmpul de date și notează noul hash. Câte caractere s-au schimbat?',
        'Incrementează nonce-ul cu 1. Se schimbă complet hash-ul?',
        'Care câmp leagă acest bloc de cel anterior?'
      ],
      keyInsightTitle: 'Idee-cheie',
      keyInsightDescription: 'Fiecare câmp dintr-un bloc contribuie la hash-ul său. Dacă oricare câmp se schimbă, întregul hash se modifică. De aceea câmpul hash anterior este atât de important: creează o legătură de neîntrerupt cu blocul dinainte. Dacă modifici blocul anterior, legătura acestui bloc devine invalidă.'
    },
    blockchainIntegrity: {
      title: 'Integritatea blockchain-ului',
      description: 'Un blockchain leagă blocurile prin hash-uri. Dacă un bloc se schimbă, fiecare bloc după el devine invalid. Acest lucru face blockchain-urile evidente la manipulare.',
      chainStatusAria: 'Starea lanțului: {valid} valide, {invalid} invalide',
      validLabel: 'Valid',
      invalidLabel: 'Invalid',
      chainModified: 'Lanț modificat',
      resetChain: 'Resetează lanțul',
      resetChainAria: 'Resetează întregul blockchain la starea inițială',
      visualizationLabel: 'Vizualizare blockchain interactivă',
      genesisLabel: 'Genesis',
      blockLabel: 'Blocul {index}',
      dataLabel: 'Date',
      dataPlaceholder: 'Datele blocului...',
      nonceLabel: 'Nonce',
      decreaseNonceAria: 'Micșorează nonce-ul pentru {blockName}',
      increaseNonceAria: 'Mărește nonce-ul pentru {blockName}',
      previousHashLabel: 'Hash anterior',
      previousHashAria: 'Hash anterior: {hash} prescurtat',
      currentHashLabel: 'Hash curent',
      currentHashAria: 'Hash curent: {hash} prescurtat',
      blockStatusSr: 'Acest bloc este în prezent {status}. Editează datele sau nonce-ul pentru a vedea cum afectează lanțul.',
      resetBlock: 'Resetează acest bloc',
      resetBlockAria: 'Resetează {blockName} la valorile originale',
      linked: 'Legat',
      broken: 'Rupt',
      prompts: [
        'Editează datele Blocului 2 și observă starea lanțului. Care blocuri devin invalide?',
        'Acum editează Blocul 3. Devine Blocul 2 invalid?',
        'Resetează lanțul și încearcă să editezi doar blocul Genesis. Ce se întâmplă cu celelalte blocuri?'
      ],
      tamperEvidentTitle: 'De ce lanțurile sunt evidente la manipulare',
      tamperEvidentDescription: 'Fiecare bloc stochează hash-ul blocului anterior. Dacă modifici orice date într-un bloc mai vechi, hash-ul lui se schimbă. Dar următorul bloc păstrează încă vechiul hash, creând o neconcordanță. Această „legătură ruptă” dovedește că a avut loc o manipulare.',
      cascadeTitle: 'Efectul de cascadă',
      cascadeDescription: 'Când un bloc devine invalid, fiecare bloc după el devine, de asemenea, invalid. Pentru a ascunde manipularea, un atacator ar trebui să recalculeze hash-ul fiecărui bloc următor. Cu dovada de lucru, acest lucru devine impracticabil din punct de vedere computațional.'
    },
    proofOfWork: {
      title: 'Dovada de lucru',
      description: 'Dovada de lucru necesită găsirea unui nonce care face ca hash-ul blocului să înceapă cu un anumit număr de zerouri. Cu cât sunt necesare mai multe zerouri, cu atât căutarea devine mai grea (și mai lentă). Acesta este motivul pentru care modificarea unui blockchain este costisitoare.',
      miningConfigTitle: 'Configurație de minare',
      blockDataLabel: 'Datele blocului',
      blockDataPlaceholder: 'Introdu datele blocului...',
      difficultyLabel: 'Dificultate',
      leadingZerosLabel: '(zerouri la început)',
      difficultyAria: 'Setează dificultatea de la {min} la {max} zerouri la început',
      easyLabel: 'Ușor ({min})',
      hardLabel: 'Greu ({max})',
      timeLimitLabel: 'Limită de timp',
      timeLimitAria: 'Setează limita de timp de la {min} la {max} secunde',
      targetLabel: 'Țintă: hash-ul trebuie să înceapă cu',
      startMining: 'Pornește minarea',
      startMiningAria: 'Pornește minarea pentru a găsi un nonce care îndeplinește cerința de dificultate',
      stopMining: 'Oprește minarea',
      stopMiningAria: 'Oprește procesul de minare',
      reset: 'Resetează',
      resetAria: 'Resetează configurația și rezultatele de minare',
      miningInProgress: 'Minare în desfășurare',
      timeLimitReached: 'Limita de timp atinsă',
      nonceFound: 'Nonce găsit',
      limitLabel: 'Limită: {time}',
      stats: {
        nonce: 'Nonce',
        attempts: 'Încercări',
        time: 'Timp',
        difficulty: 'Dificultate'
      },
      latestHash: 'Ultimul hash testat',
      winningHash: 'Hash câștigător',
      hashStartsWith: 'Hash-ul începe cu {count} {zeroLabel} — dovada de lucru îndeplinită.',
      timeoutMessage: 'Nu s-a găsit un nonce valid în {time}.',
      timeoutAttempts: 'S-au încercat {attempts} nonce-uri.',
      timeoutSuggestion: 'Încearcă o dificultate mai mică sau date diferite.',
      nonceSearchLabel: 'Căutarea nonce-ului',
      nonceLabel: 'Nonce: {value}',
      timeElapsed: 'Timp scurs',
      prompts: [
        'Setează dificultatea la 2 și pornește căutarea. Câte încercări au fost necesare?',
        'Mărește dificultatea la 3 și compară timpul și încercările. Cu cât a fost mai greu?',
        'De ce o dificultate mai mare face modificarea blocurilor anterioare impracticabilă?'
      ],
      secureChainTitle: 'Cum securizează dovada de lucru lanțul',
      secureChainDescription: 'Pentru a adăuga un bloc, minerii trebuie să găsească un nonce care produce un hash cu zerourile la început necesare. Acest lucru cere efort computațional real. Pentru a modifica un bloc trecut, un atacator ar trebui să refacă această muncă pentru acel bloc și pentru fiecare bloc după el — mai rapid decât restul rețelei.',
      difficultyMattersTitle: 'De ce contează dificultatea',
      difficultyMattersDescription: 'Fiecare zero suplimentar la început multiplică aproximativ spațiul de căutare cu 16. O dificultate de 2 poate necesita sute de încercări, în timp ce o dificultate de 5 poate necesita milioane. Blockchain-urile reale folosesc dificultăți mult mai mari, ceea ce face rescrierea istoricului practic imposibilă.'
    },
    blockCard: {
      blockLabel: 'Blocul {number}',
      blockStatusAria: 'Blocul {number}: {status}',
      valid: 'Valid',
      invalid: 'Invalid',
      statusAria: 'Blocul este {status}',
      dataLabel: 'Date',
      dataPlaceholder: 'Introdu datele blocului...',
      emptyData: '(gol)',
      nonceLabel: 'Nonce',
      decreaseNonce: 'Scade nonce-ul',
      increaseNonce: 'Crește nonce-ul',
      previousHashLabel: 'Hash anterior',
      previousHashAria: 'Valoarea hash-ului anterior',
      currentHashLabel: 'Hash curent',
      currentHashAria: 'Valoarea hash-ului curent',
      computing: 'Se calculează...'
    },
    hashDisplay: {
      defaultLabel: 'Rezultat hash',
      emptyMessage: 'Introdu textul de mai sus pentru a vedea hash-ul',
      lengthAria: '{count} caractere care reprezintă 256 biți',
      lengthLabel: '{count} caractere (256 biți)'
    },
    glossary: {
      termLabel: 'Termen din glosar: {term}'
    },
    initialContent: {
      helloBlockchain: 'Salut, blockchain!',
      genesisBlock: 'Blocul Genesis',
      transactionAliceBob: 'Tranzacție: Alice trimite 10 monede lui Bob',
      transactionBobCharlie: 'Tranzacție: Bob trimite 5 monede lui Charlie',
      transactionCharlieAlice: 'Tranzacție: Charlie trimite 2 monede lui Alice'
    }
  }
};

function getTranslation(languageCode, key) {
  return key.split('.').reduce((acc, part) => acc && acc[part], translations[languageCode]);
}

export function translate(languageCode, key, variables = {}) {
  const value = getTranslation(languageCode, key) ?? getTranslation('en', key) ?? '';

  if (Array.isArray(value) || typeof value === 'object') {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (match, token) => (
    Object.prototype.hasOwnProperty.call(variables, token) ? variables[token] : match
  ));
}

export function getZeroLabel(languageCode, count) {
  if (languageCode === 'ro') {
    return count === 1 ? 'zero' : 'zerouri';
  }

  return count === 1 ? 'zero' : 'zeros';
}
