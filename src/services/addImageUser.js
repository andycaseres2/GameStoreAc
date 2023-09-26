import { supabase } from "../supabase/supabase";
import Compressor from "compressorjs";

export async function uploadImageToStorage(file) {
  // Comprimir y convertir la imagen a formato WebP
  const compressedImage = await new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8, // especificar la calidad de la imagen comprimida
      convertSize: 0, // forzar la conversión a formato WebP
      success: (result) => {
        resolve(result);
      },
      error: (err) => {
        reject(err);
      },
    });
  });

  const cleanedFileName = compressedImage.name.replace(/[^a-z0-9_.-]/gi, "");
  let newFileName = cleanedFileName;
  let i = 1;

  while (true) {
    const { error: listError } = await supabase.storage
      .from("gamestoreac")
      .list(`users/${newFileName}.webp`);

    if (listError) {
      console.error(listError);
      throw new Error(listError.message);
    }

    if (listError || i === 1) {
      newFileName = cleanedFileName;
    } else {
      newFileName = `${cleanedFileName}-${i}`;
    }

    i++;

    const { data, error: uploadError } = await supabase.storage
      .from("gamestoreac")
      .upload(`users/${newFileName}.webp`, compressedImage, {
        contentType: "image/webp",
      });

    if (uploadError) {
      console.error(uploadError);
      // Espera 500ms antes de intentar cargar la imagen de nuevo
      await new Promise((resolve) => setTimeout(resolve, 500));
    } else {
      const publicUrl = `https://jdqutuyidetohruhllra.supabase.co/storage/v1/object/public/gamestoreac/${data.path}`;
      return publicUrl;
    }
  }
}
