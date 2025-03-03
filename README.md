# React Testing Course Project 🚀

This project is part of an online course on React testing with Cypress and Testing Library. The course can be found [here](https://www.udemy.com/course/testes-no-frontend-com-reactjs-tdd-vitest-cypress-e-mais/).

## Setup Instructions

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Configure Vitest (used steps):**

    Create a file named `vitest.config.ts` in the root of the project:

    ```typescript
    /// <reference types="vitest"/>

    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import path from "path";

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setupTests.ts"],
      },
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
      },
    });
    ```

3. **Create Vitest environment declaration:**

    Create a file named `vitest-env.d.ts` inside the `src` folder:

    ```typescript
    /// <reference types="vitest/globals"/>
    ```

4. **Setup Testing Library:**

    Create a file named `setupTests.ts` inside the `src` folder:

    ```typescript
    import "@testing-library/jest-dom";
    ```

## Usage

Here are the available scripts for this project:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "vitest --no-file-parallelism --max-workers 1",
  "test:async": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui",
  "test:cy": " cypress open",
  "test:cy:open": " cypress open"
}
```

- **Start development server:** `npm run dev`
- **Build the project:** `npm run build`
- **Run linter:** `npm run lint`
- **Preview the build:** `npm run preview`
- **Run tests:** `npm run test`
- **Run async tests:** `npm run test:async`
- **Run tests with coverage:** `npm run test:coverage`
- **Open Vitest UI:** `npm run test:ui`
- **Open Cypress:** `npm run test:cy`
- **Open Cypress (alternative):** `npm run test:cy:open`

## Fake API

This project uses a fake API for Cypress end-to-end tests. You can find the fake API [here](https://github.com/DEV2DEV-BR/pokemon-fake-api). Make sure to run the API locally to ensure the tests work correctly.

## Example Test

Here is an example of a frontend test:

```typescript
// component
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <h1>Seja bem-vindo</h1>
    </div>
  );
}

export default App;

// tests
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testa o component App", () => {
  test("Devem haver dois títulos na página", async () => {
    render(<App />);

    const titles = await screen.findAllByRole("heading");

    expect(titles).toHaveLength(2);
  });

  test("Deve haver um título escrito 'Hello World'", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "Hello World",
    });

    expect(title).toBeInTheDocument();
  });
});
```

Happy testing! 🎉


### Course ⬇️

<br />


<div style="text-align: center;">
  <a href="https://www.udemy.com/course/testes-no-frontend-com-reactjs-tdd-vitest-cypress-e-mais/">
    <img src="./public/react-testing-course.jpg" alt="React Testing Course" style="max-width: 100%; width: 500px;">
  </a>
</div>

