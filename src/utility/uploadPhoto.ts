// import { storage } from "../firebase/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export const uploadPhoto = async (file: File, userId: string) => {
//     const storageRef = ref(storage, `comments/${userId}/${Date.now()}_${file.name}`);
//     await uploadBytes(storageRef, file);
//     return await getDownloadURL(storageRef);
// };
