import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import path from "path";
import fs from "fs";
import "./../App.jsx";
// import "./../App.jsx";
import ProductList from "./../components/ProductList";
import Sidebar from "./../components/Sidebar.jsx";

const appPath = path.resolve(__dirname, "./../App.jsx");
const appjsxCode = fs.readFileSync(appPath, "utf-8");

//

const productListPath = path.resolve(
  __dirname,
  "./../components/ProductList.jsx"
);
const productListCode = fs.readFileSync(productListPath, "utf-8");

const sidebarPath = path.resolve(__dirname, "./../components/Sidebar.jsx");
const sidebarCode = fs.readFileSync(sidebarPath, "utf-8");

//

test("App içinde activeCategory adında bir state tanımlanmış mı?", () => {
  const pattern =
    /const\s*\[\s*activeCategory\s*,\s*setActiveCategory\s*\]\s*=/;

  expect(appjsxCode).toMatch(pattern);
});

test("App içindeki activeCategory state'inin başlangıç değeri 'electronics' mi?", () => {
  const pattern =
    /const\s*\[\s*activeCategory\s*,\s*setActiveCategory\s*\]\s*=\s*(?:React\.)?useState\s*\(\s*["'`]electronics["'`]\s*\)/;

  expect(appjsxCode).toMatch(pattern);
});

test("App içinde handleCatChange adında bir fonksiyon tanımlanmış mı?", () => {
  const pattern = new RegExp(
    // 1. "function handleCatChange(" olabilir
    // 2. "const handleCatChange = (..." olabilir
    // 3. Boşluklara karşı toleranslı
    String.raw`\b(?:function|const)\s+handleCatChange\s*(=)?\s*(\(.*?\)|function\s*\(.*?\))`,
    "s"
  );

  expect(appjsxCode).toMatch(pattern);
});

test("ProductList componentına activeCategory props'u gönderilmiş mi?", () => {
  const pattern =
    /<\s*ProductList\s+activeCategory\s*=\s*{activeCategory}\s*\/?>/;

  expect(appjsxCode).toMatch(pattern);
});

test("ProductList activeCategory'yi props olarak alıyor mu?", () => {
  render(<ProductList activeCategory="electronics" />);
  const productListTitle = screen.getByTestId("productList-title");
  expect(productListTitle).toHaveTextContent("electronics ürünleri");
});

test("ProductList başlangıç kategorisinde doğru sayıda elemanı gösteriyor mu?", async () => {
  render(<ProductList activeCategory="electronics" />);
  const productItems = await screen.findAllByTitle("product-item");
  expect(productItems.length).toBe(6);
});

test("activeCategory her değiştiğinde ürünler değişiyor mu?", async () => {
  const { rerender } = render(<ProductList activeCategory="electronics" />);

  const initialItems = await screen.findAllByTitle("product-item");
  expect(initialItems.length).toBe(6);

  // props'u değiştir
  rerender(<ProductList activeCategory="jewelery" />);

  await waitFor(async () => {
    const updatedItems = await screen.findAllByTitle("product-item");
    expect(updatedItems.length).toBe(4);
  });
});

test("ProductList içinde bir state tanımlanmış mı?", () => {
  const pattern = /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState\s*\(/;
  expect(productListCode).toMatch(pattern);
});

test("Sidebar componentına hem handleCatChange hem activeCategory props'ları iletilmiş mi?", () => {
  const pattern = /<\s*Sidebar[^>]*>/s;
  const match = appjsxCode.match(pattern);

  expect(match).not.toBeNull();

  const tagContent = match?.[0] ?? "";

  expect(tagContent).toMatch(/handleCatChange\s*=\s*{handleCatChange}/);
  expect(tagContent).toMatch(/activeCategory\s*=\s*{activeCategory}/);
});

test("Sidebar içinde bir state tanımlanmış mı?", () => {
  const pattern = /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState\s*\(/;
  expect(sidebarCode).toMatch(pattern);
});

test("Sidebar componenti kategorileri listeliyor mı?", async () => {
  render(<Sidebar />);
  const productItems = await screen.findAllByTitle("category-item");
  expect(productItems.length).toBe(4);
});

test("Sidebar Category componentına gerekli propsları doğru isimlerle iletiyor mu?", () => {
  const pattern =
    /<Category[^>]*\bcategory\s*=\s*{[^}]+}[^>]*\bhandleCatChange\s*=\s*{[^}]+}[^>]*\/?>|<Category[^>]*\bhandleCatChange\s*=\s*{[^}]+}[^>]*\bcategory\s*=\s*{[^}]+}[^>]*\/?>/;

  expect(sidebarCode).toMatch(pattern);
});
