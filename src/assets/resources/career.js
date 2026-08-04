import { leaf, group, section } from "./helpers.js";

// Career resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const careerSection = section("career", "Career", [
    group(
        "Career & Advice",
        [
            group(
                "Finding Your Calling",
                [
                    leaf("How To Do What You Love – Y Combinator", "https://paulgraham.com/love.html"),
                    leaf("Hell Yeah Or No – Derek Sivers", "https://sivers.org/hellyeah"),
                    leaf("How To Pick A Career – Tim Urban", "https://waitbutwhy.com/2018/12/pick-a-career.html"),
                    leaf("Make Your Work Your Calling – Arthur Brooks", "https://www.theatlantic.com/family/archive/2025/06/how-to-find-a-calling-career-advice/683269/"),
                    leaf("Guide To Career Planning – Marc Andreessen", "https://pmarchive.com/guide_to_career_planning.html"),
                    leaf("What Color is Your Parachute – Richard N. Bolles", "https://www.parachutebook.com/"),
                ],
                "Resources and insights on discovering your purpose and choosing the right career path",
            ),
            group(
                    "Career Growth and Management",
                    [
                        leaf(
                            "High Output Management - Andrew Grove",
                            "https://www.goodreads.com/book/show/3252.High_Output_Management",
                            "Andrew Grove's classic framework on team performance, operational leverage, and management strategies.",
                        ),
                        leaf(
                            "The Manager's Path - Camille Fournier",
                            "https://www.oreilly.com/library/view/the-managers-path/9781491973890/",
                            "Camille Fournier's roadmap for navigating technical career growth from individual contributor to engineering leader.",
                        ),
                        leaf(
                            "Staff Engineer: Leadership Beyond the Management Track - Will Larson",
                            "https://staffeng.com/book",
                            "Will Larson's guide on how to scale technical impact, secure promotions, and lead without entering the people-management track.",
                        ),
                        leaf(
                            "Harvard Business Review - Performance Management Guide",
                            "https://hbr.org/topic/performance-management",
                            "Actionable strategies and frameworks for conducting performance reviews, goal setting, and continuous feedback.",
                        ),
                        leaf(
                            "Radical Candor - Kim Scott",
                            "https://www.radicalcandor.com/",
                            "Kim Scott's framework for driving results through caring personally and challenging directly in professional relationships.",
                        ),
                    ],
                    "Strategies for managing performance, promotions, and professional development",
                )
        ],
    ),
]);
