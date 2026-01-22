# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


#  We will count the done task array element to convert the count to the heat map color

## Technical Implementation Details

### How `toggleTaskCompletion` Works
The `toggleTaskCompletion` function updates the state of tasks immutably:

1.  **State Update**: Calls `setTasks` with a functional update to ensure the latest state is used.
2.  **Iterating**: Maps through the `tasks` array.
    *   If the ID matches the clicked task, it creates a **new object** with updated properties.
    *   If the ID doesn't match, it returns the task as-is.
3.  **Return Logic**:
    ```javascript
    return { ...task, completed: isCompleted, completedHistory: newHistory };
    ```
    *   `...task`: Copies existing properties.
    *   `completed`: Updates the boolean status.
    *   `completedHistory`: Updates the array of completion dates (adding today if completed, removing today if unchecked).

### HeatMap Data Calculation
The `heatMapData` is derived from the `tasks` state using `.reduce()`:

1.  **Accumulator**: Starts as an empty array `[]`.
2.  **Logic**: Iterates through each task's `completedHistory`.
    *   Checks if the date already exists in the accumulator.
    *   **If Yes**: Increments the `count` for that date.
    *   **If No**: Pushes a new entry `{ date: 'YYYY-MM-DD', count: 1 }`.

**Example Result**:
```javascript
[
  { date: '2026-01-01', count: 2 }, // Two tasks done on this day
  { date: '2026-01-02', count: 1 }  // One task done on this day
]
```