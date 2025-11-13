## API Service Usage

The API service provides a clean interface to interact with the cakung-barat-server API. Here's how to use it:

### Setup

1. Create a `.env` file in your project root with the API URL:
```env
VITE_API_URL=https://cakung-barat-server-1065513777845.asia-southeast1.run.app
```

2. Install dependencies:
```bash
npm install axios
```

### Usage Examples

#### Import the service:
```typescript
import { apiService } from './api';
```

#### Working with Postings:
```typescript
// Get all postings
const postings = await apiService.getAllPostings();

// Create a new posting
const newPosting = await apiService.createPosting({
  title: 'New Post',
  category: 'News',
  excerpt: 'This is a sample post'
});

// Update a posting
const updatedPosting = await apiService.updatePosting('posting-id', {
  title: 'Updated Title'
});

// Delete a posting
await apiService.deletePosting('posting-id');
```

#### Working with Assets:
```typescript
// Get all assets
const assets = await apiService.getAllAssets();

// Upload an asset
const asset = await apiService.uploadAsset({
  file: myFile,
  folders: ['images'],
  name: 'My Image'
});

// Get asset by ID
const asset = await apiService.getAssetById('asset-id');

// Delete an asset
await apiService.deleteAsset('asset-id');
```

#### Working with Folders:
```typescript
// Create a folder
await apiService.createFolder('new-folder');

// List assets in a folder
const folderAssets = await apiService.listFolder('folder-name');
```