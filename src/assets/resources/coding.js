import { leaf, group, section } from "./helpers.js";

// Coding resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const codingSection = section("coding", "Coding", [
  group(
    "Fundamentals",
    [
      group("Just Starting Out", [
        group("Core Concepts", [
          leaf(
            "Harvard University, EdX, CS50 - Introduction to Computer Science (Python, C, SQL, JavaScript, CSS, HTML)",
            "https://pll.harvard.edu/course/cs50-introduction-computer-science",
            "Argubly the cheapest and most formal broad introduction to programming, abstraction, memory, algorithms, and systems thinking.",
          ),
          leaf(
            "MIT, OpenCourseWare - Introduction to Algorithms (Python)",
            "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
            [
              "A bit more formal and rigorous learnings of algorithms, recommended prerequisites:",
              [
                "(1) Mathematics for Computer Science",
                "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
              ],
              "and",
              [
                "(2) Introduction to Computer Science & Programming in Python",
                "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
              ],
            ],
          ),
          leaf(
            "Princeton, Coursera - Algorithms & Data Structures - graph & string processing algorithms (Java)",
            "https://www.coursera.org/learn/algorithms-part2",
            [
              "Refining knowledge of data structures, algorithmic paradigms, and performance analysis, recommended prerequisite:",
              [
                "Algorithms, Part 1 - Elementry Data Structures, Sorting, Searching Algorithms",
                "https://www.coursera.org/learn/algorithms-part1",
              ],
              ".",
            ],
          ),
        ]),
        group("Theory & Reference", [
          leaf(
            "Big-O Cheat Sheet",
            "https://www.bigocheatsheet.com/",
            "Big O notation is a mathematical concept used to describe the performance or complexity of an algorithm in terms of time or space as the input size grows. It provides an upper bound on the growth rate of a function, helping to classify algorithms based on their efficiency.",
          ),
          leaf(
            "University of San Francisco, Data Structure Visualization",
            "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html",
            "Interactive explainations of trees, graphs, heaps, and hash tables.",
          ),
        ]),
      ]),
      group("Best Practices", [
        group("Code Quality & Design", [
          leaf(
            "Clean Code (Rober C. Martin), Github Summary with Links to Book & Resources",
            "https://gist.github.com/cedrickchee/55ecfbaac643bf0c24da6874bf4feb08",
            "Summary of coding best practices so that the code you make isn't just readable to you in the moment you make it.",
          ),
          leaf(
            "Refactoring Guru",
            "https://refactoring.guru/",
            "Design patterns, anti-patterns, and refactoring techniques.",
          ),
          leaf("The System Design Primer", "https://system-design-primer.takashiidobe.com/", [
            "Scalable systems, trade-offs, and architectural patterns. Additional resource (semi-free):",
            ["System Design School", "https://systemdesignschool.io/"],
          ]),
        ]),
        group("Documentation & Style", [
          leaf(
            "Google Style Guides",
            "https://google.github.io/styleguide/",
            "Cross-language coding conventions.",
          ),
          leaf(
            "Semantic Versioning",
            "https://semantic-versioning.org/",
            "Release and compatibility discipline.",
          ),
        ]),
      ]),
      group("Tooling, Workflow, & Environment", [
        group("Vesion Control", [
          leaf(
            "Git --fast-version-control",
            "https://git-scm.com/",
            "Git fundamentals and advanced workflows, read Pro Git (Scott Chacon & Ben Straub, 2014)",
          ),
          leaf("GitHub Docs", "https://docs.github.com/en", "Pull requests, issues, CI/CD basics."),
        ]),
        group("Development Environments", [
          leaf(
            "VS Code Documentation",
            "https://code.visualstudio.com/Docs",
            "Debugging, extensions, and language servers. VS Code is great with a ton of support, ultimately use the environment that works best for you: Anoconda, JetBrains, and Google Collab is alright as well.",
          ),
          leaf(
            "Mastering Terminal Commands",
            "https://dev.to/kumar_kusumitsharma_b190/-mastering-terminal-commands-a-cross-platform-guide-for-macos-windows-and-linux-59bi",
            "Useful to know as some languages or OS require some knowledge of how to interact with terminal",
          ),
        ]),
        group("Buld, Test, & Deploy", [
          leaf(
            "Testing Pyramid",
            "https://martinfowler.com/articles/practical-test-pyramid.html",
            "Unit vs integration vs system testing.",
          ),
          leaf(
            "Docker Documentation",
            "https://docs.docker.com/",
            "Containerization concepts (even without deep ops focus).",
          ),
        ]),
      ]),
      group("Problem Solving & Practice", [
        group("Algorithms, Challenges, & Interview Prep", [
          leaf(
            "LeetCode",
            "https://leetcode.com/",
            "Standardized algorithm and data structure problems",
          ),
          leaf("HackerRank", "https://www.hackerrank.com/", "Structured tracks across domains"),
          leaf(
            "Codeforces",
            "https://codeforces.com/",
            "Competitive programming and algorithmic depth.",
          ),
          leaf("Exercism", "https://exercism.org/", "Idiomatic practice across languages"),
        ]),
        group("Project-Based Learning", [
          leaf(
            "Build Your Own X",
            "https://github.com/codecrafters-io/build-your-own-x",
            "Implement systems from first principles (databases, compilers, OS components).",
          ),
          leaf(
            "Project Awesome",
            "https://project-awesome.org/",
            "Curated topic-specific resources.",
          ),
          leaf(
            "Open Source Contributions (GitHub Issues labeled “good first issue”)",
            "https://www.freecodecamp.org/news/how-to-find-good-first-issues-on-github/",
            [
              'Find unresolved issues on open source projects to assist and resolve issues that are relatively "straight forward", see a curated list:',
              ["Good First Issue", "https://goodfirstissue.dev/"],
              ".",
            ],
          ),
        ]),
      ]),
      group("Debugging, Performance, & Systems Thinking", [
        group("Debugging", [
          leaf(
            "Rubber Duck Debugging",
            "https://rubberduckdebugging.com/",
            "Conceptual debugging discipline.",
          ),
          leaf(
            "Language-Specific Debugger Docs (GDB, LLDB, browser dev tools)",
            "https://lldb.llvm.org/",
            "Included LLDB as an example.",
          ),
        ]),
        group("Performance & Systems", [
          leaf(
            "Latency Numbers Every Programmer Should Know",
            "https://github.com/MartinKalema/latency-numbers?tab=readme-ov-file",
            "Systems-level intuition.",
          ),
          leaf("High Performance Browser Networking", "https://hpbn.co/", [
            "Practical systems and networking concepts. Book:",
            [
              "High Preformance Browser Networking (Ilya Grigorik)",
              "https://github.com/varunkashyapks/Books/blob/master/High-Performance-Browser-Networking-Ilya-Grigorik.pdf",
            ],
            ".",
          ]),
          leaf(
            "Memory Management Guides",
            "https://www.memorymanagement.org/",
            "Stack vs heap, garbage collection, ownership models.",
          ),
        ]),
      ]),
      group("Math & Logic", [
        group("Mathematics Primers", [
          leaf(
            "MIT, OpenCourseWare - Principles of Discrete Applied Mathematics",
            "https://ocw.mit.edu/courses/18-310-principles-of-discrete-applied-mathematics-fall-2013/",
            "This course is an introduction to discrete applied mathematics. Topics include probability, counting, linear programming, number-theoretic algorithms, sorting, data compression, and error-correcting codes.",
          ),
          leaf(
            "MIT, OpenCourseWare - Linear Algebra",
            "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
            [
              "This is a basic subject on matrix theory and linear algebra. Emphasis is given to topics that will be useful in other disciplines, including systems of equations, vector spaces, determinants, eigenvalues, similarity, and positive definite matrices. Additional supplement:",
              ["3Blue1Brown, Linear Algebra", "https://www.3blue1brown.com/topics/linear-algebra"],
              ".",
            ],
          ),
          leaf(
            "Stanford University - Probability for Computer Scientists",
            "https://chrispiech.github.io/probabilityForComputerScientists/en/",
            [
              "Probability is the science of uncertainty —and in computer science, uncertainty is everywhere. Whether it’s predicting what movie you’ll watch next, how secure your password is, or how long an algorithm might take to run, probability plays a key role. It helps computers make smart guesses, deal with randomness, and perform better in the real world. Additional supplements:",
              [
                "(1) Carnegie Mellon University - Introduction to Probability Computing (Mor Harchol-Balter, 2024)",
                "https://www.cs.cmu.edu/~harchol/Probability/book.html",
              ],
              "and",
              [
                "(2) Probability in Computer Science (Geeks For Geeks)",
                "https://www.geeksforgeeks.org/maths/applications-of-probability/",
              ],
              ".",
            ],
          ),
        ]),
      ]),
      group("Ethics, Security, & Professional Practice", [
        group("Security", [
          leaf(
            "OWSAP Top Ten",
            "https://owasp.org/www-project-top-ten/",
            "A list that outlines the most critical security risks to web applications, serving as a guideline for developers to improve their coding practices and enhance application security.",
          ),
        ]),
        group("Licensing & Professional Practice", [
          leaf(
            "Open Source Initiative - OSI Approved Licenses",
            "https://opensource.org/licenses",
            [
              "Open source licenses are licenses that comply with the Open Source Definition – in brief, they allow software to be freely used, modified, and shared. To be approved by the Open Source Initiative (also known as the OSI) a license must go through the Open Source Initiative’s license review process. Additional supplement:",
              [
                "A Dev’s Guide to Open Source Software Licensing, a Crash Course",
                "https://github.com/readme/guides/open-source-licensing",
              ],
              ".",
            ],
          ),
        ]),
        group("Ethics", [
          leaf(
            "Geeks for Geeks - Computer Ethics",
            "https://www.geeksforgeeks.org/computer-science-fundamentals/computer-ethics/",
            "Worth mentioning, be responsible.",
          ),
        ]),
      ]),
    ],
    "If one was to learn how to code, I would start here as it teaches you discrete thinking, fundamentals, best practices, and problem solving.",
  ),
  group(
    "Python",
    [
      group("Learning & Practice", [
        leaf(
          "Python Tutor",
          "https://pythontutor.com/",
          "Visual step-through execution for beginners.",
        ),
        leaf(
          "Real Python",
          "https://realpython.com/",
          "Practical, applied tutorials with strong explanatory depth.",
        ),
        leaf(
          "Automate the Boring Stuff (Al Sweigart)",
          "https://automatetheboringstuff.com/",
          "Applied scripting and workflow automation.",
        ),
      ]),
      group("Useful Libraries & Resources", [
        leaf("Numpy", "https://numpy.org/"),
        leaf("Pandas", "https://pandas.pydata.org/pandas-docs/stable/index.html"),
        leaf("Matplotlib", "https://matplotlib.org/"),
        group("& much more...", []),
      ]),
    ],
    "Simple, readable, and versatile, suitable for various applications like web development, data analysis, and artificial intelligence.",
  ),
  group(
    "C++",
    [
      group("Learning & Practice", [
        leaf(
          "Learn C++",
          "https://learncpp.com/",
          "Highly structured, modern C++ tutorial sequence.",
        ),
        leaf(
          "Compiler Explorer (Godbolt)",
          "https://godbolt.org/",
          "Understand compilation, optimization, and assembly output.",
        ),
        leaf("C++ Insights", "https://cppinsights.io/", "Visualizes compiler transformations."),
      ]),
      group("Useful Libraries & Resources", [
        leaf("CPP Reference", "https://en.cppreference.com/w/", [
          "De facto standard reference aligned with ISO C++ standards. Additionally, read",
          [
            "ISO C++ Core Guidelines, Github",
            "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines",
          ],
          "for best practices for modern C++",
        ]),
      ]),
    ],
    "C++ is a general-purpose, object-oriented programming language that was designed by Bjarne Stroustrup in 1979 to be an extension of the C language. It has the features of imperative, object-oriented as well as generic programming models. C++ also has some additional facilities to those in C such as classes, inheritance, default function argument, etc. C++ plays quite an integral role in modern times as many contemporary systems such as operating systems, web browsers, databases, etc. have C++ code in at least some part of their codebase. Moreover, C++ is quite useful in performance-critical areas because of its speed.",
  ),
  group(
    "Java",
    [
      group("Learning & Practice", [
        leaf(
          "Java Tutorials (Oracle)",
          "https://docs.oracle.com/javase/tutorial/",
          "Structured walkthroughs from basics to advanced topics, reading heavy.",
        ),
        leaf(
          "Exercism (Java Track)",
          "https://exercism.org/tracks/java",
          "Idiomatic practice with feedback.",
        ),
        leaf(
          "Codecademy (free tier)",
          "https://www.codecademy.com/pricing",
          "Introductory syntax and object-oriented concepts.",
        ),
      ]),
      group("Useful Libraries & Resources", [
        leaf(
          "Open JDK",
          "https://openjdk.org/",
          "Language development and implementation details.",
        ),
        leaf(
          "Maven Central Repository",
          "https://mvnrepository.com/repos/central",
          "Dependency management reference.",
        ),
      ]),
    ],
    "Java is a popular programming language because it is easy to learn, platform-independent, and versatile, allowing developers to create a wide range of applications from web to mobile. Its object-oriented nature and strong community support also make it a reliable choice for both beginners and experienced programmers.",
  ),
  group(
    "SQL",
    [
      group("Learning & Practice", [
        leaf(
          "Mode SQL Tutorial",
          "https://mode.com/sql-tutorial",
          "Data analysis–oriented SQL learning.",
        ),
        leaf(
          "SQL Zoo Tutorial",
          "https://sqlzoo.net/wiki/SQL_Tutorial",
          "Interactive, query-first practice.",
        ),
        leaf("SQL Murder Mystery.", "https://mystery.knightlab.com/", [
          "Using what you learn for fund, additionally see",
          ["LeetCode's Database", "https://leetcode.com/problem-list/database/"],
          "section.",
        ]),
      ]),
      group("Useful Libraries & Resources", [
        leaf(
          "PostgreSQL",
          "https://www.postgresql.org/docs/",
          "Additional object-relational database management system (ORDBMS), opensource",
        ),
        leaf(
          "Database Normalization Guide",
          "https://www.datacamp.com/tutorial/normalization-in-dbms",
          "Schema design fundamentals.",
        ),
        leaf(
          "SQL Cheat Sheet, Basic to Advanced (Geek for Geeks)",
          "https://www.geeksforgeeks.org/sql/sql-cheat-sheet/",
        ),
      ]),
    ],
    "Programming resources emphasizing analytical workflows, data engineering, and production-quality code.",
  ),
  group(
    "Rust",
    [
      group("Learning & Practice", [
        leaf(
          "The Rust Programming Language (“The Book”)",
          "https://doc.rust-lang.org/stable/book/",
          "Primary learning resource maintained by the Rust team.",
        ),
        leaf(
          "Rustlings",
          "https://rustlings.rust-lang.org/",
          "Hands-on exercises aligned with “The Book.”",
        ),
        leaf(
          "Exercism (Rust Track)",
          "https://exercism.org/tracks/rust",
          "Idiomatic problem solving.",
        ),
        leaf(
          "Rust By Example",
          "https://doc.rust-lang.org/stable/rust-by-example/",
          "Pattern-oriented learning.",
        ),
      ]),
      group("Useful Libraries & Resources", [
        leaf(
          "Rust Reference",
          "https://doc.rust-lang.org/stable/reference/",
          "Language grammar and semantics.",
        ),
        leaf(
          "Rust Reference",
          "https://rust-lang.github.io/rfcs/",
          "Design rationale and evolution.",
        ),
        leaf("Crates.io", "https://crates.io/dashboard", "Package ecosystem."),
      ]),
    ],
    "Rust is favored for its focus on memory safety, performance, and reliability, making it ideal for systems programming and applications that require long-term maintenance. It also provides strong compile-time guarantees that help prevent common programming errors, which enhances overall software security.",
  ),
]);
