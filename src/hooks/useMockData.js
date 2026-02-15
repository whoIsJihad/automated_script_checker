import { useState, useEffect } from 'react';

// Initial mock data
const initialWorksheets = [
  {
    id: 1,
    title: 'Algebra Basics',
    subject: 'Math',
    status: 'Open',
    assignedLLM: 'GPT-4o',
    file: 'algebra_basics.pdf',
    description: 'Introduction to fundamental algebraic concepts including variables, equations, and basic operations.',
    dueDate: '2024-02-20T23:59:00Z',
    instructions: 'Complete all exercises showing your work. Focus on understanding the concepts rather than just getting the right answer.',
    difficulty: 'Beginner',
    estimatedTime: 45,
    tags: ['algebra', 'equations', 'variables'],
    createdBy: 'Dr. Smith',
    createdDate: '2024-02-01T10:00:00Z',
    lastModified: '2024-02-01T10:00:00Z',
    submissions: 8,
    expectedSubmissions: 25,
    averageScore: 82,
    completionRate: 32,
    disputeRate: 0
  },
  {
    id: 2,
    title: 'History of AI',
    subject: 'History',
    status: 'Closed',
    assignedLLM: 'Gemini 1.5',
    file: null,
    description: 'Explore the historical development of artificial intelligence from its inception to modern applications.',
    dueDate: '2024-01-15T23:59:00Z',
    instructions: 'Research and write a 500-word essay on the timeline of AI development. Include key figures and milestones.',
    difficulty: 'Intermediate',
    estimatedTime: 120,
    tags: ['AI', 'technology', 'history', 'innovation'],
    createdBy: 'Prof. Johnson',
    createdDate: '2024-01-01T09:00:00Z',
    lastModified: '2024-01-01T09:00:00Z',
    submissions: 22,
    expectedSubmissions: 22,
    averageScore: 78,
    completionRate: 100,
    disputeRate: 9
  },
  {
    id: 3,
    title: 'Physics Fundamentals',
    subject: 'Physics',
    status: 'Open',
    assignedLLM: 'GPT-4o',
    file: 'physics_fundamentals.docx',
    description: 'Basic principles of physics including motion, forces, and energy conservation.',
    dueDate: '2024-02-25T23:59:00Z',
    instructions: 'Solve all problems numerically and show units. Draw diagrams where appropriate.',
    difficulty: 'Intermediate',
    estimatedTime: 90,
    tags: ['physics', 'mechanics', 'forces', 'energy'],
    createdBy: 'Dr. Chen',
    createdDate: '2024-02-05T14:30:00Z',
    lastModified: '2024-02-05T14:30:00Z',
    submissions: 15,
    expectedSubmissions: 28,
    averageScore: 85,
    completionRate: 54,
    disputeRate: 0
  },
  {
    id: 4,
    title: 'Cell Biology',
    subject: 'Biology',
    status: 'Open',
    assignedLLM: 'Claude 3',
    file: 'cell_biology.pdf',
    description: 'Comprehensive study of cellular structure, function, and processes.',
    dueDate: '2024-02-28T23:59:00Z',
    instructions: 'Label all diagrams accurately. Explain cellular processes in your own words.',
    difficulty: 'Advanced',
    estimatedTime: 75,
    tags: ['biology', 'cells', 'organelles', 'processes'],
    createdBy: 'Dr. Martinez',
    createdDate: '2024-02-08T11:15:00Z',
    lastModified: '2024-02-08T11:15:00Z',
    submissions: 12,
    expectedSubmissions: 30,
    averageScore: 88,
    completionRate: 40,
    disputeRate: 0
  },
  {
    id: 5,
    title: 'Chemical Reactions',
    subject: 'Chemistry',
    status: 'Open',
    assignedLLM: 'GPT-4o',
    file: 'chemical_reactions.docx',
    description: 'Types of chemical reactions, balancing equations, and stoichiometry.',
    dueDate: '2024-03-05T23:59:00Z',
    instructions: 'Balance all equations and show your work. Include state symbols where appropriate.',
    difficulty: 'Intermediate',
    estimatedTime: 60,
    tags: ['chemistry', 'reactions', 'equations', 'stoichiometry'],
    createdBy: 'Dr. Wilson',
    createdDate: '2024-02-10T13:45:00Z',
    lastModified: '2024-02-10T13:45:00Z',
    submissions: 6,
    expectedSubmissions: 25,
    averageScore: 79,
    completionRate: 24,
    disputeRate: 0
  },
  {
    id: 6,
    title: 'Shakespeare Literature',
    subject: 'English',
    status: 'Closed',
    assignedLLM: 'Gemini 1.5',
    file: 'shakespeare_lit.pdf',
    description: 'Analysis of Shakespeare\'s works, themes, and literary techniques.',
    dueDate: '2024-01-30T23:59:00Z',
    instructions: 'Write a comparative analysis of two Shakespeare plays. Include quotes and citations.',
    difficulty: 'Advanced',
    estimatedTime: 150,
    tags: ['literature', 'shakespeare', 'analysis', 'drama'],
    createdBy: 'Prof. Davis',
    createdDate: '2024-01-10T10:30:00Z',
    lastModified: '2024-01-10T10:30:00Z',
    submissions: 18,
    expectedSubmissions: 20,
    averageScore: 84,
    completionRate: 90,
    disputeRate: 6
  },
  {
    id: 7,
    title: 'Programming Fundamentals',
    subject: 'Computer Science',
    status: 'Open',
    assignedLLM: 'Claude 3',
    file: 'programming_basics.py',
    description: 'Introduction to programming concepts using Python including variables, loops, and functions.',
    dueDate: '2024-03-10T23:59:00Z',
    instructions: 'Write clean, commented code. Test all functions with multiple inputs.',
    difficulty: 'Beginner',
    estimatedTime: 80,
    tags: ['programming', 'python', 'algorithms', 'functions'],
    createdBy: 'Dr. Lee',
    createdDate: '2024-02-12T15:20:00Z',
    lastModified: '2024-02-12T15:20:00Z',
    submissions: 9,
    expectedSubmissions: 22,
    averageScore: 76,
    completionRate: 41,
    disputeRate: 11
  },
  {
    id: 8,
    title: 'World Geography',
    subject: 'Geography',
    status: 'Open',
    assignedLLM: 'GPT-4o',
    file: 'world_geography.pdf',
    description: 'Global geography including continents, countries, climate zones, and human geography.',
    dueDate: '2024-03-15T23:59:00Z',
    instructions: 'Create maps and diagrams. Research current events related to geographical concepts.',
    difficulty: 'Intermediate',
    estimatedTime: 70,
    tags: ['geography', 'maps', 'climate', 'countries'],
    createdBy: 'Ms. Thompson',
    createdDate: '2024-02-15T12:00:00Z',
    lastModified: '2024-02-15T12:00:00Z',
    submissions: 14,
    expectedSubmissions: 26,
    averageScore: 87,
    completionRate: 54,
    disputeRate: 0
  },
  {
    id: 9,
    title: 'Art History',
    subject: 'Art',
    status: 'Closed',
    assignedLLM: 'Gemini 1.5',
    file: 'art_history.docx',
    description: 'Survey of art history from ancient civilizations to contemporary art movements.',
    dueDate: '2024-02-05T23:59:00Z',
    instructions: 'Analyze artworks using art historical methods. Include visual analysis and historical context.',
    difficulty: 'Intermediate',
    estimatedTime: 100,
    tags: ['art', 'history', 'analysis', 'movements'],
    createdBy: 'Prof. Garcia',
    createdDate: '2024-01-20T14:45:00Z',
    lastModified: '2024-01-20T14:45:00Z',
    submissions: 16,
    expectedSubmissions: 18,
    averageScore: 81,
    completionRate: 89,
    disputeRate: 13
  },
  {
    id: 10,
    title: 'Microeconomics',
    subject: 'Economics',
    status: 'Open',
    assignedLLM: 'Claude 3',
    file: 'microeconomics.pdf',
    description: 'Principles of microeconomics including supply and demand, market structures, and consumer behavior.',
    dueDate: '2024-03-20T23:59:00Z',
    instructions: 'Use graphs to illustrate economic concepts. Apply theories to real-world examples.',
    difficulty: 'Advanced',
    estimatedTime: 85,
    tags: ['economics', 'markets', 'supply-demand', 'behavior'],
    createdBy: 'Dr. Brown',
    createdDate: '2024-02-18T16:30:00Z',
    lastModified: '2024-02-18T16:30:00Z',
    submissions: 7,
    expectedSubmissions: 24,
    averageScore: 83,
    completionRate: 29,
    disputeRate: 0
  },
  {
    id: 11,
    title: 'Calculus I',
    subject: 'Math',
    status: 'Open',
    assignedLLM: 'GPT-4o',
    file: 'calculus_i.pdf',
    description: 'Introduction to differential and integral calculus including limits, derivatives, and basic integration.',
    dueDate: '2024-03-25T23:59:00Z',
    instructions: 'Show all mathematical work clearly. Use proper notation and explain each step.',
    difficulty: 'Advanced',
    estimatedTime: 120,
    tags: ['calculus', 'derivatives', 'integrals', 'limits'],
    createdBy: 'Dr. Smith',
    createdDate: '2024-02-20T11:00:00Z',
    lastModified: '2024-02-20T11:00:00Z',
    submissions: 5,
    expectedSubmissions: 20,
    averageScore: 74,
    completionRate: 25,
    disputeRate: 0
  },
  {
    id: 12,
    title: 'Ancient Rome',
    subject: 'History',
    status: 'Open',
    assignedLLM: 'Gemini 1.5',
    file: 'ancient_rome.docx',
    description: 'History of ancient Rome from founding to fall of the Western Empire.',
    dueDate: '2024-03-30T23:59:00Z',
    instructions: 'Connect Roman history to modern institutions and ideas. Include primary source analysis.',
    difficulty: 'Intermediate',
    estimatedTime: 95,
    tags: ['rome', 'ancient', 'empire', 'civilization'],
    createdBy: 'Prof. Johnson',
    createdDate: '2024-02-22T13:15:00Z',
    lastModified: '2024-02-22T13:15:00Z',
    submissions: 3,
    expectedSubmissions: 19,
    averageScore: 89,
    completionRate: 16,
    disputeRate: 0
  }
];

