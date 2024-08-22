const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'reference to:{\ntime: 1724357494490,\nblocks: [\n{\nid: "mhTl6ghSkV",\ntype: "paragraph",\ndata: {\ntext: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",} ,} ,\n{\nid: "l98dyx3yjb",\ntype: "header",\ndata: {\ntext: "Key features",\nlevel: 3,} ,} ,\n{\nid: "os_YI4eub4",\ntype: "list",\ndata: {\ntype: "unordered",\nitems: [\n"It is a block-style editor",\n"It returns clean data output in JSON",\n"Designed to be extendable and pluggable with a <a href="https://editorjs.io/creating-a-block-tool">simple API</a>",] ,} ,} ,\n{\nid: "1yKeXKxN7-",\ntype: "header",\ndata: {\ntext: "What does it mean «block-styled editor»",\nlevel: 3,} ,} ,\n{\nid: "TcUNySG15P",\ntype: "paragraph",\ndata: {\ntext: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup data-tune="footnotes">1</sup> contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.",} ,\ntunes: {\nfootnotes: [\n"It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",] ,} ,} ,\n{\nid: "M3UXyblhAo",\ntype: "header",\ndata: {\ntext: "What does it mean clean data output?",\nlevel: 3,} ,} ,\n{\nid: "KOcIofZ3Z1",\ntype: "paragraph",\ndata: {\ntext: "There are dozens of ready-to-use Blocks and a simple API <sup data-tune="footnotes">2</sup> for creating any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.",} ,\ntunes: {\nfootnotes: [\n"Just take a look at our Creating Block Tool guide. You\'ll be surprised.",] ,} ,} ,\n{\nid: "ksCokKAhQw",\ntype: "paragraph",\ndata: {\ntext: "Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class="cdx-marker">Editor.js outputs JSON object</mark> with data of each Block.",} ,} ,\n{\nid: "XKNT99-qqS",\ntype: "attaches",\ndata: {\nfile: {\nurl: "https://drive.google.com/user/catalog/my-file.pdf",\nsize: 12902,\nname: "file.pdf",\nextension: "pdf",} ,\ntitle: "My file",} ,} ,\n{\nid: "7RosVX2kcH",\ntype: "paragraph",\ndata: {\ntext: "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create the markup for Facebook Instant Articles or Google AMP, generate an audio version, and so on.",} ,} ,\n{\nid: "eq06PsNsab",\ntype: "paragraph",\ndata: {\ntext: "Clean data is useful to sanitize, validate and process on the backend.",} ,} ,\n{\nid: "hZAjSnqYMX",\ntype: "image",\ndata: {\nfile: {\nurl: "assets/codex2x.png",} ,\nwithBorder: false,\nwithBackground: false,\nstretched: true,\ncaption: "CodeX Code Camp 2019",} ,} ,] ,}\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "time": 1724357494490,\n  "blocks": [\n    {\n      "id": "mhTl6ghSkV",\n      "type": "paragraph",\n      "data": {\n        "text": "Welcome to the [Project Name] Editor! This editor is designed to help you easily create and manage content for your [Project Description]."\n      }\n    },\n    {\n      "id": "l98dyx3yjb",\n      "type": "header",\n      "data": {\n        "text": "Key Features",\n        "level": 2\n      }\n    },\n    {\n      "id": "os_YI4eub4",\n      "type": "list",\n      "data": {\n        "type": "unordered",\n        "items": [\n          "**[Feature 1]:** [Brief description of Feature 1]",\n          "**[Feature 2]:** [Brief description of Feature 2]",\n          "**[Feature 3]:** [Brief description of Feature 3]"\n        ]\n      }\n    },\n    {\n      "id": "1yKeXKxN7-",\n      "type": "header",\n      "data": {\n        "text": "How to Use the Editor",\n        "level": 2\n      }\n    },\n    {\n      "id": "TcUNySG15P",\n      "type": "paragraph",\n      "data": {\n        "text": "The [Project Name] Editor is built with Editor.js, a block-style editor that makes it easy to create different content elements. You can simply click the \'+\' button to add new blocks and choose from a variety of types, including text, images, lists, and more."\n      }\n    },\n    {\n      "id": "M3UXyblhAo",\n      "type": "header",\n      "data": {\n        "text": "Example Content",\n        "level": 2\n      }\n    },\n    {\n      "id": "KOcIofZ3Z1",\n      "type": "paragraph",\n      "data": {\n        "text": "[Insert an example of how the editor can be used. This could be a short snippet of content, a sample project layout, or a basic example of how to use the editor.]"\n      }\n    },\n    {\n      "id": "ksCokKAhQw",\n      "type": "paragraph",\n      "data": {\n        "text": "Get started with the [Project Name] Editor today! We\'re excited to see what you create."\n      }\n    }\n  ]\n}\n```\n\n**Explanation:**\n\n- **`time`:** Timestamp for when the Editor.js data was generated.\n- **`blocks`:** An array containing all the blocks of content within the editor.\n- **`id`:** Unique identifier for each block.\n- **`type`:** The type of block (e.g., "paragraph", "header", "list", "image").\n- **`data`:** The content and styling information for each block.\n\n**Customization:**\n\n1. **Project Name:** Replace "[Project Name]" with your project\'s name.\n2. **Project Description:** Briefly describe the purpose of your project.\n3. **Features:** Replace the "[Feature 1]", "[Feature 2]", and "[Feature 3]" placeholders with your project\'s key features.\n4. **Example Content:** Add a relevant example to demonstrate how the editor is used. \n\nThis template serves as a basic starting point for your Editor.js project. Feel free to modify and expand upon it to suit your specific needs.\n',
        },
      ],
    },
  ],
});

export { chatSession };

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
