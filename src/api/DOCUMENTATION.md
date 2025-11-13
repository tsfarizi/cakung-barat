# API Service Documentation

This project includes a comprehensive API service that connects to the cakung-barat-server API. Here's how to use it:

## Setup

1. Create a `.env` file in the project root with your API URL:
   ```
   VITE_API_URL=https://cakung-barat-server-1065513777845.asia-southeast1.run.app
   ```

2. The API service is already configured and can be imported directly.

## Available Services

The API service handles both Asset and Posting services:

### Posting Service
- `getAllPostings()`: Get all postings
- `getPostingById(id)`: Get a specific posting by ID
- `createPosting(request)`: Create a new posting
- `updatePosting(id, request)`: Update an existing posting
- `deletePosting(id)`: Delete a posting

### Asset Service
- `getAllAssets()`: Get all assets structured by folder
- `getAssetById(id)`: Get a specific asset by ID
- `uploadAsset(request)`: Upload a new asset
- `getAssetsByIds(ids)`: Get multiple assets by their IDs
- `createFolder(folderName)`: Create a new folder
- `listFolder(folderName)`: List assets in a specific folder
- `deleteAsset(id)`: Delete an asset

## Usage in Components

```typescript
import { apiService } from './api';
import type { Post, CreatePostingRequest } from './api/dto/posting.dto';

// Example: Fetch all postings
const fetchPostings = async () => {
  try {
    const postings = await apiService.getAllPostings();
    console.log('Postings:', postings);
  } catch (error) {
    console.error('Error fetching postings:', error);
  }
};

// Example: Create a new posting
const createNewPosting = async () => {
  const newPostingData: CreatePostingRequest = {
    title: 'New Announcement',
    category: 'Pengumuman',
    excerpt: 'This is a new announcement from the village'
  };

  try {
    const newPosting = await apiService.createPosting(newPostingData);
    console.log('Created posting:', newPosting);
  } catch (error) {
    console.error('Error creating posting:', error);
  }
};
```

## DTO Types

The API service uses TypeScript DTOs for type safety:
- `Post`: Represents a posting with id, title, category, date, excerpt, etc.
- `Asset`: Represents an asset with id, name, filename, url, etc.
- Various request/response objects for different API operations