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

  // Eliminar espacios y caracteres no permitidos del nombre de archivo
  const cleanedFileName = compressedImage.name.replace(/[^a-z0-9_.-]/gi, "");

  // Subir la imagen comprimida y convertida a WebP a Supabase
  const { data, error } = await supabase.storage
    .from("gamestoreac")
    .upload(`users/${cleanedFileName}.webp`, compressedImage, {
      contentType: "image/webp",
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const publicUrl = `https://jdqutuyidetohruhllra.supabase.co/storage/v1/object/public/gamestoreac/${data?.path}`;
  return publicUrl;
}
