/**
 * Salary level data for programmatic SEO pages.
 * Each entry generates a /salary-[slug] page targeting NZ salary-related search queries.
 */

export interface SalaryFAQ {
  question: string;
  answer: string;
}

export interface SalaryEntry {
  slug: string;
  gross: number;
  grossFormatted: string;
  description: string;
  faqs: SalaryFAQ[];
}

export const salaries: SalaryEntry[] = [
  {
    slug: "30000",
    gross: 30000,
    grossFormatted: "$30,000",
    description:
      "A $30,000 annual salary in New Zealand represents a part-time or entry-level income that sits well below the national median salary. At this income level, you are earning approximately $14.42 per hour based on a standard 40-hour work week, which is below the current minimum wage of $23.15 per hour. This means a $30,000 salary is most commonly associated with part-time employment, casual or seasonal work, or reduced-hours positions. Workers in this bracket might include part-time retail assistants, hospitality workers on limited hours, students working alongside their studies, or those in semi-retired roles transitioning out of full-time employment. New Zealand's progressive tax system is particularly favourable at this level, with most of your income taxed at the lower brackets of 10.5% and 17.5%. You would also be eligible for the full Independent Earner Tax Credit (IETC) of $520 per year if you are a tax resident and do not receive income-tested benefits. KiwiSaver contributions at the minimum 3% rate would be $900 per year, with your employer also contributing 3% ($900), helping you build retirement savings even on a modest income. If you have a student loan, repayments would be relatively small at this level since only income above the $22,828 threshold is subject to the 12% repayment rate.",
    faqs: [
      {
        question: "How much tax do I pay on a $30,000 salary in New Zealand?",
        answer:
          "On a $30,000 salary in New Zealand for the 2025-2026 tax year, you would pay approximately $4,158 in PAYE income tax. This is calculated using the progressive tax brackets: 10.5% on the first $15,600 ($1,638) and 17.5% on the remaining $14,400 ($2,520). Your effective tax rate would be around 13.9%, which is relatively low thanks to the progressive system. You may also qualify for the IETC, which could reduce your tax by up to $520 per year.",
      },
      {
        question: "What is the take home pay on $30,000 in NZ?",
        answer:
          "On a $30,000 gross salary with 3% KiwiSaver and no student loan, your approximate annual take home pay would be around $24,882, or about $956 per fortnight. This accounts for PAYE income tax, ACC Earner's Levy of 1.60%, and KiwiSaver employee contributions. If you are eligible for the IETC ($520 credit), your take home would increase slightly. The exact amount depends on your individual circumstances including your KiwiSaver rate and whether you have a student loan.",
      },
      {
        question: "Is $30,000 a good salary in New Zealand?",
        answer:
          "A $30,000 salary is below the New Zealand median income, which is approximately $60,000-$65,000 per year for full-time workers. At $30,000, you would likely find it challenging to cover living expenses in major cities like Auckland or Wellington without additional income sources or financial support. This income level is more typical of part-time roles. However, in smaller regional towns with lower costs of living, it may be more manageable, particularly if you share housing costs or have a partner who also earns an income.",
      },
    ],
  },
  {
    slug: "40000",
    gross: 40000,
    grossFormatted: "$40,000",
    description:
      "A $40,000 annual salary in New Zealand is a common starting-level income for many full-time entry-level positions across various industries. This salary equates to approximately $19.23 per hour based on a 40-hour work week, which is below the current minimum wage of $23.15 per hour for a full-time role, meaning this salary is often seen in salaried positions with additional benefits or in roles with fewer than 40 standard hours. Workers at this salary level may include junior administrative assistants, entry-level customer service representatives, some retail management trainees, or junior roles in smaller regional businesses. At $40,000, you sit below the national median salary and within the income range where the Independent Earner Tax Credit (IETC) provides the full $520 annual benefit, helping to reduce your overall tax burden. The progressive tax system means your effective tax rate remains modest, with the bulk of your income taxed at 10.5% and 17.5%. KiwiSaver contributions at 3% amount to $1,200 per year, and your employer's matching 3% adds another $1,200 to your retirement savings. If you have a student loan, your annual repayment would be approximately $2,061 based on the 12% rate applied to income above the $22,828 threshold. This salary level provides a solid foundation for workers beginning their career in New Zealand, though budgeting carefully is important, especially in higher-cost areas.",
    faqs: [
      {
        question: "How much tax do I pay on a $40,000 salary in NZ?",
        answer:
          "On a $40,000 salary in New Zealand for the 2025-2026 tax year, your PAYE income tax would be approximately $5,908. This breaks down as 10.5% on the first $15,600 ($1,638) and 17.5% on the remaining $24,400 ($4,270). Your effective tax rate would be around 14.8%. As a tax resident earning between $24,000 and $44,000, you would also receive the full IETC of $520, bringing your effective tax obligation down further. Combined with the ACC Earner's Levy of $640, your total deductions before KiwiSaver would be approximately $6,028.",
      },
      {
        question: "What is the fortnightly take home pay on $40,000 in NZ?",
        answer:
          "On a $40,000 gross salary with 3% KiwiSaver, no student loan, and IETC applied, your fortnightly take home pay would be approximately $1,262. This is calculated after deducting PAYE tax, ACC Earner's Levy, and KiwiSaver contributions from your gross fortnightly pay of $1,538.46. Your monthly take home would be around $2,735. These figures are estimates based on the 2025-2026 tax year rates and may vary slightly depending on your specific circumstances.",
      },
      {
        question: "Can I live comfortably on $40,000 in New Zealand?",
        answer:
          "Living on $40,000 in New Zealand requires careful budgeting, particularly in larger cities like Auckland and Wellington where rent and living costs are higher. In Auckland, average rent for a one-bedroom apartment can consume a significant portion of your take home pay. In regional centres like Hamilton, Tauranga, or Christchurch, the cost of living is somewhat lower, making $40,000 more manageable. Many people at this income level flatshare to reduce housing costs. It is achievable but requires discipline with expenses and may leave limited room for discretionary spending or significant savings beyond KiwiSaver.",
      },
    ],
  },
  {
    slug: "50000",
    gross: 50000,
    grossFormatted: "$50,000",
    description:
      "A $50,000 annual salary in New Zealand is close to the national median income for all workers and is a common salary level for experienced workers in many sectors. This equates to approximately $24.04 per hour, which is just above the minimum wage of $23.15 per hour. Roles at this salary level include experienced retail managers, administrative coordinators, trades assistants, junior IT support technicians, teaching aides, and early-career professionals in various fields. At $50,000, you are within the income range where the IETC begins to abate, meaning you would receive a partial credit since your income is above $44,000 but below $48,000. Actually at $50,000 you exceed the $48,000 IETC threshold entirely, so you would not receive this credit. The progressive tax system means your effective tax rate sits around 16.8%, with income taxed across the first two brackets at 10.5% and 17.5%. Your ACC Earner's Levy at 1.60% amounts to $800 per year. KiwiSaver at 3% deducts $1,500 from your pay annually, while your employer contributes an additional $1,500. If you have a student loan, annual repayments would be approximately $3,261 based on the 12% rate on income above the $22,828 threshold. This salary level represents the earnings of a significant proportion of the New Zealand workforce, and while it is not considered a high income, it provides a reasonable standard of living in most parts of the country, especially outside Auckland. Many workers at this level are building their careers and can expect salary growth as they gain experience and qualifications.",
    faqs: [
      {
        question: "How much PAYE tax do I pay on a $50,000 salary in NZ?",
        answer:
          "On a $50,000 salary in New Zealand for the 2025-2026 tax year, your PAYE income tax would be approximately $7,658. This is calculated as: 10.5% on the first $15,600 ($1,638), and 17.5% on the next $34,400 up to $50,000 ($6,020). Your effective tax rate is approximately 15.3%. Additionally, you would pay ACC Earner's Levy of $800 (1.60%), bringing your total tax-related deductions to around $8,458 before KiwiSaver contributions.",
      },
      {
        question: "What is the monthly take home pay on a $50,000 salary in NZ?",
        answer:
          "With a $50,000 gross salary, 3% KiwiSaver contribution, and no student loan, your monthly take home pay would be approximately $3,337. This breaks down as $4,166.67 gross monthly income, less approximately $638 PAYE, $67 ACC Earner's Levy, and $125 KiwiSaver. On a fortnightly basis, you would take home approximately $1,541. These figures are estimates for the 2025-2026 tax year and may vary based on your personal circumstances.",
      },
      {
        question: "Is $50,000 the average salary in New Zealand?",
        answer:
          "The median salary in New Zealand for full-time workers is approximately $60,000-$65,000 per year, so $50,000 is slightly below the median for full-time employment. However, when including part-time workers, the overall median income is lower, and $50,000 sits closer to the middle. The average (mean) salary in NZ is higher than the median due to high earners skewing the figure upward. Your earning potential depends heavily on your industry, qualifications, experience, and location within New Zealand.",
      },
    ],
  },
  {
    slug: "55000",
    gross: 55000,
    grossFormatted: "$55,000",
    description:
      "A $55,000 annual salary in New Zealand is a common income level that falls just below the national median for full-time employees. This equates to approximately $26.44 per hour based on a 40-hour work week. Workers earning $55,000 are found across a wide range of occupations including experienced tradespeople such as electricians and plumbers, mid-level administrative professionals, junior accountants, early-career teachers, social workers in their first years, marketing coordinators, and skilled technicians. At $55,000 you have crossed into the third PAYE tax bracket, meaning a portion of your income between $53,500 and $55,000 is taxed at 30%, while the majority remains in the lower brackets. Your effective tax rate is approximately 17.0%, which is moderate compared to higher earners. You would not be eligible for the Independent Earner Tax Credit (IETC) since your income exceeds the $48,000 upper threshold. KiwiSaver contributions at 3% amount to $1,650 annually, matched by your employer's 3% contribution of the same amount. If you hold a student loan, your annual repayment would be approximately $3,861 at the 12% rate on income above the $22,828 threshold. This salary level represents a transitional point in many New Zealand careers where workers have moved beyond entry-level positions and are establishing themselves in their chosen field. It provides a comfortable standard of living in most New Zealand cities outside of Auckland, where housing costs can stretch this income further. Many workers at this level are mid-career and may be supplementing their income with overtime, secondary employment, or other income sources.",
    faqs: [
      {
        question: "What is my take home pay on a $55,000 salary in New Zealand?",
        answer:
          "On a $55,000 gross salary with 3% KiwiSaver and no student loan, your annual take home pay would be approximately $43,662, which works out to about $1,679 per fortnight or $3,639 per month. Your deductions include approximately $8,108 in PAYE income tax, $880 in ACC Earner's Levy, and $1,650 in KiwiSaver employee contributions. Additionally, your employer would contribute $1,650 to your KiwiSaver account. These figures are estimates for the 2025-2026 NZ tax year.",
      },
      {
        question: "What jobs pay $55,000 in New Zealand?",
        answer:
          "Jobs that typically pay around $55,000 in New Zealand include early-career teachers, junior accountants, experienced retail managers, marketing coordinators, dental assistants, skilled trades workers, customer service team leaders, junior software developers in smaller companies, HR coordinators, and some government administrative roles. Salaries vary by region, with Auckland often paying slightly higher to offset higher living costs. Experience, qualifications, and the specific employer also significantly impact what you can earn.",
      },
      {
        question: "How much KiwiSaver do I contribute on $55,000?",
        answer:
          "On a $55,000 salary, your KiwiSaver contributions depend on your chosen rate: at 3% you contribute $1,650 per year ($63.46 per fortnight), at 4% it is $2,200 ($84.62 per fortnight), at 6% it is $3,300 ($126.92 per fortnight), at 8% it is $4,400 ($169.23 per fortnight), and at 10% it is $5,500 ($211.54 per fortnight). Your employer contributes a minimum of 3% ($1,650 per year) regardless of your chosen rate. Higher contributions reduce your immediate take home pay but increase your retirement savings.",
      },
    ],
  },
  {
    slug: "60000",
    gross: 60000,
    grossFormatted: "$60,000",
    description:
      "A $60,000 annual salary in New Zealand is close to the national median income for full-time workers and represents a solid middle-income position. This equates to approximately $28.85 per hour based on a standard 40-hour work week. Workers earning around $60,000 include experienced teachers, registered nurses in their early years, mid-level public servants, skilled tradespeople with several years of experience, IT support analysts, paralegals, mid-career social workers, and experienced hospitality managers. At $60,000, a portion of your income falls within the third PAYE tax bracket (30% on income between $53,500 and $78,100), resulting in an effective tax rate of approximately 17.6%. This is the salary level where many New Zealanders consider themselves to be earning a reasonable income that allows for a comfortable lifestyle in most parts of the country. KiwiSaver contributions at 3% amount to $1,800 annually, and the employer's matching 3% adds another $1,800 to your retirement fund. If you are repaying a student loan, your annual repayment would be approximately $4,461 based on the 12% rate applied to income exceeding $22,828. At $60,000, you can expect to cover essential living costs including rent, utilities, food, transport, and insurance in most New Zealand cities, with some capacity for savings and discretionary spending. However, in Auckland, where median rents for a one-bedroom apartment can be $400-$550 per week, housing remains the largest budget item and may require flatsharing or living further from the city centre.",
    faqs: [
      {
        question: "How much tax do I pay on $60,000 in New Zealand?",
        answer:
          "On a $60,000 salary in the 2025-2026 tax year, your PAYE income tax would be approximately $9,608. The calculation uses progressive brackets: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), and 30% on $53,501-$60,000 ($1,950). This gives an effective tax rate of 16.0%. Adding the ACC Earner's Levy of $960 (1.60%), your total tax-related deductions come to approximately $10,568 per year before KiwiSaver and any student loan repayments.",
      },
      {
        question: "Is $60,000 a good salary in New Zealand?",
        answer:
          "A $60,000 salary is around the median for full-time workers in New Zealand and is generally considered a decent income. It provides a comfortable lifestyle in most parts of the country, particularly in smaller cities and regional areas. In Auckland, it can be tighter due to higher housing costs. For a single person without dependents, $60,000 is usually sufficient to cover rent, living expenses, and still save some money. For families, it may be more challenging without a second income. Many professionals earn more as they gain experience.",
      },
      {
        question: "What is the weekly take home pay on $60,000 in NZ?",
        answer:
          "On a $60,000 gross salary with 3% KiwiSaver and no student loan, your weekly take home pay would be approximately $913. Your fortnightly take home would be around $1,826, and monthly approximately $3,955. These figures include deductions for PAYE income tax, ACC Earner's Levy, and KiwiSaver employee contributions. Choosing a higher KiwiSaver rate or having a student loan would reduce your take home pay further.",
      },
    ],
  },
  {
    slug: "70000",
    gross: 70000,
    grossFormatted: "$70,000",
    description:
      "A $70,000 annual salary in New Zealand places you above the national median income for full-time workers and reflects a solid middle-to-upper-middle income position. This equates to approximately $33.65 per hour based on a 40-hour work week. Professionals earning around $70,000 include experienced registered nurses, intermediate teachers with several years of service, mid-level software developers, experienced accountants, project coordinators, police officers with experience, some engineering technologists, and experienced government policy analysts. At this income level, a meaningful portion of your earnings falls within the 30% PAYE tax bracket ($53,500-$78,100), giving you an effective tax rate of approximately 18.9%. Your ACC Earner's Levy at 1.60% amounts to $1,120. KiwiSaver at the standard 3% deducts $2,100 from your pay annually, while your employer contributes a matching $2,100. If you carry a student loan, repayments would be approximately $5,661 per year, which is a noticeable deduction from your income. At $70,000, you have crossed a threshold where life in New Zealand becomes materially more comfortable. You can afford quality rental accommodation in most cities, run a reliable vehicle, maintain health insurance, and still put money aside for savings or investments beyond KiwiSaver. Many earners at this level are mid-career professionals who have built specialist skills or moved into supervisory roles. It is a salary that provides genuine financial stability and the ability to plan for the future with confidence.",
    faqs: [
      {
        question: "How much tax do I pay on $70,000 in NZ?",
        answer:
          "On a $70,000 salary for the 2025-2026 tax year, your PAYE income tax would be approximately $12,608. This is calculated as: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), and 30% on $53,501-$70,000 ($4,950). Your effective tax rate is approximately 18.0%. Including the ACC Earner's Levy of $1,120 (1.60%), your total tax-related deductions before KiwiSaver come to about $13,728 per year.",
      },
      {
        question: "What is the take home pay on $70,000 in New Zealand?",
        answer:
          "With a $70,000 gross salary, 3% KiwiSaver, and no student loan, your annual take home pay would be approximately $54,172, or about $2,084 per fortnight and $4,514 per month. If you also have a student loan, your take home would decrease by approximately $5,661 annually ($218 per fortnight). These calculations are based on the 2025-2026 NZ tax year rates and assume you are a New Zealand tax resident.",
      },
      {
        question: "What jobs earn $70,000 in New Zealand?",
        answer:
          "Common roles earning around $70,000 in New Zealand include experienced registered nurses, intermediate school teachers with several years of service, police constables and senior constables, mid-level government policy analysts, experienced accountants, IT support managers, project coordinators, some engineering roles, experienced human resources advisors, and marketing managers at smaller companies. Salaries vary significantly by industry, region, employer size, and individual experience. Auckland-based roles sometimes pay slightly more to reflect the higher cost of living.",
      },
    ],
  },
  {
    slug: "80000",
    gross: 80000,
    grossFormatted: "$80,000",
    description:
      "An $80,000 annual salary in New Zealand positions you comfortably above the median income for full-time workers and represents an upper-middle income level. This equates to approximately $38.46 per hour based on a standard 40-hour work week. Professionals earning around $80,000 include senior teachers, experienced registered nurses with specialisations, mid-level software engineers, experienced accountants and auditors, senior government policy advisors, project managers, senior police officers, some dental hygienists, and mid-level engineering professionals. At $80,000, you have crossed into the fourth PAYE tax bracket, meaning a small portion of your income ($78,100-$80,000) is taxed at 33%, while the majority of your earnings remain in the lower brackets. Your effective tax rate is approximately 19.8%, reflecting the progressive nature of the system. The ACC Earner's Levy at 1.60% amounts to $1,280, and KiwiSaver at 3% deducts $2,400 annually while your employer adds a matching $2,400 to your account. Student loan repayments, if applicable, would be approximately $6,861 per year. At this salary level, you can enjoy a comfortable lifestyle in virtually any New Zealand city, including Auckland, although housing in premium suburbs may still require careful budgeting. This income level provides meaningful capacity for saving, investing, and building financial security. Many professionals earning $80,000 are in established careers with further advancement potential, making this an important stepping stone toward senior or specialist roles that command higher compensation.",
    faqs: [
      {
        question: "How much PAYE do I pay on $80,000 in NZ?",
        answer:
          "On an $80,000 salary in the 2025-2026 tax year, your PAYE income tax would be approximately $15,234. The progressive calculation is: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), 30% on $53,501-$78,100 ($7,380), and 33% on $78,101-$80,000 ($627). Your effective tax rate is approximately 19.0%. Combined with the ACC Earner's Levy of $1,280, your total tax deductions before KiwiSaver amount to approximately $16,514 annually.",
      },
      {
        question: "What is the fortnightly take home pay on $80,000 in NZ?",
        answer:
          "On an $80,000 gross salary with 3% KiwiSaver and no student loan, your fortnightly take home pay would be approximately $2,357. Your monthly take home would be around $5,107, and your weekly take home approximately $1,178. If you have a student loan, subtract approximately $264 per fortnight for the 12% repayment. Increasing your KiwiSaver rate from 3% to 6% would reduce your fortnightly take home by approximately $92.",
      },
      {
        question: "Is $80,000 a high salary in NZ?",
        answer:
          "An $80,000 salary is above the median full-time income in New Zealand and places you in approximately the top 35-40% of individual earners. While not considered exceptionally high, it is a strong income that provides a comfortable lifestyle in most parts of the country. It allows for quality housing, regular savings, and discretionary spending. In Auckland, you can live comfortably as a single person, though families may still need a second income to maintain a high standard of living. In regional areas, $80,000 offers an even more comfortable lifestyle.",
      },
    ],
  },
  {
    slug: "90000",
    gross: 90000,
    grossFormatted: "$90,000",
    description:
      "A $90,000 annual salary in New Zealand is a strong income that places you well above the national median and reflects a senior or specialist position in many industries. This equates to approximately $43.27 per hour based on a 40-hour work week. Professionals earning around $90,000 include senior registered nurses, experienced software developers, senior accountants at mid-sized firms, experienced project managers, senior police officers, secondary school deputy principals, mid-level lawyers, experienced architects, and some specialist trades workers with significant expertise. At $90,000, a notable portion of your income ($78,100-$90,000) is taxed at the 33% rate, with your effective tax rate sitting at approximately 21.1%. The ACC Earner's Levy at 1.60% amounts to $1,440, and KiwiSaver at 3% deducts $2,700 annually, supplemented by your employer's 3% contribution of $2,700. Student loan repayments, if applicable, would be approximately $8,061 per year, making them a significant deduction from your pay. At this income level, you have substantial financial flexibility in New Zealand. You can afford quality accommodation without flatsharing in most cities, maintain comprehensive insurance coverage, invest beyond KiwiSaver, and enjoy discretionary spending on dining, travel, and entertainment. Many earners at this level are considering home ownership, and with careful saving, a $90,000 income combined with KiwiSaver savings can support a mortgage in many parts of the country outside of the most expensive Auckland suburbs.",
    faqs: [
      {
        question: "What is the take home pay on $90,000 in New Zealand?",
        answer:
          "On a $90,000 gross salary with 3% KiwiSaver and no student loan, your annual take home pay would be approximately $66,726, equating to about $2,566 per fortnight or $5,560 per month. Your deductions include approximately $18,534 in PAYE, $1,440 in ACC Earner's Levy, and $2,700 in KiwiSaver contributions. With a student loan, your take home would decrease by approximately $8,061 annually. These figures are calculated using 2025-2026 tax year rates.",
      },
      {
        question: "What is the effective tax rate on $90,000 in NZ?",
        answer:
          "On a $90,000 salary, your effective PAYE tax rate is approximately 20.6%, meaning you pay about $18,534 in income tax. When you add the ACC Earner's Levy of 1.60% ($1,440), your combined effective rate rises to approximately 22.2%. Your marginal tax rate (the rate on your last dollar earned) is 33%. The difference between your effective and marginal rates illustrates the progressive nature of the NZ tax system, where lower portions of income are taxed at lower rates.",
      },
      {
        question: "How does KiwiSaver affect my take home pay at $90,000?",
        answer:
          "At $90,000, KiwiSaver has a meaningful impact on your take home pay. At 3%, you contribute $2,700 per year ($104 per fortnight). At 6%, contributions double to $5,400 ($208 per fortnight), and at 10%, they reach $9,000 ($346 per fortnight). While higher contributions reduce your immediate income, they significantly boost your retirement savings. Your employer contributes 3% ($2,700) regardless of your chosen rate. The difference between 3% and 10% KiwiSaver is $6,300 per year in take home pay.",
      },
    ],
  },
  {
    slug: "100000",
    gross: 100000,
    grossFormatted: "$100,000",
    description:
      "A $100,000 annual salary in New Zealand is a significant milestone that places you firmly in the upper income bracket, well above the national median. This equates to approximately $48.08 per hour based on a 40-hour work week. Earning six figures in New Zealand is associated with senior professional roles, management positions, and specialist expertise. Common positions at this level include senior software engineers, experienced lawyers, senior accountants at major firms, school principals, experienced medical professionals, senior project managers, team leaders in corporate settings, experienced engineers, business analysts at large organisations, and senior government managers. At $100,000, a substantial portion of your income ($78,100-$100,000) is taxed at 33%, giving you an effective PAYE tax rate of approximately 22.3%. Your ACC Earner's Levy at 1.60% amounts to $1,600, and KiwiSaver at 3% deducts $3,000 annually, with your employer contributing a matching $3,000. Student loan repayments at this level would be approximately $9,261 per year, representing a significant outflow. Crossing the $100,000 mark carries both financial and psychological significance for many New Zealand workers. It provides genuine financial freedom, the ability to service a mortgage in most regions, comprehensive insurance, regular investing, and comfortable discretionary spending. Many professionals at this level have 10 or more years of experience and have developed specialised knowledge or leadership capabilities. This salary positions you in roughly the top 15-20% of individual income earners in New Zealand.",
    faqs: [
      {
        question: "How much tax do I pay on $100,000 in New Zealand?",
        answer:
          "On a $100,000 salary in the 2025-2026 tax year, your PAYE income tax would be approximately $21,834. The progressive calculation is: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), 30% on $53,501-$78,100 ($7,380), and 33% on $78,101-$100,000 ($7,227). Your effective PAYE rate is approximately 21.8%. Including ACC Earner's Levy of $1,600 (1.60%), total tax-related deductions are about $23,434 before KiwiSaver.",
      },
      {
        question: "What is the take home pay on $100,000 in NZ?",
        answer:
          "With a $100,000 gross salary, 3% KiwiSaver, and no student loan, your annual take home pay would be approximately $73,566, or about $2,830 per fortnight and $6,131 per month. If you carry a student loan, subtract approximately $9,261 per year ($356 per fortnight). The difference between the lowest (3%) and highest (10%) KiwiSaver rate would cost you $7,000 annually but would significantly increase your retirement savings over time.",
      },
      {
        question: "What percentage of NZ earners make $100,000?",
        answer:
          "Approximately 15-20% of individual income earners in New Zealand earn $100,000 or more per year. This figure varies by industry, with sectors like technology, finance, engineering, law, and medicine having higher proportions of six-figure earners. Geographic differences also exist: Auckland and Wellington tend to have more high-paying roles due to the concentration of corporate headquarters and government agencies. Earning $100,000 places you well above the median income and is generally considered a high salary in the New Zealand context.",
      },
    ],
  },
  {
    slug: "120000",
    gross: 120000,
    grossFormatted: "$120,000",
    description:
      "A $120,000 annual salary in New Zealand is a high income that places you in the top tier of earners in the country. This equates to approximately $57.69 per hour based on a 40-hour work week. Professionals earning $120,000 typically hold senior management positions, specialist technical roles, or have significant professional expertise. Common roles at this salary include senior software engineers and architects, experienced medical professionals, senior lawyers, financial controllers, engineering managers, IT managers, senior public servants at tier two or three levels, business development managers, and experienced specialists in mining, energy, or infrastructure. At $120,000, a large portion of your income is taxed at 33% ($78,100-$120,000), resulting in an effective tax rate of approximately 24.0%. The ACC Earner's Levy at 1.60% amounts to $1,920, and KiwiSaver at 3% deducts $3,600 annually with an employer match of $3,600. Student loan repayments, if applicable, would be approximately $11,661 per year, which is a very substantial deduction. At this income level, you have considerable financial flexibility and can comfortably afford a high standard of living anywhere in New Zealand. Home ownership, including in desirable Auckland suburbs, becomes achievable either individually or with a partner. Investment beyond KiwiSaver is realistic, whether in property, shares, or other asset classes. Many professionals at this salary are also looking at optimising their tax position through voluntary contributions, PIE investments, or other legitimate tax-planning strategies. This income puts you approximately in the top 10% of individual earners nationwide.",
    faqs: [
      {
        question: "How much tax do I pay on $120,000 in NZ?",
        answer:
          "On a $120,000 salary for the 2025-2026 tax year, your PAYE income tax would be approximately $28,434. This includes: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), 30% on $53,501-$78,100 ($7,380), and 33% on $78,101-$120,000 ($13,827). Your effective PAYE rate is approximately 23.7%. With the ACC Earner's Levy of $1,920, total tax-related deductions are about $30,354 before KiwiSaver contributions.",
      },
      {
        question: "What is the monthly take home pay on $120,000 in NZ?",
        answer:
          "On a $120,000 gross salary with 3% KiwiSaver and no student loan, your monthly take home pay would be approximately $7,170, or about $3,314 per fortnight. Your annual take home would be around $86,046. With a student loan, your monthly take home would drop to approximately $6,198 after deducting $972 per month in student loan repayments. Switching from 3% to 10% KiwiSaver would reduce your monthly take home by approximately $700.",
      },
      {
        question: "Is $120,000 a good salary in New Zealand?",
        answer:
          "A $120,000 salary is considered an excellent income in New Zealand, placing you in approximately the top 10% of individual earners. It provides a very comfortable lifestyle in any part of the country, including Auckland. At this level, you can afford quality housing, comprehensive insurance, regular savings and investments, travel, and discretionary spending without financial stress. For families, $120,000 as a single income provides a good standard of living, though the cost of childcare and education means a second household income is still beneficial for many families.",
      },
    ],
  },
  {
    slug: "150000",
    gross: 150000,
    grossFormatted: "$150,000",
    description:
      "A $150,000 annual salary in New Zealand is a premium income that positions you among the highest-paid professionals in the country. This equates to approximately $72.12 per hour based on a 40-hour work week. Earning $150,000 is typically associated with executive-level roles, highly specialised professionals, and senior leadership positions. Common roles at this salary include chief financial officers at mid-sized companies, senior medical specialists and consultants, experienced barristers and partners at law firms, senior technology architects, engineering directors, general managers, experienced management consultants, and senior executives in the public and private sectors. At $150,000, a large portion of your income is taxed in the 33% bracket ($78,100-$150,000), resulting in an effective tax rate of approximately 26.1%. The ACC Earner's Levy is $2,277, which is close to the maximum cap since your earnings approach the $142,283 liable threshold. KiwiSaver at 3% deducts $4,500 annually, while your employer adds $4,500. Student loan repayments at this level are $15,261 per year, a significant sum that motivates many high earners to make voluntary lump sum repayments to clear their loan faster. At $150,000, you have exceptional financial flexibility by New Zealand standards. This salary supports a premium lifestyle, comfortable home ownership in desirable areas, significant savings and investment capacity, private schooling for children, and frequent travel. Many earners at this level work with financial advisors to optimise their wealth-building strategy, including KiwiSaver fund selection, diversified investment portfolios, and estate planning. You are likely in the top 5% of individual income earners in the country.",
    faqs: [
      {
        question: "How much tax do I pay on $150,000 in New Zealand?",
        answer:
          "On a $150,000 salary for the 2025-2026 tax year, your PAYE income tax would be approximately $38,334. The progressive calculation is: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), 30% on $53,501-$78,100 ($7,380), and 33% on $78,101-$150,000 ($23,727). Your effective PAYE rate is approximately 25.6%. Including ACC Earner's Levy of approximately $2,277, total tax-related deductions come to about $40,611 before KiwiSaver.",
      },
      {
        question: "What is the take home pay on $150,000 in NZ?",
        answer:
          "With a $150,000 gross salary, 3% KiwiSaver, and no student loan, your annual take home pay would be approximately $104,889, or about $4,034 per fortnight and $8,741 per month. Your employer also contributes $4,500 to your KiwiSaver account. If you have a student loan, deduct $15,261 per year ($587 per fortnight), bringing your fortnightly take home to approximately $3,447.",
      },
      {
        question: "What jobs pay $150,000 in New Zealand?",
        answer:
          "Roles paying $150,000 or more in New Zealand include senior medical specialists, experienced surgeons, partners at law firms, chief financial officers, IT directors and chief technology officers, senior management consultants, engineering directors, general managers and senior executives at large companies, experienced commercial pilots, senior actuaries, and some highly experienced trades business owners. These roles typically require 15+ years of experience, advanced qualifications, and demonstrated leadership capability.",
      },
    ],
  },
  {
    slug: "200000",
    gross: 200000,
    grossFormatted: "$200,000",
    description:
      "A $200,000 annual salary in New Zealand places you among the highest-earning individuals in the country, typically in the top 2-3% of all income earners. This equates to approximately $96.15 per hour based on a 40-hour work week. Earning $200,000 is associated with executive leadership, elite professional expertise, and senior specialist roles in demanding fields. Common positions at this salary include chief executive officers, medical specialists and senior consultants, senior partners at major law firms, chief technology officers, finance directors at large corporations, investment banking professionals, senior management consultants at top-tier firms, and executive leaders in major public sector organisations. At $200,000, you have crossed into the top PAYE tax bracket of 39% (on income above $180,000), with an effective tax rate of approximately 28.8%. The ACC Earner's Levy is capped at approximately $2,277 since the maximum liable earnings threshold of $142,283 applies. KiwiSaver at 3% deducts $6,000 annually, with your employer contributing $6,000. Student loan repayments would be approximately $21,261 per year, which many earners at this level choose to pay off through voluntary additional payments. At $200,000, you enjoy a premium lifestyle by New Zealand standards with significant capacity for wealth accumulation. This income supports premium property ownership, substantial investment portfolios, private education, travel, and luxury spending. Many earners at this level engage professional financial advisors, tax accountants, and estate planners. They may also structure their income through trusts, companies, or other legal entities for tax efficiency. This salary level reflects the peak of many professional careers in New Zealand and often comes with significant responsibilities, long hours, and high performance expectations.",
    faqs: [
      {
        question: "How much tax do I pay on $200,000 in New Zealand?",
        answer:
          "On a $200,000 salary for the 2025-2026 tax year, your PAYE income tax would be approximately $50,134. The progressive calculation is: 10.5% on the first $15,600 ($1,638), 17.5% on $15,601-$53,500 ($6,633), 30% on $53,501-$78,100 ($7,380), 33% on $78,101-$180,000 ($33,627), and 39% on $180,001-$200,000 ($7,800). Your effective PAYE rate is approximately 25.1%. Including ACC Earner's Levy of approximately $2,277, total tax-related deductions are about $52,411 before KiwiSaver.",
      },
      {
        question: "What is the monthly take home pay on $200,000 in NZ?",
        answer:
          "On a $200,000 gross salary with 3% KiwiSaver and no student loan, your monthly take home pay would be approximately $11,799, or about $5,453 per fortnight. Your annual take home would be around $141,589. With a student loan, your monthly take home would drop by approximately $1,772 to around $10,027. The 39% top tax bracket applies to income above $180,000, so only $20,000 of your salary is taxed at this highest rate.",
      },
      {
        question: "How much should I contribute to KiwiSaver at $200,000?",
        answer:
          "At $200,000, the choice of KiwiSaver rate has a significant impact. At 3%, you contribute $6,000 per year; at 10%, you contribute $20,000 per year, a difference of $14,000 in annual take home pay. Since your marginal tax rate is 39%, each dollar going to KiwiSaver costs you only 61 cents in forgone take home pay, making KiwiSaver contributions relatively tax-efficient. However, many high earners also consider other investment vehicles alongside KiwiSaver for diversification and liquidity. Consult a qualified financial advisor for personalised advice.",
      },
    ],
  },
];
