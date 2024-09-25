import { connectToDB } from "@/utils/database";

export async function register() {
  if (!global?.insInvoked) {
    global.insInvoked = true
  await connectToDB();

  }

}
