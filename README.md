# Papertrail Books

A responsive bookstore experience built with React, React Router, and Vite. Browse a curated collection, search by title or author, filter by genre, view book details, manage a persistent shopping bag, and complete a demo checkout.

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

Run the project's linter with `npm run lint`.

## Features

- Home page with featured picks and genre navigation
- Search by book title, author, or genre
- Genre filters and sorting by rating or price
- Book detail pages with ratings and related picks
- Shopping bag with quantity controls, removal, and saved cart state
- Checkout form with native required-field validation and order confirmation
- Responsive layout and keyboard-focus styling

## Notes

The checkout is a front-end demo and does not process payments or submit orders to a server. Book cover photography is loaded from Unsplash; an internet connection is needed to display it.
