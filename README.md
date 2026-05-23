# Mortgage Planner Website

This folder is ready to upload to GitHub.

## Folder structure

```text
mortgage-planner-github-ready/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   └── hero-house.png
│   └── icons/
│       └── *.svg
```

## How to upload to GitHub

1. Create a new GitHub repository.
2. Upload everything inside this folder, keeping the folder structure the same.
3. Make sure `index.html` stays in the root of the repository.
4. Go to repository **Settings → Pages**.
5. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save. GitHub will give you a live website URL.

Do not move files out of the `assets` folder unless you also update the paths in `index.html`.
