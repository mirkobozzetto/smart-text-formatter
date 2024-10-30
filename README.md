# Text Formatter

A simple text formatter that helps structure your text by adding line breaks after punctuation marks. Buddy format your texts to make them breathe: [text-buddy.vercel.app](https://text-buddy.vercel.app/)

## Features

- Adds a single line break after commas (,), semicolons (;), and colons (:)
- Adds a double line break (paragraph) after periods (.), exclamation marks (!), and question marks (?)
- Handles multiple consecutive punctuation marks
- Copy formatted text to clipboard

## How it works

Input text:
```
Hello, how are you? I am fine! Yes: I am really good, you see; it's perfect.
```

Output text:
```
Hello,
how are you?

I am fine!

Yes:
I am really good,
you see;
it's perfect.
```

## Usage

1. Paste your text in the input area
2. Click "Format Text"
3. The formatted text appears below
4. Click "Copy" to copy the formatted text to your clipboard

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
