// Example usage of the API service
import { apiService } from './api.service';
import type { CreatePostingRequest, UpdatePostingRequest } from './dto/posting.dto';

// Example: Creating a new posting
const createNewPosting = async () => {
  const postingData: CreatePostingRequest = {
    title: 'New Post Title',
    category: 'News',
    excerpt: 'This is a sample excerpt for the new post.',
    img: ['image-uuid-1', 'image-uuid-2']
  };

  try {
    const newPosting = await apiService.createPosting(postingData);
    console.log('Created posting:', newPosting);
  } catch (error) {
    console.error('Error creating posting:', error);
  }
};

// Example: Updating an existing posting
const updateExistingPosting = async (id: string) => {
  const updateData: UpdatePostingRequest = {
    title: 'Updated Title',
    category: 'Updated Category'
  };

  try {
    const updatedPosting = await apiService.updatePosting(id, updateData);
    console.log('Updated posting:', updatedPosting);
  } catch (error) {
    console.error('Error updating posting:', error);
  }
};

// Example: Getting all postings
const getAllPostings = async () => {
  try {
    const postings = await apiService.getAllPostings();
    console.log('All postings:', postings);
  } catch (error) {
    console.error('Error getting postings:', error);
  }
};

// Example: Uploading an asset
const uploadAsset = async (file: File) => {
  try {
    const asset = await apiService.uploadAsset({
      file: file,
      folders: ['images', 'uploads'],
      name: 'My Image'
    });
    console.log('Uploaded asset:', asset);
  } catch (error) {
    console.error('Error uploading asset:', error);
  }
};

// Example: Getting all assets
const getAllAssets = async () => {
  try {
    const assets = await apiService.getAllAssets();
    console.log('All assets:', assets);
  } catch (error) {
    console.error('Error getting assets:', error);
  }
};

export {
  createNewPosting,
  updateExistingPosting,
  getAllPostings,
  uploadAsset,
  getAllAssets
};