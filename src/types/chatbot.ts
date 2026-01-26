export interface ChatbotPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image_url: string;
  // UI specific properties used in components
  img?: string; 
  isLoadingImage?: boolean;
  hasNoFolder?: boolean;
}

export interface PdfAttachment {
  filename: string;
  data: string; // Base64 encoded PDF
  mimeType: string;
}

export interface ToolStepContent {
  type: string;
  text?: string;
  data?: string;
  mimeType?: string;
}

export interface ToolStep {
  tool: string;
  success: boolean;
  output?: {
    content?: ToolStepContent[];
  };
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  data?: {
    posts: ChatbotPost[];
  };
  attachments?: PdfAttachment[];
}

export interface ChatResponse {
  session_id: string;
  content: string | {
    message: string;
    data?: {
      posts: ChatbotPost[];
    };
  };
  provider: string;
  model: string;
  tool_steps: ToolStep[];
}
