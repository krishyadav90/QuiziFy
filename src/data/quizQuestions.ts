export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  type?: 'text' | 'image';
  imageUrl?: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: Question[];
}

export const quizTopics: QuizTopic[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Test your mathematical skills with algebra, geometry, and calculus problems.",
    duration: "15 min",
    questions: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.15", "3.13", "3.16"],
        correct: 0
      },
      {
        id: 2,
        question: "What is the square root of 144?",
        options: ["11", "12", "13", "14"],
        correct: 1
      },
      {
        id: 3,
        question: "If 3x + 5 = 20, what is the value of x?",
        options: ["3", "4", "5", "6"],
        correct: 2
      },
      {
        id: 4,
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1
      },
      {
        id: 5,
        question: "What is the area of a circle with radius 5?",
        options: ["25π", "10π", "5π", "15π"],
        correct: 0
      },
      {
        id: 6,
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2x²"],
        correct: 1
      },
      {
        id: 7,
        question: "What is 7! (7 factorial)?",
        options: ["5040", "720", "840", "1260"],
        correct: 0
      },
      {
        id: 8,
        question: "What is the slope of the line y = 3x + 2?",
        options: ["2", "3", "5", "1"],
        correct: 1
      },
      {
        id: 9,
        question: "What is the sum of interior angles of a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1
      },
      {
        id: 10,
        question: "What is log₁₀(100)?",
        options: ["1", "2", "10", "100"],
        correct: 1
      }
    ]
  },
  {
    id: "history",
    title: "History",
    description: "Journey through time with questions about world history and civilizations.",
    duration: "12 min",
    questions: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correct: 2
      },
      {
        id: 3,
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Ottoman Empire"],
        correct: 1
      },
      {
        id: 4,
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2
      },
      {
        id: 5,
        question: "Who was known as the 'Iron Lady'?",
        options: ["Queen Elizabeth", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
        correct: 1
      },
      {
        id: 6,
        question: "Which ancient wonder was located in Alexandria?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
        correct: 2
      },
      {
        id: 7,
        question: "What year did the American Civil War begin?",
        options: ["1860", "1861", "1862", "1863"],
        correct: 1
      },
      {
        id: 8,
        question: "Who painted the ceiling of the Sistine Chapel?",
        options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
        correct: 2
      },
      {
        id: 9,
        question: "Which revolution began in 1789?",
        options: ["American Revolution", "French Revolution", "Industrial Revolution", "Russian Revolution"],
        correct: 1
      },
      {
        id: 10,
        question: "Who was the last Tsar of Russia?",
        options: ["Nicholas I", "Alexander III", "Nicholas II", "Alexander II"],
        correct: 2
      }
    ]
  },
  {
    id: "science",
    title: "Science",
    description: "Explore physics, chemistry, and biology concepts in this comprehensive quiz.",
    duration: "18 min",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
      },
      {
        id: 2,
        question: "How many bones are in the adult human body?",
        options: ["196", "206", "216", "226"],
        correct: 1
      },
      {
        id: 3,
        question: "What is the speed of light in vacuum?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
        correct: 0
      },
      {
        id: 4,
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correct: 1
      },
      {
        id: 5,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
        correct: 2
      },
      {
        id: 6,
        question: "What is the atomic number of carbon?",
        options: ["4", "6", "8", "12"],
        correct: 1
      },
      {
        id: 7,
        question: "Which force keeps planets in orbit around the sun?",
        options: ["Electromagnetic force", "Strong nuclear force", "Weak nuclear force", "Gravitational force"],
        correct: 3
      },
      {
        id: 8,
        question: "What is the hardest natural substance on Earth?",
        options: ["Quartz", "Diamond", "Steel", "Titanium"],
        correct: 1
      },
      {
        id: 9,
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correct: 2
      },
      {
        id: 10,
        question: "What gas makes up about 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correct: 2
      },
      {
        id: 11,
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Electron", "Proton"],
        correct: 1
      },
      {
        id: 12,
        question: "Which blood type is known as the universal donor?",
        options: ["A", "B", "AB", "O"],
        correct: 3
      }
    ]
  },
  {
    id: "literature",
    title: "Literature",
    description: "Test your knowledge of classic and modern literature from around the world.",
    duration: "10 min",
    questions: [
      {
        id: 1,
        question: "Who wrote 'Pride and Prejudice'?",
        options: ["Charlotte Brontë", "Jane Austen", "Emily Dickinson", "Virginia Woolf"],
        correct: 1
      },
      {
        id: 2,
        question: "Which Shakespeare play features the character Hamlet?",
        options: ["Macbeth", "Romeo and Juliet", "Hamlet", "Othello"],
        correct: 2
      },
      {
        id: 3,
        question: "Who wrote '1984'?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
        correct: 1
      },
      {
        id: 4,
        question: "What is the first book in the Harry Potter series?",
        options: ["Chamber of Secrets", "Prisoner of Azkaban", "Philosopher's Stone", "Goblet of Fire"],
        correct: 2
      },
      {
        id: 5,
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Toni Morrison", "Maya Angelou", "Zora Neale Hurston"],
        correct: 0
      },
      {
        id: 6,
        question: "Which novel begins with 'It was the best of times, it was the worst of times'?",
        options: ["Great Expectations", "Oliver Twist", "A Tale of Two Cities", "David Copperfield"],
        correct: 2
      },
      {
        id: 7,
        question: "Who wrote 'The Great Gatsby'?",
        options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
        correct: 1
      },
      {
        id: 8,
        question: "What is the epic poem attributed to Homer about the Trojan War?",
        options: ["The Odyssey", "The Iliad", "The Aeneid", "Beowulf"],
        correct: 1
      },
      {
        id: 9,
        question: "Who wrote 'One Hundred Years of Solitude'?",
        options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
        correct: 1
      },
      {
        id: 10,
        question: "Which dystopian novel features the character Winston Smith?",
        options: ["Brave New World", "Fahrenheit 451", "1984", "The Handmaid's Tale"],
        correct: 2
      }
    ]
  },
  {
    id: "geography",
    title: "Geography",
    description: "Explore countries, capitals, landmarks, and natural wonders of our planet.",
    duration: "14 min",
    questions: [
      {
        id: 1,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2
      },
      {
        id: 2,
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correct: 1
      },
      {
        id: 3,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2
      },
      {
        id: 4,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correct: 2
      },
      {
        id: 5,
        question: "Which mountain range contains Mount Everest?",
        options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
        correct: 3
      },
      {
        id: 6,
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Arabian", "Gobi", "Antarctica"],
        correct: 3
      },
      {
        id: 7,
        question: "Which country has the most time zones?",
        options: ["Russia", "United States", "China", "France"],
        correct: 3
      },
      {
        id: 8,
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correct: 2
      },
      {
        id: 9,
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
      },
      {
        id: 10,
        question: "What is the highest waterfall in the world?",
        options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
        correct: 2
      },
      {
        id: 11,
        question: "Which country is both in Europe and Asia?",
        options: ["Russia", "Turkey", "Kazakhstan", "All of the above"],
        correct: 3
      },
      {
        id: 12,
        question: "What is the deepest ocean trench?",
        options: ["Puerto Rico Trench", "Mariana Trench", "Java Trench", "Peru-Chile Trench"],
        correct: 1
      }
    ]
  },
  {
    id: "technology",
    title: "Technology",
    description: "Stay updated with the latest in programming, AI, and digital innovations.",
    duration: "16 min",
    questions: [
      {
        id: 1,
        question: "What does 'HTML' stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 0
      },
      {
        id: 2,
        question: "Who founded Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
        correct: 1
      },
      {
        id: 3,
        question: "What does 'CPU' stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
        correct: 0
      },
      {
        id: 4,
        question: "Which programming language is known for its use in web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
      },
      {
        id: 5,
        question: "What does 'AI' stand for?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Intelligence"],
        correct: 1
      },
      {
        id: 6,
        question: "Which company developed the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correct: 2
      },
      {
        id: 7,
        question: "What is the most popular version control system?",
        options: ["SVN", "Git", "Mercurial", "CVS"],
        correct: 1
      },
      {
        id: 8,
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correct: 1
      },
      {
        id: 9,
        question: "What does 'RAM' stand for?",
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"],
        correct: 0
      },
      {
        id: 10,
        question: "Which social media platform was launched first?",
        options: ["Facebook", "Twitter", "MySpace", "LinkedIn"],
        correct: 2
      },
      {
        id: 11,
        question: "What is the latest version of HTTP?",
        options: ["HTTP/1.1", "HTTP/2", "HTTP/3", "HTTP/4"],
        correct: 2
      },
      {
        id: 12,
        question: "Which company owns YouTube?",
        options: ["Facebook", "Google", "Microsoft", "Amazon"],
        correct: 1
      }
    ]
  }
];