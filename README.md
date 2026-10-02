# Pixel Office

A free office toolkit that runs in the browser: **Docs** (word processor), **Sheets** (spreadsheet with basic formulas), **Slides** (presentations with a full-screen present mode) and **Invoice** (invoices and quotes with VAT).

Made by PixelProTech Solutions (Pty) Ltd. Free to use, provided as is.

## What you need
- Any current Chrome, Edge, Firefox or Safari. No installation, no account, no internet once it has loaded.
- Pop-ups allowed for the page if you want to use Slides present mode.

## Three ways to deploy (pick one)

**A. Website (easiest to keep updated).** Upload every file in this folder, all in the same folder with no sub-folders, to any web host (for example GitHub Pages). Open the address once on each computer while online. After that it works offline and can be installed from the browser's address bar.

**B. School server or intranet.** Copy the folder to any web server in the lab. Offline and install features need `https://` or `http://localhost`.

**C. USB stick or local copy (no network at all).** Copy the folder to the computer and double-click `index.html`. Everything works; offline caching and "Install" are not available this way and are not needed.

Keep all files together. The `.woff2` files are the fonts.

## Saving, downloading and printing
- Work autosaves in the browser on that computer. The Save buttons confirm only when the save really worked; if storage is full or blocked you get a "NOT SAVED" warning. Download your work when you see it.
- Docs downloads as a `.doc` file. It is web-page content with a Word extension, so recent Word may show a "file format and extension don't match" prompt. Choose Yes to open it.
- To make a PDF, use Print and choose "Save as PDF" in the print window.

## Where data goes
Nothing leaves the computer. No account, tracking, analytics or network requests. Everything is stored in the browser on that computer.

## Shared lab computers
Each tool keeps a single saved copy, shared by everyone using that browser on that computer. Before the next learner: download or print your work, then open **Privacy** or **Clear my data** in the page footer and press **Clear all my data on this computer** (it asks for confirmation).

## Updating
Put the new files over the old ones, then change the `VERSION` text in `service-worker.js` (for example `pixel-office-v6` to `-v7`). A computer receives the update the second time the app is opened while online.

## Troubleshooting
- **Present mode does nothing:** the browser blocked the pop-up. Allow pop-ups for the page.
- **Fonts look plain:** a `.woff2` file is missing; copy the full folder again.
- **"NOT SAVED" warning:** storage is full or blocked (private window or locked-down policy). Download your work.
- **Old version keeps showing:** open the app online twice, or clear the site data for the address.

## Limitations
- One saved document per tool; no document list or learner accounts.
- Spreadsheet formulas are limited to arithmetic, SUM and AVERAGE.
- Docs does not export a true `.docx` or a PDF directly.
- Very large spreadsheets and performance on very old computers have not been tested.
