export interface DailyVolumesResponse {
  "Meta Data": {
    "1. Information": "Daily Time Series with Splits and Dividend Events";
    "2. Symbol": "IBM";
    "3. Last Refreshed": "2023-02-21";
    "4. Output Size": "Compact";
    "5. Time Zone": "US/Eastern";
  };
  "Time Series (Daily)": {
    [date: string]: {
      "1 . open": "134.0";
      "2. high": "134.385";
      "3. low": "131.66";
      "4. close": "131.71";
      "5. adjusted close": "131.71";
      "6. volume": "4257210";
      "7. dividend amount": "0.0000";
      "8. split coefficient": "1.0";
    };
  };
}

export type DailyVolumesChartData = {
  "1 . open": "134.0";
  "2. high": "134.385";
  "3. low": "131.66";
  "4. close": "131.71";
  "5. adjusted close": "131.71";
  "6. volume": "4257210";
  "7. dividend amount": "0.0000";
  "8. split coefficient": "1.0";
  date: string;
};
