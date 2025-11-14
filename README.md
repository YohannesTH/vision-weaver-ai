AI Image Generator (Lovable.dev + n8n + OpenAI DALL·E 3)

[ai-image-generator.jpeg](./ai-image-generator.jpg)

This repository contains a full-stack mini project that uses Lovable.dev to build a modern web UI and n8n to provide backend automation for generating AI images using OpenAI’s DALL·E 3.

🚀 Project Overview

This project allows users to type a text description of an image into a clean, modern Lovable.dev‑generated web interface. When they click Generate, the website sends a POST request to an n8n webhook, which triggers an automation workflow. The workflow generates an image using OpenAI’s DALL·E 3 and returns the result directly to the website as a binary image file.

🧩 Architecture
Lovable.dev Website → n8n Webhook → OpenAI DALL·E 3 → n8n Response → Website
Frontend (Lovable.dev)

- Automatically generated UI based on prompt
- Includes an input box for text prompts
- Includes a button to generate an image
- Sends POST request to n8n webhook

Backend (n8n)
- Webhook node accepts request { "prompt": "text here" }
- OpenAI node (DALL·E 3) generates an image
- Respond to Webhook node returns the binary image

🔗 API Endpoint

Your Lovable.dev website sends a POST request to: [https://yohanhailet.app.n8n.cloud/webhook-test/image](https://yohanhailet.app.n8n.cloud/webhook/image)

Example Request Body
{
  "prompt": "a raccoon D3 at a rooftop party"
}

Example Response
- Returns a binary image (PNG/JPG depending on OpenAI output).

📸 n8n Workflow

The automation consists of three nodes:
1) Webhook – Receives prompt from website
2) Generate Image (OpenAI DALL·E 3) – Creates image using prompt
3) Respond to Webhook – Sends image file back to requester

Example workflow layout:


💡 Lovable.dev Prompt Used

To generate the frontend UI on Lovable.dev, the following prompt was used:

"Let's create an AI-powered image generator app. The interface should be clean, modern, and visually appealing. Users should be able to type in a description of the image they want and click button to generate it. To generate the image, send a POST request to this endpoint: [https://yohanhailet.app.n8n.cloud/webhook-test/image](https://yohanhailet.app.n8n.cloud/webhook/image) with the body: {"prompt": "a raccoon D3 at a rooftop party" }. The API will return the generated image as a binary file."

🛠 Tech Stack

Frontend
- Lovable.dev
- HTML/CSS/JS (auto-generated)

Backend
- n8n automation platform
- OpenAI DALL·E 3
- Webhooks

📦 How to Use

1) Clone the repo
2) Deploy the Lovable.dev website or run locally
3) Update webhook URL if self-hosting n8n
4) Enter your prompt on the site
5) Enjoy AI‑generated images instantly!

📝 License

MIT License

🙌 Credits

1) Built using Lovable.dev for frontend generation
2) n8n for automation
3) OpenAI DALL·E 3 for image generation
