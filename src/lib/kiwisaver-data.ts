/**
 * KiwiSaver rate data for programmatic SEO pages.
 * Each entry generates a /kiwisaver-[slug] page targeting KiwiSaver-related search queries.
 */

export interface KiwiSaverFAQ {
  question: string;
  answer: string;
}

export interface KiwiSaverEntry {
  slug: string;
  rate: number;
  rateDecimal: number;
  description: string;
  faqs: KiwiSaverFAQ[];
}

export const kiwiSaverRates: KiwiSaverEntry[] = [
  {
    slug: "3-percent",
    rate: 3,
    rateDecimal: 0.03,
    description:
      "A 3% KiwiSaver contribution rate is the minimum employee contribution rate and the default rate for new KiwiSaver members in New Zealand. When you first start a new job and are automatically enrolled in KiwiSaver, your contributions are set at 3% of your gross salary unless you actively choose a different rate. This is also the rate that matches your employer's minimum compulsory contribution of 3%, meaning at this level, both you and your employer contribute equally to your retirement fund. For an employee earning the median salary of approximately $62,000, a 3% contribution amounts to $1,860 per year, or about $71.54 per fortnight. Combined with the employer's matching 3%, your KiwiSaver account receives $3,720 annually before investment returns. Over a 30-year career at the median salary with average annual returns of 5%, these combined contributions could grow to approximately $250,000 in today's terms. While 3% is the most affordable KiwiSaver rate and preserves the most take home pay, financial advisors generally recommend contributing at a higher rate if your budget allows, since the power of compound returns means that even small increases in contribution rates can result in significantly larger retirement balances. The 3% rate is popular among workers who are managing tight budgets, paying off debt such as student loans or mortgages, or who have other investments and savings vehicles outside of KiwiSaver. It is important to note that even at the minimum 3% rate, KiwiSaver provides valuable benefits including employer contributions, potential government contributions through the Member Tax Credit (up to $521.43 per year), and disciplined, automatic saving for retirement.",
    faqs: [
      {
        question: "Is 3% KiwiSaver enough for retirement in NZ?",
        answer:
          "Contributing 3% to KiwiSaver may not be sufficient on its own for a comfortable retirement, depending on your income and lifestyle expectations. At 3% with a median salary and employer matching, you might accumulate around $250,000-$350,000 over a 30-year career, supplementing New Zealand Superannuation. Most financial advisors recommend contributing at least 4-6% to build a more comfortable retirement fund. However, 3% is a good starting point, especially if you have other savings, investments, or expect to receive an inheritance. The key is to start early and increase your rate when you can afford to.",
      },
      {
        question: "Can I change my KiwiSaver rate from 3%?",
        answer:
          "Yes, you can change your KiwiSaver contribution rate at any time by notifying your employer in writing. The available rates are 3%, 4%, 6%, 8%, and 10% of your gross pay. Your employer must action the change from the next pay period after receiving your written request. You can also change your KiwiSaver provider at any time by contacting your preferred provider directly. Changing your rate does not affect your employer's minimum 3% contribution. You can increase or decrease your rate as often as you need to match your financial circumstances.",
      },
      {
        question: "Does my employer have to match my 3% KiwiSaver?",
        answer:
          "Yes, if you are a KiwiSaver member and contributing from your salary, your employer is legally required to contribute a minimum of 3% of your gross pay to your KiwiSaver account. This employer contribution is on top of your salary, not deducted from it. However, the employer contribution is subject to Employer Superannuation Contribution Tax (ESCT), which varies from 10.5% to 33% depending on your income level. Some employers may choose to contribute more than 3%, but the legal minimum is 3%.",
      },
    ],
  },
  {
    slug: "4-percent",
    rate: 4,
    rateDecimal: 0.04,
    description:
      "A 4% KiwiSaver contribution rate is one step above the minimum and represents a moderate savings approach that balances current take home pay with retirement savings goals. This rate was historically the default contribution rate in New Zealand before it was reduced to 3%. Many KiwiSaver members who have been in the scheme for some time remain on 4%, and it continues to be a popular choice for workers who want to save a little more without a dramatic impact on their pay packet. For an employee earning the median salary of approximately $62,000, a 4% contribution amounts to $2,480 per year, or about $95.38 per fortnight. This is only $620 more per year (about $23.85 per fortnight) compared to the 3% rate. Combined with the employer's 3% contribution of $1,860, your KiwiSaver account receives a total of $4,340 annually before investment returns. Over a 30-year career at the median salary with average annual investment returns of 5%, the combined contributions at 4% plus employer 3% could grow to approximately $290,000-$330,000, a meaningful improvement over the 3% rate. The difference between 3% and 4% may seem small on a fortnightly basis, but over decades, the power of compound returns amplifies this gap significantly. The 4% rate is particularly appealing for workers in their twenties and thirties who are building their career and may have competing financial priorities such as saving for a home deposit, repaying student loans, or managing growing family expenses. It provides a reasonable middle ground that demonstrates financial discipline without placing undue strain on day-to-day budgets. Many financial planners view 4% as the bare minimum for building adequate retirement savings, recommending that members move to 6% or higher as their income grows and debts are paid off.",
    faqs: [
      {
        question: "How much more does 4% KiwiSaver save compared to 3%?",
        answer:
          "At 4% versus 3% KiwiSaver on a $62,000 salary, you contribute an extra $620 per year ($23.85 per fortnight). While this seems modest, over a 30-year career with 5% average annual returns, the additional 1% could grow to approximately $40,000-$50,000 more in your KiwiSaver balance. The earlier you increase your rate, the more impactful the difference due to compound returns. At higher salaries the gap widens further: on $100,000, the extra 1% means $1,000 more per year in contributions.",
      },
      {
        question: "Should I choose 4% or 3% KiwiSaver?",
        answer:
          "If you can comfortably afford the slightly lower take home pay, 4% is generally recommended over 3%. The fortnightly difference is relatively small (around $24 less per fortnight on a $62,000 salary) but compounds significantly over decades. Choose 3% if you are under financial pressure, paying off high-interest debt, or have other active investment strategies. Choose 4% if you want a moderate boost to retirement savings without a major lifestyle change. You can always change your rate later as your circumstances evolve.",
      },
      {
        question: "Was 4% the default KiwiSaver rate previously?",
        answer:
          "Yes, 4% was previously the default KiwiSaver contribution rate for new members before the government reduced it to 3% in 2009 to help households during the global financial crisis. The change was intended to put more money in workers' pockets during tough economic times. Many members who joined before this change remained on 4%, and it continues to be a common rate. Some commentators have argued that the default should be returned to 4% or higher to improve retirement outcomes for New Zealanders.",
      },
    ],
  },
  {
    slug: "6-percent",
    rate: 6,
    rateDecimal: 0.06,
    description:
      "A 6% KiwiSaver contribution rate represents a significant commitment to retirement savings and is often recommended by financial advisors as the ideal rate for most New Zealand workers who can afford it. At 6%, you are contributing double the minimum rate, which has a substantial positive impact on your long-term retirement outcomes. For an employee earning the median salary of approximately $62,000, a 6% contribution amounts to $3,720 per year, or about $143.08 per fortnight. This is $1,860 more per year ($71.54 per fortnight) compared to the minimum 3% rate. Combined with the employer's minimum 3% contribution of $1,860, your KiwiSaver account receives a total of $5,580 annually before investment returns. Over a 30-year career at the median salary with average annual returns of 5%, these combined contributions could grow to approximately $370,000-$430,000, which represents a meaningful difference compared to lower contribution rates. The 6% rate strikes a balance that many financial planners consider optimal for long-term wealth building. It provides nearly double the retirement outcome of the 3% rate while still leaving the majority of your income available for current living expenses. Workers who choose 6% are typically those who have moved past the initial career-building stage and are focused on securing their financial future. They may have already purchased their first home (using the KiwiSaver HomeStart grant and first home withdrawal if eligible), paid off significant debts, and are now in a position to prioritise retirement savings. The additional 3% over the minimum rate demonstrates a proactive approach to financial planning and can make the difference between a modest and a comfortable retirement. It is worth noting that the employer contribution remains at the minimum 3% regardless of your chosen rate, so the additional savings come entirely from your own income. However, the Member Tax Credit from the government (up to $521.43 per year) rewards those who contribute at least $1,042.86 annually, which is easily achieved at the 6% rate for anyone earning above approximately $17,381.",
    faqs: [
      {
        question: "How much does 6% KiwiSaver reduce my take home pay?",
        answer:
          "At 6% KiwiSaver, you contribute double the minimum rate. The impact on take home pay compared to 3% is: on a $50,000 salary, you lose an extra $1,500 per year ($57.69 per fortnight); on $70,000, an extra $2,100 ($80.77 per fortnight); on $100,000, an extra $3,000 ($115.38 per fortnight). While noticeable, many people find they adjust to the lower take home pay quickly and benefit from the significantly improved retirement savings trajectory.",
      },
      {
        question: "Is 6% the best KiwiSaver rate?",
        answer:
          "Many financial advisors consider 6% to be the sweet spot for KiwiSaver contributions, as it provides a strong boost to retirement savings without an excessive reduction in take home pay. However, the best rate depends on your individual circumstances. If you are young with few financial obligations, a higher rate (8% or 10%) can be very powerful due to compound returns. If you are managing a mortgage or other significant expenses, 4% or even 3% may be more appropriate. The best approach is to contribute as much as you can comfortably afford and increase your rate as your financial situation improves.",
      },
      {
        question: "Can I get the full government Member Tax Credit at 6%?",
        answer:
          "Yes, at a 6% contribution rate you will easily qualify for the full annual Member Tax Credit of $521.43 from the government. To receive the full credit, you need to contribute at least $1,042.86 to your KiwiSaver account during the year. At 6% on any salary above approximately $17,400, you will exceed this threshold. This government contribution effectively provides a guaranteed return on your savings, making KiwiSaver an even more attractive retirement savings vehicle.",
      },
    ],
  },
  {
    slug: "8-percent",
    rate: 8,
    rateDecimal: 0.08,
    description:
      "An 8% KiwiSaver contribution rate is a high contribution level that reflects a strong commitment to building substantial retirement savings. This rate is chosen by workers who prioritise their long-term financial security and are willing to accept a meaningful reduction in current take home pay to achieve significantly better retirement outcomes. For an employee earning the median salary of approximately $62,000, an 8% contribution amounts to $4,960 per year, or about $190.77 per fortnight. This is $3,100 more per year ($119.23 per fortnight) compared to the minimum 3% rate, which is a noticeable difference in your pay packet. Combined with the employer's minimum 3% contribution of $1,860, your KiwiSaver account receives a total of $6,820 annually before investment returns. Over a 30-year career at the median salary with average annual returns of 5%, these combined contributions could grow to approximately $450,000-$520,000, providing a much more comfortable retirement position than lower contribution rates. Workers who elect the 8% rate are typically those who have achieved a degree of financial stability and are looking to maximise their retirement savings. They may be mid-career professionals with established incomes, individuals who started saving later and want to make up for lost time, or people who are naturally inclined toward saving and investing. The 8% rate is also popular among workers who are approaching retirement age and want to boost their KiwiSaver balance in the final decades of their career. At this contribution level, the impact on take home pay is significant but manageable for many workers. The trade-off is straightforward: less money now for substantially more money in retirement. It is worth noting that KiwiSaver contributions are not tax-deductible in New Zealand (unlike some retirement schemes in other countries), so the full 8% comes from your after-tax-calculated gross pay. However, the combination of employer contributions, government Member Tax Credit, and the power of compound investment returns makes KiwiSaver at 8% an excellent long-term wealth-building strategy for those who can sustain this level of contribution.",
    faqs: [
      {
        question: "How much does 8% KiwiSaver cost me per fortnight?",
        answer:
          "The fortnightly cost of 8% KiwiSaver depends on your salary. On $50,000, your fortnightly KiwiSaver deduction is $153.85; on $70,000, it is $215.38; on $90,000, it is $276.92; on $100,000, it is $307.69. Compared to the minimum 3% rate, you contribute an extra $96.15 per fortnight on $50,000, $134.62 on $70,000, and $192.31 on $100,000. This is a meaningful reduction in take home pay, but the long-term retirement benefits are substantial.",
      },
      {
        question: "Should I contribute 8% or invest elsewhere?",
        answer:
          "KiwiSaver at 8% offers unique advantages: guaranteed 3% employer match, potential government Member Tax Credit ($521.43/year), and automatic, disciplined saving. However, KiwiSaver funds are generally locked until age 65 (with exceptions for first home purchase or hardship). If you value liquidity and flexibility, you might prefer 3-4% KiwiSaver plus separate investments in managed funds, shares, or property. A balanced approach could be 6% KiwiSaver plus independent investing. Consult a financial advisor for personalised advice based on your goals and timeline.",
      },
      {
        question: "How much will 8% KiwiSaver give me at retirement?",
        answer:
          "The retirement balance from 8% KiwiSaver depends on your salary, years of contribution, and investment returns. As a rough guide, on a $70,000 salary with 8% employee plus 3% employer contributions over 30 years with 5% annual returns, you could accumulate approximately $550,000-$650,000. Over 40 years, this could grow to $900,000-$1,100,000. These are indicative figures only; actual returns depend on your chosen fund type (conservative, balanced, or growth) and market performance. Use a KiwiSaver calculator for detailed projections.",
      },
    ],
  },
  {
    slug: "10-percent",
    rate: 10,
    rateDecimal: 0.10,
    description:
      "A 10% KiwiSaver contribution rate is the maximum employee contribution rate available and represents the most aggressive retirement savings approach within the KiwiSaver framework. Choosing 10% demonstrates an exceptional commitment to building long-term wealth through New Zealand's retirement savings scheme. For an employee earning the median salary of approximately $62,000, a 10% contribution amounts to $6,200 per year, or about $238.46 per fortnight. This is $4,340 more per year ($166.92 per fortnight) compared to the minimum 3% rate, which is a very significant reduction in take home pay. Combined with the employer's minimum 3% contribution of $1,860, your KiwiSaver account receives a total of $8,060 annually before investment returns. Over a 30-year career at the median salary with average annual returns of 5%, these combined contributions could grow to approximately $530,000-$620,000, providing a substantially better retirement position than any lower rate. Over a 40-year career, the balance could approach or exceed $1 million, placing you in a very strong financial position for retirement. Workers who elect the maximum 10% KiwiSaver rate are typically high earners who can absorb the reduced take home pay without compromising their lifestyle, individuals who have no mortgage or other significant debts, people who started saving late and want to accelerate their retirement fund growth, or financially disciplined individuals who prioritise future security over current consumption. The 10% rate is particularly powerful for younger workers due to the longer time horizon for compound growth. A 25-year-old contributing 10% for 40 years will accumulate vastly more than someone who starts at 45 and contributes for 20 years, even at the same rate. It is important to carefully consider whether 10% is sustainable for your budget. While the retirement benefits are excellent, over-committing to KiwiSaver at the expense of emergency savings, debt repayment, or current quality of life may not be wise. Financial advisors generally recommend building an emergency fund of three to six months of expenses before maximising KiwiSaver contributions. Remember that KiwiSaver funds are largely inaccessible until age 65, so liquidity for unexpected expenses must come from other sources.",
    faqs: [
      {
        question: "Is 10% KiwiSaver too much?",
        answer:
          "Whether 10% KiwiSaver is too much depends entirely on your personal financial situation. It is not too much if you have a comfortable income, no high-interest debt, an adequate emergency fund, and can maintain your desired lifestyle. It may be too much if it causes financial stress, prevents you from paying off expensive debt, or leaves you without a financial buffer. A good test: if you would need to take a KiwiSaver contributions holiday within a year, a lower rate might be more sustainable. You can always change your rate, so starting at 10% and adjusting down if needed is a valid approach.",
      },
      {
        question: "How much take home pay do I lose at 10% KiwiSaver?",
        answer:
          "Compared to the minimum 3% rate, 10% KiwiSaver reduces your take home pay by 7% of your gross salary. On $60,000, that is $4,200 per year ($161.54 per fortnight less). On $80,000, it is $5,600 per year ($215.38 per fortnight less). On $100,000, it is $7,000 per year ($269.23 per fortnight less). On $150,000, it is $10,500 per year ($403.85 per fortnight less). The absolute amount increases with salary, but as a percentage of take home pay, the impact is broadly similar across income levels.",
      },
      {
        question: "Does the employer contribute more if I choose 10%?",
        answer:
          "No, the employer's minimum compulsory contribution remains at 3% of your gross pay regardless of your chosen employee rate. Whether you contribute 3% or 10%, your employer contributes 3%. Some employers voluntarily offer higher contributions as part of their employment package, but this is negotiated separately and is not linked to your chosen employee rate. The additional savings from choosing 10% over 3% come entirely from your own pay. However, the combined 10% employee plus 3% employer gives you 13% of your gross salary going into KiwiSaver each year.",
      },
    ],
  },
];
