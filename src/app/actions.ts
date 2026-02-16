'use server';

type SheetData = {
  dateTime: Date;
  name: string;
  gender: string;
  age: number;
  code: string;
  score: number;
  vas: number;
};

export async function saveToGoogleSheet(entry: SheetData) {
  const url = process.env.GOOGLE_SHEET_WEB_APP_URL;

  if (!url) {
    console.error(
      'Google Sheet webhook URL is not configured. Please set GOOGLE_SHEET_WEB_APP_URL in your .env.local file.'
    );
    return {
      success: false,
      message: 'Google Sheet integration not configured.',
    };
  }

  const body = {
    // Format date to ISO string for universal compatibility
    dateTime: entry.dateTime.toISOString(),
    name: entry.name,
    gender: entry.gender,
    age: entry.age,
    code: entry.code,
    score: entry.score,
    vas: entry.vas,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return { success: true, message: 'Data sent to Google Sheet.' };
    } else {
      console.error('Failed to send to Google Sheet:', await response.text());
      return {
        success: false,
        message: `Server responded with status ${response.status}.`,
      };
    }
  } catch (error) {
    console.error('Error sending to Google Sheet:', error);
    if (error instanceof Error) {
      return { success: false, message: 'Network error or invalid URL.' };
    }
    return { success: false, message: 'An unknown network error occurred.' };
  }
}
