import { SYSTEM_START_YEAR } from '~/consts/variables';

function generateQuarters(): {
  year: number;
  quarters: number[];
}[] {
  const quartersList: {
    year: number;
    quarters: number[];
  }[] = [];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript

  for (let year = SYSTEM_START_YEAR; year <= currentYear; year++) {
    const quarters: number[] = [];

    // Determine the number of quarters to add for the current year
    if (year === currentYear) {
      const currentQuarter = Math.ceil(currentMonth / 3);
      for (let quarter = 1; quarter <= currentQuarter; quarter++) {
        quarters.push(quarter);
      }
    } else {
      // For previous years, add all four quarters
      quarters.push(1, 2, 3, 4);
    }

    quartersList.push({ year, quarters });
  }

  return quartersList;
}

function getCurrentYearQuarter(): {
  year: number;
  quarter: number;
} {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
  const currentQuarter = Math.ceil(currentMonth / 3);

  return {
    year: currentYear,
    quarter: currentQuarter,
  };
}

export { generateQuarters, getCurrentYearQuarter };
