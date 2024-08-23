import { connectToDB } from "@/utils/database";

export async function register() {
  await connectToDB();
}
