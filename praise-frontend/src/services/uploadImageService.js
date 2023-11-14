import { storage } from '../api/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const uploadImageService = async (file, onProgress, path = 'images') => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          }).catch(error => {
            reject(error);
          });
        }
      );
    });
  };
  
  export { uploadImageService };
  