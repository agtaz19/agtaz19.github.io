import { leaf, group, section } from "./helpers.js";

// Quantitative Finance resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const quantFinanceSection = section("quant-finance", "Quantitative Finance", [
    group(
        "Mathematical, Computational, and Financial Foundations",
        [
            group("Mathematical Foundations", [
                group("Probability & Statistics", [
                    leaf(
                        "MIT OCW – Introduction to Probability (6.041)",
                        "https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/",
                    ),
                    leaf(
                        "Harvard Stat 110 – Probability (Blitzstein)",
                        "https://projects.iq.harvard.edu/stat110/home",
                    ),
                    leaf(
                        "MIT OCW – Probability & Statistics (18.05)",
                        "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
                    ),
                ]),
                group("Linear Algebra & Optimization", [
                    leaf(
                        "MIT OCW – Linear Algebra (18.06)",
                        "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
                    ),
                    leaf("Stanford – Convex Optimization (Boyd)", "https://web.stanford.edu/~boyd/cvxbook/"),
                ]),
                group("Stochastic Processes", [
                    leaf(
                        "MIT OCW – Stochastic Processes (18.445)",
                        "https://ocw.mit.edu/courses/18-445-introduction-to-stochastic-processes-spring-2015/",
                    ),
                ]),
            ]),
            group("Programming & Computational Tools", [
                group("Python for Quantitative Finance", [
                    leaf("QuantEcon – Python Lectures", "https://python.quantecon.org/"),
                    leaf("SciPy Lecture Notes", "https://www.scipy-lectures.org/"),
                    leaf("Python for Finance – Companion Notebooks", "https://github.com/yhilpisch/py4fi"),
                ]),
                group("R & Statistical Computing", [
                    leaf("R for Data Science", "https://r4ds.had.co.nz/"),
                    leaf("CRAN Finance Task View", "https://cran.r-project.org/web/views/Finance.html"),
                ]),
                group("C++ (Performance & Derivatives)", [
                    leaf("Baruch MFE – C++ Lecture Materials", "https://mfe.baruch.cuny.edu/curriculum/"),
                ]),
            ]),
            group("Financial Theory", [
                group("Asset Pricing & Markets", [
                    leaf(
                        "MIT OCW – Asset Pricing",
                        "https://ocw.mit.edu/courses/15-415-asset-pricing-fall-2014/",
                    ),
                    leaf("NYU Stern – Damodaran Online", "https://pages.stern.nyu.edu/~adamodar/"),
                ]),
                group("Fixed Income & Interest Rates", [
                    leaf(
                        "MIT OCW – Fixed Income & Analytics",
                        "https://ocw.mit.edu/courses/15-450-analytics-of-finance-fall-2010/",
                    ),
                ]),
                group("Derivatives & Risk Management", [
                    leaf(
                        "MIT OCW – Options & Derivatives",
                        "https://ocw.mit.edu/courses/15-437-options-futures-and-other-derivatives-spring-2006/",
                    ),
                ]),
            ]),
            group("Applied Quantitative Methods", [
                group("Portfolio Theory & Risk", [
                    leaf(
                        "J.P. Morgan – RiskMetrics Technical Documents",
                        "https://www.jpmorgan.com/markets/riskmetrics",
                    ),
                    leaf(
                        "MIT OCW – Portfolio Management",
                        "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                    ),
                ]),
                group("Time Series & Econometrics", [
                    leaf("Forecasting: Principles and Practice (Hyndman)", "https://otexts.com/fpp3/"),
                    leaf(
                        "MIT OCW – Econometrics",
                        "https://ocw.mit.edu/courses/14-32-econometric-data-science-spring-2020/",
                    ),
                ]),
            ]),
            group("Machine Learning in Quant Finance", [
                leaf("Stanford CS229 – Machine Learning", "https://cs229.stanford.edu/"),
                leaf("Elements of Statistical Learning", "https://web.stanford.edu/~hastie/ElemStatLearn/"),
                leaf("QuantEcon – Machine Learning & Economics", "https://quantecon.org/lectures/"),
            ]),
            group("Research, Papers, and Data", [
                leaf("arXiv – Quantitative Finance", "https://arxiv.org/archive/q-fin"),
                leaf("SSRN – Finance Research", "https://www.ssrn.com/index.cfm/en/finance/"),
                leaf("FRED – Federal Reserve Economic Data", "https://fred.stlouisfed.org/"),
                leaf("Quandl – Financial & Economic Data", "https://www.quandl.com/"),
            ]),
            group(
                "Introductory Video into Quantiative Finance & Computational Finance",
                [
                    leaf(
                        "Computation Finance Course Video (1 of 14)",
                        "https://youtu.be/IRMn6JQvU8A?si=oqUWe4r8FsL5YQI_",
                    ),
                    leaf(
                        "Computations In Finance - Youtube Channel",
                        "https://www.youtube.com/@ComputationsInFinance",
                    ),
                    leaf(
                        "GitHub for Lech Grzelak, Instructor",
                        "https://github.com/LechGrzelak/Computational-Finance-Course",
                    ),
                ],
                "Fantastic introduction and general overview into the world of quantitative finance.",
            ),
        ],
        "Public, academically rigorous resources for learning quantitative finance, spanning mathematics, programming, financial theory, and applied quantitative methods.",
    ),
]);