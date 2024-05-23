import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

// export async function uploadCourseInfo({
//   categoryId,
//   name,
//   desc,
//   level,
//   prerequisites,
//   basePrice,
//   courseImage,
// }) {
//   const formData = new FormData();
//   formData.append("courseImage", courseImage);
//   const response = await fetch(
//     `${BASE_URL}/Course/uploadCourseInfo/` +
//       new URLSearchParams({
//         categoryId: categoryId,
//       }),
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
//       },
//       body: JSON.stringify({ FormData,
        
//           name,
//           desc,
//           level,
//           prerequisites,
//           basePrice,
//         }),
//     }
//   );

//   return response.json();
// }
export async function uploadCourseInfo({
  categoryId,
  name,
  desc,
  level,
  prerequisites,
  basePrice,
  courseImage,
}) {
  const formData = new FormData();
  formData.append("courseImage", courseImage);
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("level", level);
  formData.append("prerequisites", prerequisites);
  formData.append("basePrice", basePrice);

  const response = await fetch(
    `${BASE_URL}/Course/uploadCourseInfo/${categoryId}`,
    {
      method: "POST",
      headers: {
        token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
      },
      body: formData,
    }
  );

  return response.json();
}

