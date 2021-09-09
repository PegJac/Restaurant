import { render } from "@testing-library/react";
import App from "./App";

test("App component renderes correctly with two child components", () => {
  const { container } = render(<App />);
  const landingPage = container.querySelector(".landingPageContainer");
  expect(landingPage).toBeInTheDocument();
  expect(landingPage!.children.length).toBe(2);
});

test("Menu component shows menu items", () => {
  const { container } = render(<App />);
  const menuItemsContainer = container.querySelector(".itemsContainer");
  expect(menuItemsContainer).toBeInTheDocument();
  expect(menuItemsContainer!.children.length).toBeGreaterThan(2);
});
