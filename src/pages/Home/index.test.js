/** @jest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from ".";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};
describe("Home", () => {
  it("Should render correctly", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument;
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument;
  });

  it("Should call navigate when clicked on Register button", () => {
    renderComponent();
    const btn = screen.getByText("Cadastre-se aqui.");
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalled;
  });

  it("Should call navigate when clicked on Sign In button", () => {
    renderComponent();
    const btn = screen.getByText("ENTRAR");
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalled;
  });
});

