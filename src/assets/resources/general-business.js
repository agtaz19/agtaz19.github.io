import { leaf, group, section } from "./helpers.js";

// General Business resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const generalBusinessSection = section("general-business", "General Business", [
  group(
    "Supply Chain Management",
    [
      group("Foundational Concepts & Frameworks", [
        leaf(
          "MIT OpenCourseWare – Supply Chain Management",
          "https://ocw.mit.edu/courses/supply-chain-management/",
        ),
        leaf(
          "Coursera – Supply Chain Logistics (Rutgers University)",
          "https://www.coursera.org/learn/supply-chain-logistics",
        ),
        leaf(
          "Investopedia – Supply Chain Overview",
          "https://www.investopedia.com/terms/s/supplychain.asp",
        ),
      ]),
      group("Operations, Analytics, & Resilience", [
        leaf(
          "Harvard Business Review – Supply Chain Strategy",
          "https://hbr.org/topic/supply-chain",
        ),
        leaf(
          "McKinsey Insights – Operations & Supply Chains",
          "https://www.mckinsey.com/capabilities/operations/our-insights",
        ),
        leaf("NC State Supply Chain Resource Cooperative", "https://scm.ncsu.edu/scm-articles/"),
      ]),
    ],
    "Emphasis on operations, logistics, procurement, resilience, analytics, and global supply networks.",
  ),
  group(
    "Entrepreneurship & Venture Building",
    [
      group("Startup Fundamentals", [
        leaf("Y Combinator – Startup School", "https://www.startupschool.org/"),
        leaf("Entrepreneur.com – Startup & Growth Guides", "https://www.entrepreneur.com/guides"),
        leaf(
          "Investopedia – Entrepreneurship Concepts",
          "https://www.investopedia.com/entrepreneurship-4689814",
        ),
      ]),
      group("Strategy, Scaling, & Capital", [
        leaf(
          "Harvard Business School – Entrepreneurship Articles",
          "https://www.hbs.edu/faculty/Pages/browse.aspx?topic=Entrepreneurship",
        ),
        leaf(
          "Kauffman Foundation – Entrepreneurship Research",
          "https://www.kauffman.org/resources/",
        ),
        leaf(
          "Sequoia Capital – Founder & Company Building Resources",
          "https://www.sequoiacap.com/article/",
        ),
      ]),
    ],
    "Focus on ideation, validation, fundraising, scaling, and founder decision-making.",
  ),
  group(
    "Executive Branding & Corporate Identity",
    [
      group("Corporate & Executive Branding", [
        leaf(
          "Harvard Business Review – Brand Management",
          "https://hbr.org/topic/brand-management",
        ),
        leaf("Interbrand – Brand Strategy Insights", "https://www.interbrand.com/thinking/"),
        leaf(
          "McKinsey – Branding, Growth, and Marketing Strategy",
          "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights",
        ),
      ]),
      group("Leadership Presence & Reputation", [
        leaf(
          "Forbes – Executive Leadership & Brand",
          "https://www.forbes.com/executive-leadership/",
        ),
        leaf("Wharton Knowledge – Strategy & Leadership", "https://knowledge.wharton.upenn.edu/"),
        leaf("Edelman Trust Barometer", "https://www.edelman.com/trust"),
      ]),
    ],
    "Resources aimed at senior leaders responsible for positioning, reputation, and long-term brand equity.",
  ),
  group(
    "General Business Strategy & Management",
    [
      leaf("MIT Sloan OpenCourseWare", "https://ocw.mit.edu/courses/sloan-school-of-management/"),
      leaf("Strategy+Business", "https://www.strategy-business.com/"),
      leaf("Boston Consulting Group – Publications", "https://www.bcg.com/publications"),
    ],
    "Cross-cutting resources relevant to executives, consultants, and operators.",
  ),
]);
