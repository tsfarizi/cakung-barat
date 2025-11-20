import { apiService } from './api.service';
import type { CreatePostingRequest, UpdatePostingRequest } from './dto/posting.dto';

const createNewPosting = async () => {
  const newPost: CreatePostingRequest = {
    title: 'Kegiatan Kerja Bakti',
    category: 'Kegiatan',
    excerpt: 'Warga Cakung Barat melakukan kerja bakti membersihkan lingkungan.',
  };

  try {
    const newPosting = await apiService.createPosting(newPost);
    console.log('Created posting:', newPosting);
  } catch (error) {
    console.error('Error creating posting:', error);
  }
};

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

const getAllPostings = async () => {
  try {
    const postings = await apiService.getAllPostings();
    console.log('All postings:', postings);
  } catch (error) {
    console.error('Error getting postings:', error);
  }
};

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