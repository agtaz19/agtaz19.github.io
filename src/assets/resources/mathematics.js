import { leaf, group, section } from "./helpers.js";

// Mathematics resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const mathematicsSection = section("mathematics", "Mathematics", [
    group(
        "Foundational to Advanced Mathematics",
        [
            group(
                "Foundations & K–12",
                [
                    leaf("Khan Academy – Mathematics", "https://www.khanacademy.org/math"),
                    leaf("CK-12 Foundation", "https://www.ck12.org/student/"),
                    leaf("OpenStax Mathematics Textbooks", "https://openstax.org/subjects/math"),
                ],
                "Foundational Material before entering undergraduate mathematics",
            ),
            group(
                "Core Undergraduate Mathematics",
                [
                    leaf(
                        "MIT OpenCourseWare – Single Variable Calculus",
                        "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
                    ),
                    leaf(
                        "MIT OpenCourseWare – Multivariable Calculus",
                        "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
                    ),
                    leaf(
                        "MIT OpenCourseWare – Linear Algebra (Strang)",
                        "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
                    ),
                    leaf("Paul’s Online Math Notes", "https://tutorial.math.lamar.edu/"),
                    leaf(
                        "MIT OpenCourseWare – Differential Equations",
                        "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
                    ),
                ],
                "These are some core materials used across most if not all forms of undergraduate mathematics",
            ),
            group(
                "Proof, Logic, & Discrete Mathematics",
                [
                    leaf(
                        "MIT OCW – Mathematics for Computer Science",
                        "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
                    ),
                    leaf(
                        "Book of Proof – Richard Hammack",
                        "https://www.people.vcu.edu/~rhammack/BookOfProof/",
                    ),
                    leaf(
                        "Art of Problem Solving – Articles & Problems",
                        "https://artofproblemsolving.com/resources/articles",
                    ),
                ],
                "Proofs can be difficult for undergraduates, here are some resources.",
            ),
            group(
                "Probability & Statistics",
                [
                    leaf(
                        "MIT OCW – Probability and Statistics",
                        "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
                    ),
                    leaf("Harvard Stat 110 – Probability", "https://projects.iq.harvard.edu/stat110/home"),
                    leaf("OpenIntro Statistics", "https://www.openintro.org/book/os/"),
                ],
                "Probability and statistics are very intertwined and they serve as a stepping stone for most of quantitiative finance",
            ),
            group(
                "Advanced & Theoretical Mathematics",
                [
                    leaf(
                        "MIT OCW – Real Analysis",
                        "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
                    ),
                    leaf(
                        "MIT OCW – Abstract Algebra",
                        "https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/",
                    ),
                    leaf("NPTEL – University-Level Mathematics Courses", "https://nptel.ac.in/courses/111"),
                    leaf("3Blue1Brown", "https://www.youtube.com/c/3blue1brown"),
                ],
                "After learning the basics of undergraduate, one can move into more difficult undergraduate topics and possibly even at graduate levels",
            ),
            group(
                "Problems & Challenges",
                [
                    leaf("Project Euler", "https://projecteuler.net/"),
                    leaf("Putnam Competition Archives", "https://kskedlaya.org/putnam-archive/"),
                    leaf("Brilliant.org – Practice Problems", "https://brilliant.org/practice/"),
                ],
                "There are many methods to apply your knowledge through computational means or through problems",
            ),
            group(
                "References & Research",
                [
                    leaf("arXiv – Mathematics", "https://arxiv.org/archive/math"),
                    leaf(
                        "Open Textbook Library – Mathematics",
                        "https://open.umn.edu/opentextbooks/subjects/mathematics",
                    ),
                ],
                "Some relevant research and references to stay up to date on.",
            ),
        ],
        "Public, high-quality resources covering foundational mathematics, undergraduate core topics, proof-based reasoning, probability, and advanced theoretical and applied mathematics.",
    ),
]);