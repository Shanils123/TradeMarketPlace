// app/api/listings/route.js
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req) {
  const formData = await req.formData();

  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const photos = formData.getAll("photos");
  const receipt = formData.get("receipt");

  // Save files to the server
  const photoPaths = [];
  for (const photo of photos) {
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public/uploads", photo.name);
    await writeFile(path, buffer);
    photoPaths.push(`/uploads/${photo.name}`);
  }

  let receiptPath = null;
  if (receipt) {
    const bytes = await receipt.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public/uploads", receipt.name);
    await writeFile(path, buffer);
    receiptPath = `/uploads/${receipt.name}`;
  }

  // Save listing to the database
  const listing = {
    name,
    description,
    category,
    photos: photoPaths,
    receipt: receiptPath,
  };
  await saveListingToDatabase(listing); // Replace with your database logic

  return Response.json({ success: true });
}