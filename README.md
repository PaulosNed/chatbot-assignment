# Chatbot UI - Adomant Code Assessment

This repository contains the frontend code for the task assessment given as part of a recruitment process for **Adomant Code**. The objective was to create a chatbot interface where users can interact with an AI chatbot, simulating a basic chat environment like ChatGPT. This system was built using **Next.js**, **Material UI**, and **TailwindCSS**.

## Overview

This project implements a chat interface where a user can interact with a chatbot. The interface follows a specific design provided in Figma, and simulates a basic conversation experience. Here are the core features:

- **Chatbot Interaction**: The chatbot starts each new conversation with “How can I help you?”. After each user message, the chatbot responds with a delayed "This is an AI generated response" (simulating a real response).
- **Typing Animation**: A typing animation is displayed during the 2-second delay before the chatbot replies.
- **Conversation Management**: The chat history, including previous messages, is stored for each conversation and retrieved accordingly.

## Design & Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Material UI](https://mui.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
  
Figma design used for the interface: [Chatbot UI Design](https://www.figma.com/design/okBhVeSxxw8vKUa1DyaqTr/Full-Stack-Developer-Assignment?node-id=5334-365&t=jql51l6KMUf0UF22-0)

## Installation

### Prerequisites
Before running this project, ensure you have Node.js installed on your system.

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/PaulosNed/chatbot-assignment
   cd chatbot-assignment
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Once the server is running, you can access the project at `http://localhost:3000/`.

## Project Structure

This project is organized into the following main sections:

- **Components**: The UI components for the chatbot interface, including the chat bubble, message display, and loading spinner (typing animation).
- **App**: The pages of the chatbot.
- **Styles**: TailwindCSS and Material UI are used for styling the components, ensuring a responsive and clean UI.
- **Icons**: Icons from material UI and SVGs from the figma design were used.

## Reference Documentation

The assessment documentation can be found [here](https://doc.clickup.com/9015599350/d/h/8cny87p-8095/6a879a0d5f57a2a). The design was based on the Figma file linked [here](https://www.figma.com/design/okBhVeSxxw8vKUa1DyaqTr/Full-Stack-Developer-Assignment?node-id=5334-365&t=jql51l6KMUf0UF22-0).
