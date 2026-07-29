import { leaf, group, section } from "./helpers.js";

// Finance resources.
// To add a new link: find the right group() below and add a leaf(...) line
// inside its children array. To add a new topic: add a new group(...) entry.
export const financeSection = section("finance", "Finance", [
  group(
    "General Finance Foundations",
    [
      leaf(
        "Khan Academy – Finance & Capital Markets",
        "https://www.khanacademy.org/economics-finance-domain/core-finance",
      ),
      leaf("MIT OpenCourseWare – Finance Courses", "https://ocw.mit.edu/search/?q=finance"),
      leaf("Investopedia – Financial Concepts & Tutorials", "https://www.investopedia.com"),
      leaf(
        "Aswath Damodaran – Valuation & Corporate Finance",
        "https://aswathdamodaran.blogspot.com/",
      ),
      leaf("NYU Stern – Valuation Course Materials", "https://pages.stern.nyu.edu/~adamodar/"),
    ],
    "Core concepts applicable across all finance roles: accounting, valuation, corporate finance, and financial markets.",
  ),
  group(
    "Investment Banking",
    [
      leaf("Street of Walls – Investment Banking & Modeling", "https://www.streetofwalls.com"),
      leaf(
        "Breaking Into Wall Street – IB Technical Training",
        "https://breakingintowallstreet.com",
      ),
      leaf(
        "Mergers & Inquisitions – IB Career & Technical Guides",
        "https://mergersandinquisitions.com",
      ),
      leaf("Macabacus – Excel, PowerPoint & Financial Modeling", "https://macabacus.com"),
      leaf("Wall Street Oasis – Investment Banking Community", "https://www.wallstreetoasis.com"),
    ],
    "M&A, capital raising, valuation, financial modeling, and transaction execution.",
  ),
  group(
    "Sales & Trading",
    [
      leaf(
        "Yale – Financial Crisis & Markets (Coursera)",
        "https://www.coursera.org/learn/financial-markets-global",
      ),
      leaf("QuantStart – Trading & Quantitative Finance", "https://www.quantstart.com"),
      leaf("Investopedia – Trading & Markets", "https://www.investopedia.com/trading/"),
      leaf(
        "CFA Institute – Capital Markets & Asset Classes",
        "https://www.cfainstitute.org/en/programs/cfa/curriculum",
      ),
      leaf("MarketWatch – Daily Market Commentary", "https://www.marketwatch.com"),
    ],
    "Market microstructure, asset pricing, derivatives, and trading strategies.",
  ),
  group(
    "Management Consulting",
    [
      leaf(
        "McKinsey Insights – Strategy & Operations",
        "https://www.mckinsey.com/featured-insights",
      ),
      leaf("Bain Insights – Business Strategy", "https://www.bain.com/insights/"),
      leaf("BCG Publications – Strategy & Economics", "https://www.bcg.com/publications"),
      leaf("CaseInterview.com – Consulting Case Prep", "https://www.caseinterview.com"),
      leaf("Harvard Business Review", "https://hbr.org"),
    ],
    "Strategy, operations, financial analysis, case interviews, and problem structuring.",
  ),
  group(
    "Restructuring & Distressed Investing",
    [
      leaf("Restructuring Interviews – Technical Prep", "https://restructuringinterviews.com"),
      leaf("American Bankruptcy Institute – Education & Research", "https://www.abiresearch.org"),
      leaf(
        "Investopedia – Distressed Securities",
        "https://www.investopedia.com/terms/d/distressedsecurities.asp",
      ),
      leaf("Turnaround Management Association", "https://www.turnaround.org"),
      leaf(
        "Paul Weiss – Restructuring Insights",
        "https://www.paulweiss.com/practices/transactional/restructuring",
      ),
    ],
    "Bankruptcy, capital structure analysis, distressed valuation, and turnaround strategy.",
  ),
  group(
    "Private Equity & Hedge Funds",
    [
      leaf("Wall Street Prep – LBO & PE Modeling", "https://www.wallstreetprep.com"),
      leaf("Preqin Academy – Private Markets", "https://www.preqin.com/academy"),
      leaf("Value Investors Club", "https://www.valueinvestorsclub.com"),
      leaf("SumZero – Buy-Side Research Community", "https://www.sumzero.com"),
      leaf("CFA Institute – Investment Research", "https://www.cfainstitute.org/en/research"),
    ],
    "Deal underwriting, leveraged buyouts, portfolio management, and investment research.",
  ),
  group(
    "Venture Capital",
    [
      leaf(
        "First Round Review – VC & Startup Operator Insights",
        "https://www.notion.so/First-Round-Review-Resources-1c2b5e2a1fcd4e3bb3e93a54f1b36c5c",
      ),
      leaf("Y Combinator Library – Startup & VC Education", "https://www.ycombinator.com/library"),
      leaf("Andreessen Horowitz – Market & Technology Analysis", "https://a16z.com/content/"),
      leaf("CB Insights – Venture & Industry Research", "https://www.cbinsights.com/research/"),
      leaf("Venture Deals (Brad Feld & Jason Mendelson)", "https://www.venturedeals.com"),
      leaf(
        "Kauffman Fellows – Venture Capital Thought Leadership",
        "https://www.kauffmanfellows.org/insights",
      ),
      leaf(
        "Investopedia – Venture Capital Fundamentals",
        "https://www.investopedia.com/venture-capital-vc-4689747",
      ),
    ],
    "Early-stage investing, startup finance, market sizing, business models, product-market fit, and portfolio support.",
  ),
]);
