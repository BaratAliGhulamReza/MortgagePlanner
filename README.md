# Smart Mortgage Planner Website

English-only mortgage planning website.

## Folder structure

```text
MortgagePlanner/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── icons/
    │   └── *.svg
    └── images/
        └── *.png
```

## What is included

- English-only landing page and calculator
- Mortgage repayment calculator
- Offset account strategy comparison
- Extra repayment strategy comparison
- Lump sum strategy comparison
- Monthly repayment breakdown
- Payoff goal calculator: users can enter a target such as 6 years and see the extra repayment needed
- Interest comparison chart
- Stripe support button in the header

## How to upload to GitHub Pages

1. Create a GitHub repository.
2. Upload everything inside this folder.
3. Keep `index.html` in the root folder.
4. Go to **Settings → Pages**.
5. Choose **Deploy from a branch**.
6. Select the `main` branch and the root folder.
7. Save and wait for GitHub to publish the website.

## Main files

- `index.html` contains the page structure.
- `assets/css/style.css` contains the styling.
- `assets/js/main.js` contains the calculator logic.

Do not move files out of the `assets` folder unless you also update the paths in `index.html`.