const initialSubmissions = [
  // Alice's submissions
  {
    id: 1,
    studentName: 'Alice',
    worksheetId: 1,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-15T14:30:00Z',
    fileUrl: 'alice_physics_submission.pdf',
    timeSpent: 45,
    attempts: 1,
    detailedFeedback: null
  },
  {
    id: 2,
    studentName: 'Alice',
    worksheetId: 2,
    status: 'Disputed',
    score: 70,
    aiFeedback: 'Needs improvement in historical context.',
    isDisputed: true,
    disputeReason: 'The AI missed key dates in the timeline.',
    teacherOverride: null,
    submittedDate: '2024-02-12T10:15:00Z',
    fileUrl: 'alice_history_submission.pdf',
    timeSpent: 60,
    attempts: 2,
    detailedFeedback: {
      strengths: ['Good understanding of basic concepts', 'Clear writing style'],
      weaknesses: ['Missing key historical dates', 'Limited analysis of causes'],
      suggestions: ['Include specific dates in timelines', 'Add more depth to analysis']
    }
  },
  {
    id: 3,
    studentName: 'Alice',
    worksheetId: 4,
    status: 'Graded',
    score: 92,
    aiFeedback: 'Excellent understanding of cell structure. Well done!',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-10T16:45:00Z',
    fileUrl: 'alice_biology_submission.pdf',
    timeSpent: 75,
    attempts: 1,
    detailedFeedback: {
      strengths: ['Excellent diagram labeling', 'Clear explanations', 'Good understanding of organelles'],
      weaknesses: ['Minor spelling error in one term'],
      suggestions: ['Review terminology for consistency', 'Consider adding more examples']
    }
  },
  {
    id: 4,
    studentName: 'Alice',
    worksheetId: 7,
    status: 'Graded',
    score: 88,
    aiFeedback: 'Good coding practices shown. Consider edge cases in future.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-08T13:20:00Z',
    fileUrl: 'alice_coding_submission.zip',
    timeSpent: 90,
    attempts: 1,
    detailedFeedback: {
      strengths: ['Clean code structure', 'Good variable naming', 'Proper indentation'],
      weaknesses: ['Missing edge case handling', 'Could use more comments'],
      suggestions: ['Add input validation', 'Include unit tests', 'Document functions better']
    }
  },

  // Bob's submissions
  {
    id: 5,
    studentName: 'Bob',
    worksheetId: 1,
    status: 'Graded',
    score: 85,
    aiFeedback: 'Good work on the basics, but check your calculations.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-14T11:00:00Z',
    fileUrl: 'bob_physics_submission.pdf',
    timeSpent: 55,
    attempts: 1,
    detailedFeedback: {
      strengths: ['Good understanding of basic concepts', 'Clear problem setup'],
      weaknesses: ['Calculation errors in some problems'],
      suggestions: ['Double-check arithmetic', 'Show all work clearly']
    }
  },
  {
    id: 6,
    studentName: 'Bob',
    worksheetId: 3,
    status: 'Graded',
    score: 78,
    aiFeedback: 'Solid understanding of mechanics. Work on unit conversions.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-11T15:30:00Z',
    fileUrl: 'bob_physics2_submission.pdf',
    timeSpent: 65,
    attempts: 1,
    detailedFeedback: {
      strengths: ['Good grasp of mechanics principles'],
      weaknesses: ['Unit conversion errors', 'Missing units in answers'],
      suggestions: ['Practice unit conversions', 'Always include units in final answers']
    }
  },
  {
    id: 7,
    studentName: 'Bob',
    worksheetId: 5,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null,
    submittedDate: '2024-02-16T09:45:00Z',
    fileUrl: 'bob_chemistry_submission.pdf',
    timeSpent: 40,
    attempts: 1,
    detailedFeedback: null
  },
  {
    id: 8,
    studentName: 'Bob',
    worksheetId: 8,
    status: 'Graded',
    score: 91,
    aiFeedback: 'Outstanding knowledge of geographical concepts!',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Charlie's submissions
  {
    id: 9,
    studentName: 'Charlie',
    worksheetId: 3,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 10,
    studentName: 'Charlie',
    worksheetId: 6,
    status: 'Graded',
    score: 65,
    aiFeedback: 'Basic understanding shown, but needs more depth in analysis.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 11,
    studentName: 'Charlie',
    worksheetId: 9,
    status: 'Disputed',
    score: 72,
    aiFeedback: 'Good effort on Renaissance art, but timeline confusion noted.',
    isDisputed: true,
    disputeReason: 'AI incorrectly dated several artworks by decades.',
    teacherOverride: null
  },

  // David's submissions
  {
    id: 12,
    studentName: 'David',
    worksheetId: 4,
    status: 'Graded',
    score: 95,
    aiFeedback: 'Exceptional work! Perfect understanding of biological processes.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 13,
    studentName: 'David',
    worksheetId: 7,
    status: 'Graded',
    score: 89,
    aiFeedback: 'Excellent problem-solving approach. Code is clean and efficient.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 14,
    studentName: 'David',
    worksheetId: 10,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Emma's submissions
  {
    id: 15,
    studentName: 'Emma',
    worksheetId: 5,
    status: 'Graded',
    score: 82,
    aiFeedback: 'Good grasp of chemical concepts. Practice balancing equations.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 16,
    studentName: 'Emma',
    worksheetId: 8,
    status: 'Graded',
    score: 87,
    aiFeedback: 'Well-researched geographical analysis. Good use of examples.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 17,
    studentName: 'Emma',
    worksheetId: 11,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Frank's submissions
  {
    id: 18,
    studentName: 'Frank',
    worksheetId: 1,
    status: 'Graded',
    score: 76,
    aiFeedback: 'Basic concepts understood. Work on algebraic manipulation.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 19,
    studentName: 'Frank',
    worksheetId: 6,
    status: 'Graded',
    score: 83,
    aiFeedback: 'Good literary analysis. Consider author intent more deeply.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 20,
    studentName: 'Frank',
    worksheetId: 12,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Grace's submissions
  {
    id: 21,
    studentName: 'Grace',
    worksheetId: 3,
    status: 'Graded',
    score: 94,
    aiFeedback: 'Outstanding physics work! Excellent problem-solving approach.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 22,
    studentName: 'Grace',
    worksheetId: 9,
    status: 'Graded',
    score: 90,
    aiFeedback: 'Beautiful analysis of artistic movements. Well done!',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Henry's submissions
  {
    id: 23,
    studentName: 'Henry',
    worksheetId: 7,
    status: 'Graded',
    score: 67,
    aiFeedback: 'Basic programming concepts shown. Needs more practice with algorithms.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 24,
    studentName: 'Henry',
    worksheetId: 10,
    status: 'Graded',
    score: 73,
    aiFeedback: 'Understanding of basic economic principles. Work on real-world applications.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Isabella's submissions
  {
    id: 25,
    studentName: 'Isabella',
    worksheetId: 4,
    status: 'Pending',
    score: null,
    aiFeedback: '',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 26,
    studentName: 'Isabella',
    worksheetId: 5,
    status: 'Graded',
    score: 86,
    aiFeedback: 'Good understanding of chemical processes. Practice stoichiometry.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },

  // Additional detailed evaluations for better demo
  {
    id: 27,
    studentName: 'Alice',
    worksheetId: 11,
    status: 'Graded',
    score: 96,
    aiFeedback: 'Exceptional calculus work! Your derivative solutions are perfect. The integral calculations show deep understanding of fundamental theorem concepts. Keep up this outstanding performance!',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 28,
    studentName: 'Bob',
    worksheetId: 11,
    status: 'Graded',
    score: 79,
    aiFeedback: 'Good progress on calculus fundamentals. Your derivative work is solid, but integration techniques need more practice. Focus on u-substitution and integration by parts. Review the fundamental theorem of calculus.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 29,
    studentName: 'Charlie',
    worksheetId: 11,
    status: 'Graded',
    score: 68,
    aiFeedback: 'Basic calculus concepts are emerging. Work on derivative rules and basic integration. Practice limits and continuity. Consider reviewing pre-calculus foundations before advancing.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 30,
    studentName: 'David',
    worksheetId: 12,
    status: 'Graded',
    score: 93,
    aiFeedback: 'Outstanding historical analysis! Your understanding of Roman political systems and military strategies is excellent. The timeline accuracy and contextual connections are particularly strong.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 31,
    studentName: 'Emma',
    worksheetId: 12,
    status: 'Graded',
    score: 84,
    aiFeedback: 'Well-researched Roman history work. Good understanding of key events and figures. Work on connecting broader historical contexts and analyzing cause/effect relationships more deeply.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 32,
    studentName: 'Frank',
    worksheetId: 5,
    status: 'Graded',
    score: 71,
    aiFeedback: 'Basic chemistry concepts understood. Chemical reaction types are identified correctly, but balancing equations and stoichiometry calculations need significant improvement. Practice with mole conversions.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 33,
    studentName: 'Grace',
    worksheetId: 7,
    status: 'Graded',
    score: 97,
    aiFeedback: 'Exceptional programming! Your algorithm design is sophisticated, code structure is clean, and documentation is thorough. The problem-solving approach demonstrates advanced computational thinking.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 34,
    studentName: 'Henry',
    worksheetId: 8,
    status: 'Graded',
    score: 75,
    aiFeedback: 'Geography fundamentals are developing. Map reading skills are adequate, but geographical analysis and connections to human/environmental factors need strengthening. Practice with case studies.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 35,
    studentName: 'Isabella',
    worksheetId: 10,
    status: 'Graded',
    score: 88,
    aiFeedback: 'Strong economics understanding! Your analysis of supply/demand curves and market equilibrium is excellent. Consider exploring real-world applications and current economic events for deeper insights.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 36,
    studentName: 'Alice',
    worksheetId: 8,
    status: 'Graded',
    score: 89,
    aiFeedback: 'Excellent geographical analysis! Your understanding of climate patterns, population distribution, and human-environment interactions is comprehensive. Maps and data interpretation are particularly strong.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 37,
    studentName: 'Bob',
    worksheetId: 4,
    status: 'Graded',
    score: 82,
    aiFeedback: 'Good biology foundation. Cell structure identification is accurate, but cellular processes and functions need more detailed explanation. Practice with microscopy and cell function relationships.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 38,
    studentName: 'Charlie',
    worksheetId: 5,
    status: 'Graded',
    score: 69,
    aiFeedback: 'Chemical basics are emerging. Reaction types are identified, but equation balancing and mole calculations are inconsistent. Focus on fundamental stoichiometry and periodic table relationships.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 39,
    studentName: 'David',
    worksheetId: 3,
    status: 'Graded',
    score: 91,
    aiFeedback: 'Outstanding physics work! Your understanding of mechanics, energy conservation, and problem-solving methodology is excellent. Mathematical applications are particularly strong.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 40,
    studentName: 'Emma',
    worksheetId: 7,
    status: 'Graded',
    score: 85,
    aiFeedback: 'Solid programming foundation. Code structure is good and logic is sound. Work on algorithm optimization and error handling. Consider learning data structures for more complex problems.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 41,
    studentName: 'Frank',
    worksheetId: 8,
    status: 'Graded',
    score: 78,
    aiFeedback: 'Geography concepts are developing well. Map skills and basic geographical knowledge are good. Focus on analytical thinking and connecting geography to real-world issues and human impacts.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 42,
    studentName: 'Grace',
    worksheetId: 12,
    status: 'Graded',
    score: 95,
    aiFeedback: 'Exceptional historical scholarship! Your analysis of Roman civilization shows deep understanding of political, social, and cultural developments. Primary source connections are particularly insightful.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 43,
    studentName: 'Henry',
    worksheetId: 4,
    status: 'Graded',
    score: 72,
    aiFeedback: 'Biology basics are progressing. Cell structure knowledge is adequate, but understanding of cellular processes and biological systems needs more development. Practice with cell function applications.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 44,
    studentName: 'Isabella',
    worksheetId: 3,
    status: 'Graded',
    score: 87,
    aiFeedback: 'Strong physics understanding! Mechanics problems are solved correctly with good methodology. Work on advanced topics like energy conservation and momentum. Consider real-world physics applications.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 45,
    studentName: 'Alice',
    worksheetId: 10,
    status: 'Graded',
    score: 90,
    aiFeedback: 'Excellent economics analysis! Your understanding of market structures, elasticity, and economic decision-making is sophisticated. Real-world applications and current events connections are particularly strong.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 46,
    studentName: 'Bob',
    worksheetId: 12,
    status: 'Graded',
    score: 80,
    aiFeedback: 'Good historical work with solid research. Roman history facts are accurate, but analysis of cause/effect relationships and broader implications could be deeper. Practice connecting events to larger historical themes.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 47,
    studentName: 'Charlie',
    worksheetId: 7,
    status: 'Graded',
    score: 64,
    aiFeedback: 'Programming basics are emerging. Code runs but logic errors are present. Focus on fundamental programming concepts, syntax accuracy, and step-by-step problem solving. Consider starting with simpler algorithms.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 48,
    studentName: 'David',
    worksheetId: 5,
    status: 'Graded',
    score: 94,
    aiFeedback: 'Outstanding chemistry work! Your understanding of reaction mechanisms, stoichiometry, and chemical principles is exceptional. Laboratory applications and theoretical connections are particularly impressive.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 49,
    studentName: 'Emma',
    worksheetId: 3,
    status: 'Graded',
    score: 83,
    aiFeedback: 'Solid physics foundation. Mechanics problems are generally correct, but units and significant figures need attention. Practice with more complex multi-step problems and real-world applications.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  },
  {
    id: 50,
    studentName: 'Frank',
    worksheetId: 4,
    status: 'Graded',
    score: 77,
    aiFeedback: 'Biology concepts are developing. Cell structure knowledge is good, but connections to larger biological systems and processes need strengthening. Practice with cellular function applications.',
    isDisputed: false,
    disputeReason: '',
    teacherOverride: null
  }
];

// Custom hook for managing mock data
export const useMockData = () => {
  const [worksheets, setWorksheets] = useState(() => {
    // Force reload new data - comment out localStorage loading temporarily
    // const saved = localStorage.getItem('worksheets');
    // return saved ? JSON.parse(saved) : initialWorksheets;
    return initialWorksheets;
  });
  const [submissions, setSubmissions] = useState(() => {
    // Force reload new data - comment out localStorage loading temporarily
    // const saved = localStorage.getItem('submissions');
    // return saved ? JSON.parse(saved) : initialSubmissions;
    return initialSubmissions;
  });
  const [adminReports, setAdminReports] = useState(() => {
    // Force reload new data - comment out localStorage loading temporarily
    // const saved = localStorage.getItem('adminReports');
    // return saved ? JSON.parse(saved) : [
    return [
      {
        timestamp: '2024-02-10T14:30:00Z',
        submissionId: 3,
        studentName: 'Alice',
        worksheetId: 2,
        subject: 'History',
        llmUsed: 'Gemini 1.5',
        aiFeedback: 'Needs improvement in historical context.',
        disputeReason: 'The AI missed key dates in the timeline.',
        recommendedAction: 'Review LLM performance on historical timelines'
      },
      {
        timestamp: '2024-02-12T09:15:00Z',
        submissionId: 11,
        studentName: 'Charlie',
        worksheetId: 9,
        subject: 'Art',
        llmUsed: 'Gemini 1.5',
        aiFeedback: 'Good effort on Renaissance art, but timeline confusion noted.',
        disputeReason: 'AI incorrectly dated several artworks by decades.',
        recommendedAction: 'Improve art history knowledge base for AI models'
      },
      {
        timestamp: '2024-02-14T16:45:00Z',
        submissionId: 23,
        studentName: 'Henry',
        worksheetId: 7,
        subject: 'Computer Science',
        llmUsed: 'Claude 3',
        aiFeedback: 'Basic programming concepts shown. Needs more practice with algorithms.',
        disputeReason: 'AI feedback too generic for programming assignments',
        recommendedAction: 'Enhance code analysis capabilities for programming tasks'
      }
    ];
  });

  // Mock curriculum data
  const curriculum = {
    classes: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'AP/IB'],
    subjects: {
      'Grade 9': ['Biology', 'Math', 'History', 'English', 'Geography'],
      'Grade 10': ['Chemistry', 'Physics', 'English', 'World History', 'Computer Science'],
      'Grade 11': ['Advanced Biology', 'Pre-Calculus', 'US History', 'Literature', 'Economics'],
      'Grade 12': ['AP Chemistry', 'Calculus', 'Government', 'Creative Writing', 'Psychology'],
      'AP/IB': ['AP Physics', 'AP Calculus BC', 'AP Literature', 'IB Economics', 'AP Computer Science']
    },
    chapters: {
      'Biology': ['Cell Structure', 'Genetics', 'Ecosystems', 'Evolution', 'Human Anatomy'],
      'Math': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
      'History': ['Ancient Civilizations', 'World Wars', 'Modern Era', 'Civil Rights', 'Global Conflicts'],
      'Chemistry': ['Atomic Structure', 'Chemical Reactions', 'Organic Chemistry', 'Thermodynamics', 'Acids & Bases'],
      'Physics': ['Mechanics', 'Electricity', 'Thermodynamics', 'Waves', 'Quantum Physics'],
      'English': ['Literature', 'Grammar', 'Writing', 'Poetry', 'Shakespeare'],
      'Computer Science': ['Programming Basics', 'Data Structures', 'AI', 'Web Development', 'Algorithms'],
      'Geography': ['World Geography', 'Human Geography', 'Physical Geography', 'Cartography', 'Climate'],
      'Economics': ['Microeconomics', 'Macroeconomics', 'Global Trade', 'Finance', 'Economic Systems'],
      'Art': ['Drawing', 'Painting', 'Sculpture', 'Digital Art', 'Art History'],
      'Advanced Biology': ['Molecular Biology', 'Biotechnology', 'Neuroscience', 'Immunology'],
      'Pre-Calculus': ['Functions', 'Trigonometry', 'Matrices', 'Sequences'],
      'US History': ['Colonial Period', 'Civil War', 'Industrial Revolution', 'Modern America'],
      'Literature': ['American Literature', 'British Literature', 'World Literature', 'Poetry Analysis'],
      'AP Chemistry': ['Advanced Reactions', 'Kinetics', 'Equilibrium', 'Electrochemistry'],
      'Calculus': ['Limits', 'Derivatives', 'Integrals', 'Series', 'Multivariable Calculus'],
      'Government': ['Political Systems', 'Constitution', 'Public Policy', 'International Relations'],
      'Creative Writing': ['Fiction', 'Non-Fiction', 'Poetry', 'Screenwriting'],
      'Psychology': ['Cognitive Psychology', 'Developmental Psychology', 'Social Psychology', 'Abnormal Psychology'],
      'AP Physics': ['Mechanics', 'Electricity & Magnetism', 'Thermodynamics', 'Modern Physics'],
      'AP Calculus BC': ['Advanced Integration', 'Series', 'Parametric Equations', 'Polar Coordinates'],
      'AP Literature': ['Advanced Literary Analysis', 'Critical Theory', 'Comparative Literature'],
      'IB Economics': ['International Trade', 'Development Economics', 'Environmental Economics'],
      'AP Computer Science': ['Advanced Algorithms', 'Data Structures', 'Software Engineering', 'AI/ML']
    }
  };

  // Save to localStorage
  useEffect(() => {
    // Temporarily disabled to force fresh data load
    // localStorage.setItem('worksheets', JSON.stringify(worksheets));
  }, [worksheets]);

  useEffect(() => {
    // Temporarily disabled to force fresh data load
    // localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    // Temporarily disabled to force fresh data load
    // localStorage.setItem('adminReports', JSON.stringify(adminReports));
  }, [adminReports]);

  // Function to add a new worksheet
  const addWorksheet = (newWorksheet) => {
    const worksheetWithId = {
      ...newWorksheet,
      id: worksheets.length + 1
    };
    setWorksheets(prev => [...prev, worksheetWithId]);
  };

  // Function to get submissions based on role
  // For teacher: all submissions
  // For student: only their own (assuming studentName is 'Alice' for demo)
  const getSubmissionsForRole = (role, studentName = 'Alice') => {
    if (role === 'teacher') {
      return submissions;
    }
    return submissions.filter(submission => submission.studentName === studentName);
  };

  // Optional: Function to add a submission (if needed later)
  const addSubmission = (newSubmission) => {
    const submissionWithId = {
      ...newSubmission,
      id: submissions.length + 1,
      isDisputed: false,
      disputeReason: '',
      teacherOverride: null
    };
    setSubmissions(prev => [...prev, submissionWithId]);
  };

  // Function to dispute a submission
  const disputeSubmission = (id, reason) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === id ? { ...sub, status: 'Disputed', isDisputed: true, disputeReason: reason } : sub
    ));
  };

  // Function to resolve dispute
  const resolveDispute = (id, approved, newScore = null) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === id ? {
        ...sub,
        status: 'Graded',
        isDisputed: false,
        score: approved && newScore !== null ? newScore : sub.score,
        teacherOverride: approved ? newScore : null
      } : sub
    ));
  };

  // Function to report to admin
  const reportToAdmin = (submission) => {
    const report = {
      timestamp: new Date().toISOString(),
      submissionId: submission.id,
      studentName: submission.studentName,
      worksheetId: submission.worksheetId,
      subject: worksheets.find(w => w.id === submission.worksheetId)?.subject || 'Unknown',
      llmUsed: worksheets.find(w => w.id === submission.worksheetId)?.assignedLLM || 'Unknown',
      aiFeedback: submission.aiFeedback,
      disputeReason: submission.disputeReason,
      recommendedAction: 'Review LLM performance on similar tasks'
    };
    setAdminReports(prev => [...prev, report]);
    console.log('Admin Report:', JSON.stringify(report, null, 2));
    // In real app, send to server
  };

  return {
    worksheets,
    submissions,
    adminReports,
    curriculum,
    addWorksheet,
    getSubmissionsForRole,
    addSubmission,
    disputeSubmission,
    resolveDispute,
    reportToAdmin
  };
};