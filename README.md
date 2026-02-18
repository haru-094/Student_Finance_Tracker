# Student Finance Tracker

A responsive, accessible, and offline-capable web application designed to help students track their expenses, manage budgets, and visualize spending habits.

# 🌐 Live Deployment

[Live Website]([https://haru-094.github.io/Student_Finance_Tracker/])

# 🎥 Demo Video

[Insert your YouTube/Loom Link Here]

## 🚀 Features

- **Dashboard Analytics:** Real-time calculation of total spent, remaining budget, and top spending categories.
- **Visual Charts:** 7-day spending trend bar chart built with pure CSS/JS (no external libraries).
- **Transaction Management:** Add, edit, delete, and search transactions.
- **Data Persistence:** Auto-saves to LocalStorage; data remains after page reload.
- **Import/Export:** Backup data to JSON or restore from a file.
- **Currency Converter:** dynamic currency estimation (USD, RWF, SAR).
- **Regex Search:** Advanced search using Regular Expressions.

## 🛠️ Setup & Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/haru-094/Student_Finance_Tracker.git](https://github.com/haru-094/Student_Finance_Tracker.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd Student_Finance_Tracker
    ```
3.  Open `index.html` in your browser (or use Live Server in VS Code).

## 📖 Usage Guide

### 1. Setting a Budget

Navigate to the **Settings** tab and enter your monthly budget cap. The dashboard will alert you if you exceed this amount.

### 2. Adding Transactions

Go to the **Adding Transactions** tab. Fill in the Name, Date, Amount, and Category.

- _Validation:_ The name field rejects duplicate words (e.g., "Coffee Coffee").

### 3. Searching & Sorting

In the **Record** tab, you can search by name or category.

- **Regex Search:** You can use regex patterns. For example, `^Food` finds items starting with "Food".
- **Sort:** Toggle between sorting by Date or Amount.

### 4. Data Management

- **Export:** In Settings, click "Export JSON" to download a backup.
- **Import:** Upload a valid JSON file to restore data.

## 🔍 Regex Validation Catalog

The application uses the following Regular Expressions for validation and search:

| Field         | Regex Pattern                                        | Description                                             |
| :------------ | :--------------------------------------------------- | :------------------------------------------------------ |
| **Name**      | `/^\S(?:.*\S)?$/`                                    | Ensures no leading/trailing whitespace.                 |
| **Duplicate** | `/\b(\w+)\s+\1\b/`                                   | Detects repeated words (e.g., "Test Test").             |
| **Amount**    | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/`                      | Validates positive numbers with up to 2 decimal places. |
| **Date**      | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | Enforces YYYY-MM-DD format.                             |
| **Search**    | `new RegExp(value, flag)`                            | Dynamically compiles user input for filtering.          |

## ♿ Accessibility Features

- **Skip-to-Content:** Hidden link for keyboard users to bypass navigation.
- **ARIA Labels:** `aria-live` regions used for budget alerts.
- **Semantic HTML:** Proper use of `<main>`, `<nav>`, and heading hierarchy.
- **Keyboard Nav:** Fully navigable using `Tab` and `Enter`.

## 📂 Project Structure

```text
Student_Finance_Tracker/
├── index.html          # Main HTML structure
├── styles/
│   └── style.css       # Responsive CSS variables & layout
├── scripts/
│   ├── main.js         # Entry point & event listeners
│   ├── state.js        # State management (CRUD operations)
│   ├── storage.js      # LocalStorage & JSON Import/Export
│   ├── ui.js           # DOM manipulation & Chart rendering
│   ├── validators.js   # Regex validation logic
│   └── search.js       # Search & Sort logic
└── seed.json           # Sample data for testing
```

© 2026 Anas Khalid
